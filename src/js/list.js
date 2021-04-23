// import store from './module/store.js'
import templateFactory from './module/template.js'
import viewFactory from './module/view.js'
import modelFactory from './module/model.js'

const model = modelFactory()
const template = templateFactory()
const view = viewFactory(template)

model.init()
view.init()

const addButton = document.querySelector('[data-button=add')
addButton.addEventListener('click', function(){
    model.addItem('운동')
})

