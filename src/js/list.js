// import store from './module/store.js'
import templateFactory from './module/template.js'
import viewFactory from './module/view.js'
import modelFactory from './module/model.js'

const model = modelFactory()
const template = templateFactory()
const view = viewFactory(model, template)

function init(){
    const habits = model.init()
    if( habits.length > 0 ){
        view.init( habits )
    }
}

init()


const $buttonAdd = document.querySelector('[data-button=add]'),
    $inputName = document.querySelector('[data-input=name]')
$buttonAdd.addEventListener('click', function(){
    view.handleInputName($inputName)
})
$inputName.addEventListener('keyup', function(e){
    if( e.type === 'enter' || e.keyCode === 13 ){
        view.handleInputName(this)
    }
})
