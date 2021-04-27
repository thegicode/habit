import habits from './view/habits.js'
import habitsListView from './view/habits-list.js'
import model from './model.js'
import applyDiff from './applyDiff.js'
import registry from './registry.js'

registry.add('habits', habits)
registry.add('habitslist', habitsListView)

let state = {
    habits: model.getStorage(),
    other: false
}

const events = {
    addItem: value => {
        state.habits.push({
            name: value
        })
        model.setStorageHabit(state.habits)
        render()
    },
    deleteItem: index => {
        state.habits.splice(index, 1)
        model.setStorageHabit(state.habits)
        render()
    },
    updateItem: (index, newName) => {
        state.habits[index].name = newName
        model.setStorageHabit(state.habits)
        // render()
    }
}

const render = () => {
    window.requestAnimationFrame(() => {
        const main = document.querySelector('#root')
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