
import habikersView from './view/habikers.js'
import appView from './view/habiker.js'

import applyDiff from './applyDiff.js'
import registry from './registry.js'

import reducer from './model/reducer.js'

registry.add('app', appView)
registry.add('habikers', habikersView)

const INITIAL_STATE = {
    habits: [],
    other: false
}

const store = Redux.createStore(
    reducer,
    INITIAL_STATE,
    window._REDUX_DEVTOOLS_EXTENSION__ && window._REDUX_DEVTOOLS_EXTENSION__()
)

const render = () => {
    console.log('render')
    window.requestAnimationFrame(() => {
        const main = document.querySelector('#root')
        const newMain = registry.renderRoot( 
            main, 
            store)
        applyDiff(document.body, main, newMain)
    })
}

store.subscribe(render)

render()
