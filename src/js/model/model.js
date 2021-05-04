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

    const invokeListeners = () => {
        const data = freeze(state)
        listeners.forEach(l => l(data))
    }

    const addItem = text => {
        if (!text) {
            return
        }

        state.habits.push({ 
            name: text
        })

        invokeListeners()
    }

    const updateItem = (index, text) => {
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

        invokeListeners()
    }

    const deleteItem = index => {
        if (index < 0) {
            return
        }

        if (!state.habits[index]) {
            return
        }

        state.habits.splice(index, 1)

        invokeListeners()
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
        updateItem,
        deleteItem,
        includes
    }
}
