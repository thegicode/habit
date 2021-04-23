
const model = function(){

    const storeName = 'habits'

    const init = function(){
        return getStorage()
    }

    const getStorage = function(){
        const habits = JSON.parse(window.localStorage.getItem(storeName)) || []
        return habits
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

    const setStorage = function( newHabits ){
        window.localStorage.setItem(storeName, JSON.stringify(newHabits))
        console.log('newHabits', newHabits)
    }

    const addHabitItem = function( name ){
        const habits = getStorage()
        const newHabits = addStorageItem(habits, name)
        setStorage(newHabits)
        return newHabits;
    }

    return {
        init: init,
        addHabitItem: addHabitItem
    }
}

export default model