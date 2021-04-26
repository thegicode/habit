import habitsView from './view/habits.js'
import view from './module/view.js'
import model from './module/model.js'



let state = {
    habits: model.getStorage(),
    other: false
}

const events = {
    addItem: function(){
        console.log('addItem')
    }
}



const main = document.querySelector('#habits')
window.requestAnimationFrame(() => {
    const newMain = view.showHabits(main, state.habits)
    main.replaceWith(newMain)
})

habitsView(main, state, events)




 // const $buttonAdd = newMain.querySelector('#button-add'),
 //    $input = newMain.querySelector('input[name=name]')
 //    $buttonAdd.addEventListener('click', function(){
 //        const newHabits = view.handleInputName(newMain, $input)
 //    })
 //    $input.addEventListener('keyup', function(e){
 //        if( e.type === 'enter' || e.keyCode === 13 ){
 //            const newHabits = view.handleInputName(newMain, this)
 //        }
 //    })