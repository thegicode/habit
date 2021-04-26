import habitsView from './view/habits.js'
import view from './module/view.js'
import model from './module/model.js'
import applyDiff from './applyDiff.js'
import registry from './registry.js'

registry.add('habitslist', habitsView)

let state = {
    habits: model.getStorage(),
    other: false
}

const events = {
    addItem: function(){
        console.log('addItem')
    }
}

const render = () => {
    window.requestAnimationFrame(() => {
        const main = document.querySelector('#habits')
        const newMain = registry.renderRoot( main, state, events )
        applyDiff(document.body, main, newMain)
    })
}

render()






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