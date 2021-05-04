
const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

export default (model, stateGetter) => {

    let listeners = []

    const addChangeListener = cb => {
        listeners.push(cb)
        cb(freeze(stateGetter()))

        return () => {
            listeners = listeners
                .filter(element => element !== cb)
        }
    }

    const invokeListeners = () => {
        const data = freeze(stateGetter())
        listeners.forEach(l => l(data))
    }

    const wrapAction = originalAction => {
        return (...args) => {
            const value = originalAction(...args)
            if( originalAction.name !== 'includes'){
                invokeListeners()
            }
            return value
        }
    }

    const baseProxy = {
        addChangeListener
    }

    return Object
        .keys(model)
        .filter(key => {
            return typeof model[key] === 'function'
        })
        .reduce( (proxy, key) => {
            const action = model[key]
            return {
                ...proxy,
                [key]: wrapAction(action)
            }
        }, baseProxy)

}
