const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

const INITIAL_STATE = {
    habits: [],
    other: false
}

export default (initialState = INITIAL_STATE) => {
    const state = cloneDeep(initialState)
    let listeners = []

    const addChangeListener = listener => {
        listeners.push(listener)

        listener(freeze(state))

        return () => {
            listeners = listeners.filter(l => l !== listener)
        }
    }

    const invokeListeners = (cpnt, parent) => {
        const data = freeze(state)

        listeners.forEach(l => {
            l(data, cpnt, parent)
         })
    }

    const updateStorage = () => {
        window.localStorage.setItem('HABITS', JSON.stringify(state))
    }

    const addItem = (text, cpnt, parent) => {
        if (!text) {
            return
        }

        state.habits.push({ 
            name: text,
            checked: []
        })

        invokeListeners()
        updateStorage()
    }

    const updateItemName = (index, text) => {
        if (!text) {
            return
        }

        if (index < 0) {
            return
        }

        if (!state.habits[index]) {
            return
        }

        state.habits[index].name = text

        updateStorage()

        return true
    }

    const updateItemChecked = (date, checked, index) => {
        if ( !date ) {
            return false
        }

        const data = state.habits[index].checked
        if (checked === true) {
            data.push(date)
            data.sort( (a, b) => {
                return a - b
            })
        } else {
            const idx = data.indexOf(date)
            data.splice(idx, 1)
        }

        updateStorage()

        return true
    }

    const deleteItem = (index, cpnt, parent) => {
        if (index < 0) {
            return
        }

        if (!state.habits[index]) {
            return
        }

        state.habits.splice(index, 1)

        invokeListeners(cpnt, parent)
        updateStorage()
    }

    const includes = (text, index) => {
        if (!text) {
            return
        }
        const is = state.habits
                    .some( (item, idx) => {
                        if( idx === index ){
                            return
                        }
                        return item.name === text
                    })
        return is
    }

    return {
        addChangeListener,
        addItem,
        updateItemName,
        updateItemChecked,
        deleteItem,
        includes
    }
}
