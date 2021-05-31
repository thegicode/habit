import appView from './view/habiker.js'
import habikersView from './view/habikers.js'
import trackersView from './view/trackers.js'

import applyDiff from './applyDiff.js'

import registry from './registry.js'
import modelFactory from './model/model.js'

registry.add('app', appView)
registry.add('habikers', habikersView)
registry.add('trackers', trackersView)


const getStorage = () => {
    const storage = window.localStorage.getItem('HABITS')
    if( !storage ) {
        return
    }
    return JSON.parse( storage )
}

const model = modelFactory( getStorage() )

const {
    addChangeListener,
    ...events
    } = model

const render = (state, cpnt, parent) => {
    window.requestAnimationFrame(() => {
        cpnt = cpnt || document.querySelector('#root')
        parent = parent || document.body
        const newCpnt = registry.renderRoot( cpnt, state, events)
        applyDiff(parent, cpnt, newCpnt)
    })
}

addChangeListener(render)


