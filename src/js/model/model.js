const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const initialState = {
    habits: [],
    other: false
}

export default () => {
    const state = cloneDeep(initialState)

    const getState = () => {
        return Object.freeze(cloneDeep(state))
    }

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

    return {
        getState,
        addItem,
        updateItem,
        deleteItem
    }
}
