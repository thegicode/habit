
const model = function(){

    const init = function(){
        // console.log('habits', window.localStorage.getItem('habits'))
    }

    const addItem = function( name ){
        const habits = JSON.parse(window.localStorage.getItem('habits')) || []
        const newHabits = [
            ...habits, 
            {
                name: name 
            }
        ]
       window.localStorage.setItem('habits', JSON.stringify(newHabits))
       console.log('add', window.localStorage.habits)
    }

    return {
        init: init,
        addItem: addItem
    }
}

export default model