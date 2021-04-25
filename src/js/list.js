// import store from './module/store.js'
import templateFactory from './module/template.js'
import viewFactory from './module/view.js'
import modelFactory from './module/model.js'

const model = modelFactory()
const template = templateFactory()
const view = viewFactory(model, template)

window.state = {
    habits: model.getStorage(),
    other: false
}

const main = document.querySelector('#tracker')
window.requestAnimationFrame(() => {
    const newMain = view.showHabits(main)
    main.replaceWith(newMain)
})


 /*const $buttonAdd = newMain.querySelector('#button-add'),
    $input = newMain.querySelector('input[name=name]')
    $buttonAdd.addEventListener('click', function(){
        view.handleInputName(newMain, $input)
    })
    $input.addEventListener('keyup', function(e){
        if( e.type === 'enter' || e.keyCode === 13 ){
            view.handleInputName(newMain, this)
        }
    })*/