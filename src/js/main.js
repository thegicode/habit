import appView from './view/habiker.js'
import habikersView from './view/habikers.js'
import trackersView from './view/trackers.js'

// import applyDiff from './applyDiff.js'

import registry from './registry.js'
import modelFactory from './model/model.js'

registry.add('app', appView)
registry.add('habikers', habikersView)
registry.add('trackers', trackersView)

const model = modelFactory()

const {
    addChangeListener,
    ...events
    } = model

const render = (state) => {
    // window.requestAnimationFrame(() => {
        const rootNode = document.querySelector('#root')
        const newRootNode = registry.renderRoot( rootNode, state, events)
        rootNode.replaceWith(newRootNode)
        // applyDiff(parent, cpnt, newCpnt)
    // })
}

addChangeListener(render)


