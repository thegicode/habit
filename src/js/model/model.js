import observableFactory from './observable.js'

const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const INITIAL_STATE = {
    habits: [],
    other: false
}

export default (initialState = INITIAL_STATE) => {
    const state = cloneDeep(initialState)

    const addItem = text => {
        if (!text) {
            return
        }

        state.habits.push({ 
            name: text
        })
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
    }

    const deleteItem = index => {
        if (index < 0) {
            return
        }

        if (!state.habits[index]) {
            return
        }

        state.habits.splice(index, 1)
    }

    const model = {
        addItem,
        updateItem,
        deleteItem
    }

    return observableFactory(model, () => state)
}
