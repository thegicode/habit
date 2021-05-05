import habikersView from './view/habikers.js'
import appView from './view/habiker.js'

import applyDiff from './applyDiff.js'

import registry from './registry.js'
import modelFactory from './model/model.js'

registry.add('app', appView)
registry.add('habikers', habikersView)

const loadState = () => {
    const serialized = window
        .localStorage
        .getItem('state')

    if (!serialized) {
        return
    }

    return JSON.parse(serialized)
}

const model = modelFactory(loadState())

const {
    addChangeListener,
    ...events
} = model

const render = (state, cpnt, parent) => {
    cpnt = cpnt  || document.querySelector('#root')
    parent = parent || document.body
    window.requestAnimationFrame(() => {
        const newCpnt = registry.renderRoot( cpnt, state, events )
        applyDiff(parent, cpnt, newCpnt)
    })
}

const setStorage = state => {
    Promise.resolve().then( () => {
        window
            .localStorage
            .setItem('state', JSON.stringify(state))
    })
}

const getStateTime = state => {
    console.log(
       `Current State (${new Date().getTime()})`,
       state
    )
}

addChangeListener(render) 

addChangeListener(setStorage)

addChangeListener(getStateTime)





