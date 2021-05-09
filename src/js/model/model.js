const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

const INITIAL_STATE = {
    habits: [
        {
            name: 'Coding',
            checked: [1, 3, 5, 7, 9]
        },
        {
            name: 'Book',
            checked: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    ],
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

    const addItem = text => {
        if (!text) {
            return
        }

        state.habits.push({ 
            name: text,
            checked: []
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

    const deleteItem = (index, cpnt, parent) => {
        if (index < 0) {
            return
        }

        if (!state.habits[index]) {
            return
        }

        state.habits.splice(index, 1)

        invokeListeners(cpnt, parent)
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

    const updateChecked = (date, checked, index) => {
        if ( !date ) {
            return
        }

        const data = state.habits[index].checked
        if (checked === true) {
            data.push(date)
        } else {
            const idx = data.indexOf(date)
            data.splice(idx, 1)
        }

        // console.log(state.habits[index].checked)

        invokeListeners()
    }

    return {
        addChangeListener,
        addItem,
        updateItem,
        deleteItem,
        includes,
        updateChecked
    }
}
