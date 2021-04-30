import observableFactory from './observable.js'

const INITIAL_STATE = {
    habits: [],
    other: false
}

export default (initialState = INITIAL_STATE) => {
    const state = observableFactory(initialState)

    const addItem = text => {
        if (!text) {
            return
        }

        state.habits = [ ...state.habits, {
            name: text
        }]
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

        state.habits = state.habits.map( (habit, i) => {
            if (i === index) {
                habit.name = text
            }
            return habit
        })
    }

    const deleteItem = index => {
        if (index < 0) {
            return
        }

        if (!state.habits[index]) {
            return
        }

        state.habits = state.habits.filter( (habit, i) => i !== index )
    }

    const isIncludes = (text, index) => {
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
        addChangeListener: state.addChangeListener,
        addItem,
        updateItem,
        deleteItem,
        isIncludes
    }
}
