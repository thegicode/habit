
const initialState = '[{"name":"운동"},{"name":"코딩"}]'

const STORAGE_NAME = 'habits'

const getStorage = function(){
    let data = initialState
    const storageHabits = window.localStorage.getItem(STORAGE_NAME)
    if( storageHabits && JSON.parse(storageHabits).length > 0  ){
        data = storageHabits
    }
    window.localStorage.setItem(STORAGE_NAME, data)
    return JSON.parse(data)
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
