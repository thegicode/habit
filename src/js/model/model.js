const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const INITIAL_STATE = {
    habits: [],
    other: false
}

const addItem = (state, event) => {
    const text = event.payload
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

const updateItem = (state, event) => {
    const {index, text} = event.payload
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

const deleteItem = (state, event) => {
    const index = event.payload
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

const includes = (state, event) => {
    const {text, index} = event.payload
    if (!text) {
        return
    }
    const is = state.habits
                .some( (item, i) => {
                    if( i === index ){
                        return
                    }
                    return item.name === text
                })
    return is
}

const methods = {
    ITEM_ADDED: addItem,
    ITEM_UPDATED: updateItem,
    ITEM_DELETED: deleteItem,
    INCLUDES: includes
}

export default (initialState = INITIAL_STATE) => {
    return (prevState, event) => {
        if (!prevState) {
            return cloneDeep(initialState)
        }

        const currentModifier = methods[event.type]

        if (!currentModifier) {
            return prevState
        }

        return currentModifier(prevState, event)
    }
}

