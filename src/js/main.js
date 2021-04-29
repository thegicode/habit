import habikersView from './view/habikers.js'
import appView from './view/habiker.js'

import applyDiff from './applyDiff.js'

import registry from './registry.js'
import stateFactory from './model/state.js'

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

const state = stateFactory(loadState())

const {
    addChangeListener,
    ...events
} = state

const render = state => {
    window.requestAnimationFrame(() => {
        const cpnt = document.querySelector('#root')
        const newCpnt = registry.renderRoot( cpnt, state, events )
        applyDiff(document.body, cpnt, newCpnt)
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

/*addChangeListener(state => {
    Promise.resolve().then( () => {
        window
            .localStorage
            .setItem('state', JSON.stringify(state))
    })
})

addChangeListener(state => {
    console.log(
       `Current State (${new Date().getTime()})`,
       state
    )
})

*/






