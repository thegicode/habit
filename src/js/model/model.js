const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

const INITIAL_STATE = {
    habits: {
        '2021.06': [
            {
                name: 'Coding',
                checked: [1]
            }
        ],
        '2021.05': [
            {
                name: 'Coding',
                checked: [1, 2, 3, 4, 5, 10]
            },
            {
                name: 'Book',
                checked: [20, 30]
            }
        ],
    },
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

    const addItem = (day, text, cpnt, parent) => {
        if (!day || !text) {
            return
        }

        state.habits[day].push({ 
            name: text,
            checked: []
        })

        invokeListeners(cpnt, parent)
        updateStorage()
    }

    const updateItemName = (day, index, text) => {
        if (!day || !text || index < 0) {
            return
        }

        const _habits = state.habits[day]

        if (!_habits[index]) {
            return
        }

        _habits[index].name = text

        updateStorage()

        return true
    }

    const updateItemChecked = (day, date, checked, index) => {
        if ( !day || !date  || index < 0 ) {
            return false
        }

        const _arr = state.habits[day][index].checked
        if (checked === true) {
            _arr.push(date)
            _arr.sort( (a, b) => {
                return a - b
            })
        } else {
            const idx = _arr.indexOf(date)
            _arr.splice(idx, 1)
        }

        updateStorage()

        return true
    }

    const deleteItem = (day, index, cpnt, parent) => {
        if (!day || index < 0) {
            return
        }

        const _habits = state.habits[day]

        if (!_habits[index]) {
            return
        }

        _habits.splice(index, 1)

        invokeListeners(cpnt, parent)
        updateStorage()
    }

    const includes = (text, day, index) => {
        if (!text) {
            return
        }
        const is = state.habits[day]
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
