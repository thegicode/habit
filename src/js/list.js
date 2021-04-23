// import store from './module/store.js'
import templateFactory from './module/template.js'
import viewFactory from './module/view.js'
import modelFactory from './module/model.js'

const model = modelFactory()
const template = templateFactory()
const view = viewFactory(template)

function init(){
    const habits = model.init()
    if( habits.length > 0 ){
        view.init( habits )
    }
}

init()

const addButton = document.querySelector('[data-button=add')
addButton.addEventListener('click', function(){
    const newHabits = model.addHabitItem('coding')
    view.showHabits( newHabits )
})

