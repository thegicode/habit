
const addItem = (state, action) => {
    const text = action.payload
    if (!text) {
        return state
    }
    return {
        ...state,
        habits: [...state.habits, {
            name: text
        }]
    }
}

const updateItem = (state, action) => {
    const {index, text} = action.payload
    if (!text) {
        return state
    }

    if (index < 0) {
        return state
    }

    if (!state.habits[index]) {
        return state
    }

    return {
        ...state,
        habits: state.habits.map( (habit, i) => {
            if (i === index) {
                habit.name = text
            }
            return habit
        })
    }
}

const deleteItem = (state, action) => {
    const index = action.payload
    if (index < 0) {
        return state
    }

    if (!state.habits[index]) {
        return state
    }

    return {
        ...state,
        habits: state.habits.filter( (habit, i) => i !== index )
    }
}

const methods = {
    ITEM_ADDED: addItem,
    ITEM_UPDATED: updateItem,
    ITEM_DELETED: deleteItem
}

export default (prevState, action) => {
    const currentModifier = methods[action.type]
    if (!currentModifier) {
        return prevState
    }
    return currentModifier(prevState, action)
}

