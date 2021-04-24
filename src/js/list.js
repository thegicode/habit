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


const addButton = document.querySelector('[data-button=add]'),
    inputName = document.querySelector('[data-input=name]')
const handleInputName = function(){
    const inputValue = inputName.value
    if( inputValue.length === 0 ){
        window.alert('습관명을 입력하세요.')
        inputName.focus()
        return;
    }
    const newHabits = model.addHabitItem(inputValue)
    view.showHabits( newHabits )
    inputName.value = ''
    inputName.focus()
}
addButton.addEventListener('click', function(){
    handleInputName()
})
inputName.addEventListener('keyup', function(e){
    if( e.type === 'enter' || e.keyCode === 13 ){
        handleInputName()
    }
})
