
const initialState = [
    {name: '운동'}, {name: '코딩'}
]

const STORAGE_NAME = 'habits'

const getStorage = function(){
    return JSON.parse(window.localStorage.getItem(STORAGE_NAME)) || initialState
}

const addStorageItem = function( habits, name ){
    const newHabits = [
        ...habits, 
        {
            name: name
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
    addHabitItem
}
