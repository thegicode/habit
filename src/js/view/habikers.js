import actionCreators from '../model/actionCreators.js'

let template

const createNewNode = () => {
    if( !template ){
        template = document.querySelector('[data-template=habiker-item]')
    }

    return template
        .content
        .firstElementChild
        .cloneNode(true)
}

class Handler {
    constructor (e, store, index) {
        this.e = e
        this.store = store
        this.dispatch = store.dispatch
        this.index = index

    }

    isNotEmpty (el) {
        if (el.value.length === 0) {
            window.alert('습관명을 입력하세요.')
            el.focus()
            return true
        }
        return false
    }

    isIncludes (el, index) {
        const state = this.store.getState()
        const is = state.habits
            .some( (item, idx) => {
                if( idx === index ){
                    return
                }
                if (item.name === el.value) {
                    window.alert('이미 있는 습관명입니다.')
                    el.focus()
                    el.value = ''
                    return true
                }
                return false
            })
        return is
    }

    edit () {
        const targetEl = this.e.target
        const el = targetEl.closest('.habits-item')
        const inputElement = el.querySelector('input')
        inputElement.removeAttribute('readonly')
        inputElement.focus()
        targetEl.dataset.hidden = true
        el.querySelector('[data-button=confirm]').dataset.hidden = false
    }

    confirm () {
        const targetEl = this.e.target
        const el = targetEl.closest('.habits-item')
        const inputElement = el.querySelector('input')
        if (this.isNotEmpty(inputElement)) {
            return 
        }

        if (this.isIncludes(inputElement, this.index) === true) {
            return
        }
        const event = actionCreators.updateItem(this.index, inputElement.value)
        this.dispatch(event)
        el.querySelector('[data-button=confirm]').dataset.hidden = true
        el.querySelector('[data-button=edit]').dataset.hidden = false
        inputElement.setAttribute('readonly', 'readonly')
    }

    delete(){
        this.dispatch(actionCreators.deleteItem(this.index))
    }

}

const addEventsToHabitElement = (store, element, index) => {
    const dispatch = store.dispatch
    element
        .querySelector('[data-button=edit]')
        .addEventListener('click', e => {
            const handler = new Handler(e, store, index)
            handler.edit()
        })
    element
        .querySelector('[data-button=confirm]')
        .addEventListener('click', e => {
            const handler = new Handler(e, store, index)
            handler.confirm()
        })
    element.querySelector('input[name=name]')
        .addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                const handler = new Handler(e, store, index)
                handler.confirm()
            }
        })
    element
        .querySelector('[data-button=delete]')
        .addEventListener('click', e => {
            const handler = new Handler(e, store, index)
            handler.delete()
        })
}

const getHabitElement = (store, habit, index) => {
    const dispatch = store.dispatch
    const { name } = habit

    const element = createNewNode()
    const inputElement = element.querySelector('input[name=name]')

    element.dataset.index = index
    inputElement.value = name
    inputElement.setAttribute('readonly', 'readonly')
     
    addEventsToHabitElement(store, element, index)

    return element
}

export default (targetElement, store) => {
    const state = store.getState()
    const dispatch = store.dispatch

    const { habits } = state
    const newHabikerList = targetElement.cloneNode(true)

    newHabikerList.innerHTML = ''

    habits
        .map( (habit, index) => getHabitElement(store, habit, index))
        .forEach( element => {
            newHabikerList.appendChild(element)
        })

    return newHabikerList
}