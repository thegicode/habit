
const model = function(){

    const storageName = 'habits'

    const getStorage = function(){
        const temp = '[{"name":"a"},{"name":"b"}]'
        return JSON.parse( window.localStorage.getItem(storageName) || temp )
    }

    const addStorageItem = function( habits, name ){
        const newHabits = [
            ...habits, 
            {
                name: name
            }
        ]
        return newHabits;
    }

    const setStore = function( newHabits ){
        // const habits = JSON.stringify(newHabits)
        window.localStorage.setItem(storageName, JSON.stringify(newHabits))
        window.state.habits = newHabits
    }

    const addHabitItem = function( name ){
        const habits = getStorage()
        const newHabits = addStorageItem(habits, name)
        setStore(newHabits)
        return newHabits
    }

    return {
        getStorage: getStorage,
        addHabitItem: addHabitItem
    }
}

export default model