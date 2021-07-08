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
    permanents: [
        // {
        //     name: 'Reading',
        //     data: {
        //         '2021.06' : [1, 2, 3],
        //         '2021.07' : [1, 2, 3],
        //     }
        // },
        // {
        //     name: 'Cooking',
        //     data: {
        //         '2021.06' : [1, 2, 3],
        //         '2021.07' : [1, 2, 3],
        //     }
        // }
    ],
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
        }
    }

    const resetStorage = () => {
        state = INITIAL_STATE
        updateStorage()
        invokeListeners()
        invokeListeners2()
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
        if (!month) {
            return 
        }

        const obj = {
            name: text,
            data: {
                [month]: []
            }
        }
        state.permanents.push(obj)

        invokeListeners()
        invokeListeners2()
        updateStorage()
    }

    const addPermanent = (index, month) => {
        if (index < 0) {
            return 
        }
        if (!month) {
            return
        }

        state.permanents[index].data = {
            ...state.permanents[index].data, 
            ...{[month]: []}
        }
       
        invokeListeners()
        invokeListeners2()
        updateStorage()
    }

    const updateItemPermanent = (index, text) => {
        if (index < 0) {
            return false
        }
        if (!text) {
            return false
        }

        const permanents = state.permanents

        if (!permanents[index]) {
            return false
        }

        permanents[index].name = text

        invokeListeners()
        updateStorage()

        return true
    }

    const includesPermanent = (text, index) => {
        if (!text) {
            return
        }

        if (!state.permanents) {
            return 
        }
        if (state.permanents.length < 1) {
            return false
        }

        const is = state.permanents
                    .some( (item, idx) => {
                        if( idx === index ){
                            return
                        }
                        return item.name === text
                    })
        return is
    }

    const deleteItemPermanent = (index) => {
        if (index === undefined || index < 0) {
            return
        }

        const permanents = state.permanents
        if (!permanents[index]) {
            return
        }
        permanents.splice(index, 1)

        invokeListeners()
        invokeListeners2()
        updateStorage()
    }

    const updateItemCheckedPermanent = (date, checked, index) => {
        if (!date || index < 0) {
            return false
        }

        if (!state.permanents[index] && 
            !state.permanents[index].data[activeMonth.value]) {
            return false
        }

        const arr = state.permanents[index].data[activeMonth.value]
        if (checked === true) {
            arr.push(date)
            arr.sort( (a, b) => {
                return a - b
            })
        } else {
            const idx = arr.indexOf(date)
            arr.splice(idx, 1)
        }

        updateStorage()

        return true
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
        addPermanent,
        updateItemPermanent,
        includesPermanent,
        deleteItemPermanent,
        updateItemCheckedPermanent

    }
}
