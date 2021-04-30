import habikersView from './view/habikers.js'
import appView from './view/habiker.js'

import applyDiff from './applyDiff.js'

import registry from './registry.js'
import actionsFactory from './model/model.js'

registry.add('app', appView)
registry.add('habikers', habikersView)

const actions = actionsFactory()

const render = state => {
    window.requestAnimationFrame(() => {
        const main = document.querySelector('#root')
        const newMain = registry.renderRoot( 
            main, 
            state, 
            actions 
        )
        applyDiff(document.body, main, newMain)
    })
}

actions.addChangeListener(render)
