import appView from './view/habiker.js'
import habikersView from './view/habikers.js'

import model from './model.js'
import applyDiff from './applyDiff.js'
import registry from './registry.js'

registry.add('app', appView)
registry.add('habikers', habikersView)

let state = {
    habits: model.getStorage(),
    other: false
}

const events = {
    addItem: value => {
        state.habits.push({
            name: value
        })
        model.setStorageHabit(state.habits)
        render()
    },
    deleteItem: index => {
        state.habits.splice(index, 1)
        model.setStorageHabit(state.habits)
        render()
    },
    updateItem: (index, newName) => {
        state.habits[index].name = newName
        model.setStorageHabit(state.habits)
    }
}

const render = () => {
    window.requestAnimationFrame(() => {
        const cpnt = document.querySelector('#root')
        const newCpnt = registry.renderRoot( cpnt, state, events )
        applyDiff(document.body, cpnt, newCpnt)
    })
}

render()
