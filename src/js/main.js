import habikersView from './view/habikers.js'
import appView from './view/habiker.js'

import applyDiff from './applyDiff.js'
import registry from './registry.js'

import eventBusFactory from './model/eventBus.js'
import modelFactory from './model/model.js'

registry.add('app', appView)
registry.add('habikers', habikersView)

const model = modelFactory()
const eventBus = eventBusFactory(model)

const render = state => {
    window.requestAnimationFrame(() => {
        const main = document.querySelector('#root')
        const newMain = registry.renderRoot( 
            main, 
            state, 
            eventBus.dispatch)
        applyDiff(document.body, main, newMain)
    })
}

eventBus.subscribe(render)

render(eventBus.getState())
