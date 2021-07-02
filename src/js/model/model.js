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
    permanents: [],
    permanents2: {},
    activeMonth: '',
    expand: true,
    other: false
}

export default (initialState = INITIAL_STATE) => {
    let state = cloneDeep(initialState)
    let listeners = []
    let listeners2 = []

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

    const updateStorage = str => {
        window.localStorage.setItem('HABITS', str || JSON.stringify(state))
        if(str) {
            state = JSON.parse(str)
            invokeListeners()
        }
    }

    const resetStorage = () => {
        state = INITIAL_STATE
        updateStorage()
        invokeListeners()
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

    const expand = {
        get value() {
            return state.expand
        },
        set value(boolean) {
            state.expand = boolean
            updateStorage()
        }
    }

    const addChangeListener2 = listener => {
        listeners2.push(listener)

        listener(freeze(state))

        return () => {
            listeners2 = listeners2.filter(l => l !== listener)
        }
    }

    const invokeListeners2 = () => {
        const data = freeze(state)

        listeners2.forEach(l => {
            l(data)
         })
    }

    const addItemPermanent = (text, month) => {
        if (!text) {
            return 
        }

        const obj = {
            [month]: []
        }

        state.permanents2[text] = obj

        invokeListeners2()
        updateStorage()
    }

    const updateItemPermanent = (index, text) => {
        if ( !text || index < 0) {
            return false
        }

        const _pn = state.permanents

        if (!_pn[index]) {
            return false
        }

        _pn[index] = text

        updateStorage()

        return true
    }

    const includesPermanent = (text, index) => {
        if (!text) {
            return
        }

        const data = Object.keys(state.permanents2)
        
        if (data.length < 1) {
            return
        }

        const is = data
                    .some( (item, idx) => {
                        if( idx === index ){
                            return
                        }
                        return item === text
                    })
        return is
    }

    const deleteItemPermanent = index => {
        if ( index < 0) {
            return
        }

        const _pn = state.permanents

        if (!_pn[index]) {
            return
        }

        _pn.splice(index, 1)

        invokeListeners2()
        updateStorage()
    }

    return {
        addChangeListener,
        updateStorage,
        resetStorage,
        addItem,
        updateItemName,
        deleteItem,
        updateItemChecked,
        includes,
        activeMonth,
        expand,
        
        addChangeListener2,
        addItemPermanent,
        updateItemPermanent,
        includesPermanent,
        deleteItemPermanent
    }
}
