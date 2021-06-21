import appView from './view/app.js'
import habikersView from './view/habikers.js'
import trackersView from './view/trackers.js'
import permanentsView from './view/permanents.js'

import applyDiff from './applyDiff.js'

import registry from './registry.js'
import modelFactory from './model/model.js'

import controlLocalStorage from './control/localStorage.js'
import controlPermanent from './control/permanent.js'

registry.add('app', appView)
registry.add('habikers', habikersView)
registry.add('trackers', trackersView)
registry.add('permanents', permanentsView)

const getStorage = () => {
    const storage = window.localStorage.getItem('HABITS')
    if( !storage ) {
        return
    }
    return JSON.parse(storage)
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
        const newCpnt = registry.renderRoot(cpnt, state, events)
        applyDiff(parent, cpnt, newCpnt)
    })
}

const renderPermanents = state => {
    window.requestAnimationFrame(() => {
        const cpnt = document.querySelector('[data-component=permanent')
        const parent = document.body
        const newCpnt = registry.renderRoot(cpnt, state, events)
        applyDiff(parent, cpnt, newCpnt)
    })
}

addChangeListener(render)

controlLocalStorage(getStorage, events)
controlPermanent(renderPermanents, events)



