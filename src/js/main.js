import habikersView from './view/habikers.js'
import appView from './view/habiker.js'

// import model_pre from './model.js'
import applyDiff from './applyDiff.js'

import registry from './registry.js'
import modelFactory from './model/model.js'

registry.add('app', appView)
registry.add('habikers', habikersView)

const model = modelFactory()

const events = {
    getState: () => {
        return model.getState()
    },
    addItem: text => {
        model.addItem(text)
        render(model.getState())
    },
    updateItem: (index, text) => {
        model.updateItem(index, text)
        render(model.getState())
    },
    deleteItem: index => {
        model.deleteItem(index)
        render(model.getState())
    }
}

const render = state => {
    window.requestAnimationFrame(() => {
        const cpnt = document.querySelector('#root')
        const newCpnt = registry.renderRoot( cpnt, state, events )
        applyDiff(document.body, cpnt, newCpnt)
    })
}

render(model.getState())


/*


let state = {
    habits: model_prev.getStorage(),
    other: false
}


const events = {
    addItem: value => {
        state.habits.push({
            name: value
        })
        model_prev.setStorageHabit(state.habits)
        render()
    },
    deleteItem: index => {
        state.habits.splice(index, 1)
        model_prev.setStorageHabit(state.habits)
        render()
    },
    updateItem: (index, newName) => {
        state.habits[index].name = newName
        model_prev.setStorageHabit(state.habits)
    }
}*/

/*const render = () => {
    window.requestAnimationFrame(() => {
        const cpnt = document.querySelector('#root')
        const newCpnt = registry.renderRoot( cpnt, state, events )
        applyDiff(document.body, cpnt, newCpnt)
    })
}

render()

*/
