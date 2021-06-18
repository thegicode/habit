const cloneDeep = x => {
    return JSON.parse(JSON.stringify(x))
}

const freeze = x => Object.freeze(cloneDeep(x))

const INITIAL_STATE = {
    habits: {
        // '2021.06': [
        //     {
        //         name: 'Coding',
        //         checked: [1]
        //     }
        // ],
        // '2021.05': [
        //     {
        //         name: 'Coding',
        //         checked: [1, 2, 3, 4, 5, 10]
        //     },
        //     {
        //         name: 'Book',
        //         checked: [20, 30]
        //     }
        // ],
    },
    activeMonth: '',
    expanded: false,
    other: false
}

export default (initialState = INITIAL_STATE) => {
    let state = cloneDeep(initialState)
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

    const updateStorage = (str) => {
        window.localStorage.setItem('HABITS', str || JSON.stringify(state))
        if(str) {
            state = JSON.parse(str)
            invokeListeners()
        }
    }

    const addItem = (text, cpnt, parent) => {
        if (!text) {
            return 
        }

        const month = activeMonth.value
        if (!state.habits[month]) {
            state.habits[month] = []
        }

        state.habits[month].push({ 
            name: text,
            checked: []
        })

        invokeListeners(cpnt, parent)
        updateStorage()
    }

    const updateItemName = (index, text) => {
        if ( !text || index < 0) {
            return false
        }

        const _habits = state.habits[activeMonth.value]

        if (!_habits[index]) {
            return false
        }

        _habits[index].name = text

        updateStorage()

        return true
    }

    const deleteItem = (index, cpnt, parent) => {
        if ( index < 0) {
            return
        }

        const _habits = state.habits[activeMonth.value]

        if (!_habits[index]) {
            return
        }

        _habits.splice(index, 1)

        invokeListeners(cpnt, parent)
        updateStorage()
    }

    const updateItemChecked = (date, checked, index) => {
        if ( !date || index < 0 ) {
            return false
        }

        const _habits = state.habits[activeMonth.value]
        if (!_habits[index]) {
            return false
        }

        const _arr = _habits[index].checked
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

    const includes = (text, index) => {
        if (!text) {
            return
        }
        const _habits = state.habits
        if (Object.keys(_habits).length < 1) {
            return
        }

        if( !_habits[activeMonth.value] ) {
            return
        }

        const is = _habits[activeMonth.value]
                    .some( (item, idx) => {
                        if( idx === index ){
                            return
                        }
                        return item.name === text
                    })
        return is
    }

    const activeMonth = {
        get value() {
            return state.activeMonth
        },
        set value(day) {
            if (!day) {
                return
            }
            state.activeMonth = day
            updateStorage()
            invokeListeners()
        }
    }

    const fold = {
        get value() {
            return state.fold
        },
        set value(boolean) {
            state.fold = boolean
            updateStorage()
        }
    }

    return {
        addChangeListener,
        updateStorage,
        addItem,
        updateItemName,
        deleteItem,
        updateItemChecked,
        includes,
        activeMonth,
        fold
    }
}
