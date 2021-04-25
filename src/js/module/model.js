
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
        window.localStorage.setItem(storageName, JSON.stringify(newHabits))
        return newHabits;
    }

    const addHabitItem = function( name ){
        const habits = getStorage()
        const newHabits = addStorageItem(habits, name)
        window.state.habits = newHabits
        return newHabits
    }

    return {
        getStorage: getStorage,
        addHabitItem: addHabitItem
    }
}

export default model