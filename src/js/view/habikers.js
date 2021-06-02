import { createNewNode } from './_helpers.js'

const template = document.querySelector('[data-template=habiker-item]')

class Handler {
    constructor (e, index, events, oldName) {
        this.e = e
        this.index = index
        this.events = events
        this.oldName = oldName
        this.param = {
            cpnt: document.querySelector('[data-component=habikers').parentElement,
            parent: document.querySelector('[data-component=app]')
        }
    }

    isNotEmpty (inputElement) {
        if (inputElement.value.length === 0) {
            window.alert('습관명을 입력하세요.')
            inputElement.focus()
            return true
        }

        return false
    }

    includes (inputElement) {
        const nameText = inputElement.value
        const includes = this.events.includes(nameText, this.index)

        if (includes) {
            window.alert('이미 있는 습관명입니다.')
            inputElement.focus()
            inputElement.value = ''
            return true
        }

        return false
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
        if (this.includes(inputElement)) {
            return
        }

        const result = this.events.updateItemName(
                            this.index, 
                            inputElement.value)

        if (!result) {
            inputElement.value = this.oldName
            console.log('이름이 변경되지 않았습니다.')
        } 

        el.querySelector('[data-button=confirm]').dataset.hidden = true
        el.querySelector('[data-button=edit]').dataset.hidden = false
        inputElement.setAttribute('readonly', 'readonly')
    }

    delete(){
        this.events.deleteItem(
            this.index, 
            this.param.cpnt, 
            this.param.parent)
    }

}

const addEvents = (element, index, events) => {
    const oldName = element.querySelector('input[name=name]').value
    element
        .querySelector('[data-button=edit]')
        .addEventListener('click', e => {
            const handler = new Handler(e, index, events)
            handler.edit()
        })
    element
        .querySelector('[data-button=confirm]')
        .addEventListener('click', e => {
            const handler = new Handler(e, index, events)
            handler.confirm()
        })
    
    element.querySelector('input[name=name]')
        .addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                const handler = new Handler(e, index, events, oldName)
                handler.confirm()
            }
        })
    element
        .querySelector('[data-button=delete]')
        .addEventListener('click', e => {
            const handler = new Handler(e, index, events)
            handler.delete()
        })
}

const getHabitElement = (habit, index, events) => {
    const { name } = habit
    const element = createNewNode(template)
    const inputEl = element.querySelector('input[name=name]')
    const trackersEl = element.querySelector('.trackers')

    element.dataset.index = index
    inputEl.value = name
    inputEl.setAttribute('readonly', 'readonly')
    trackersEl.dataset.index = index
     
    addEvents(element, index, events)

    return element
}

export default (targetElement, state, events) => {
    const { habits } = state
    const { activeMonth, deleteItem } = events
    const newHabikerList = targetElement.cloneNode(true)

    newHabikerList.innerHTML = ''

    const activeHabits = habits[activeMonth.value]

    activeHabits && activeHabits.length > 0 && activeHabits
        .map( (habit, index) => getHabitElement(habit, index, events))
        .forEach( element => {
            newHabikerList.appendChild(element)
        })

    return newHabikerList
}
