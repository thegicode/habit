
const STORAGE_NAME = 'habits'

const getStorage = function(){
    const getItem = window.localStorage.getItem(STORAGE_NAME)
    return JSON.parse(getItem) || []
}

const setStorageHabit = function (habits) {
    window.localStorage.setItem(STORAGE_NAME, JSON.stringify(habits))
}

const addStorageItem = function( habits, name ){
    const newHabits = [
        ...habits, 
        {
            name: name,
        }
    ]
    window.localStorage.setItem(STORAGE_NAME, JSON.stringify(newHabits))
    return newHabits;
}

const addHabitItem = function( name ){
    const habits = getStorage()
    const newHabits = addStorageItem(habits, name)
    return newHabits
}

export default {
    getStorage,
    setStorageHabit,
    addHabitItem
}
