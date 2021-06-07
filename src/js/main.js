import appView from './view/app.js'
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
        const newCpnt = registry.renderRoot( cpnt, state, events)
        applyDiff(parent, cpnt, newCpnt)
    })
}

addChangeListener(render)

document.querySelector('[data-button=saveStorage]')
    .addEventListener('click', function(e){
        const storage = JSON.stringify( getStorage() )
        const file = new Blob([storage], {type: 'text/plain'})
        let a = document.createElement("a")
        a.href = URL.createObjectURL(file)
        a.download = 'habits.txt'
        a.click()
    })

document.querySelector('[data-button=sendStorage]')
    .addEventListener('click', function(e){
        const storage = JSON.stringify( getStorage() )
        window.location.href = `mailto:thegicode@gmail.com?subject=Habits Get LocalStorage&body=${storage}`
    })

document.querySelector('[data-button=setStorage]')
    .addEventListener('click', function(){
        const str = window.prompt('Local Storage를 입력하세요.')
        events.updateStorage(str)
    })



