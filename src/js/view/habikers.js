import { createNewNode, isInputEmpty, isInputInclues } from './helpers.js'

const template = document.querySelector('[data-template=habiker]')

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

    edit () {
        const targetEl = this.e.target
        const el = targetEl.closest('.habiker')
        const inputElement = el.querySelector('input')
        inputElement.focus()
        targetEl.dataset.hidden = true
    }

    confirm () {
        const { includes, updateItemName } =  this.events
        const inputElement = this.e.target

        if (isInputEmpty(inputElement)) {
            window.alert('습관명을 입력하세요.')
            return 
        }

        if (isInputInclues(includes, inputElement, this.index)) {
            window.alert('이미 있는 습관명입니다.')
            return
        }

        const result = updateItemName(this.index, inputElement.value)
        if (!result) {
            inputElement.value = this.oldName
            console.log('이름이 변경되지 않았습니다.')
        } 

        inputElement.blur()
    }

    delete(){
        this.events.deleteItem(
            this.index, 
            this.param.cpnt, 
            this.param.parent)
    }

}

const addEvents = (element, index, events) => {
    element
        .querySelector('input[name=name]')
        .addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                const handler = new Handler(e, index, events, this.value)
                handler.confirm()
            }
        })
    element
        .querySelector('[data-button=delete]')
        .addEventListener('click', function(e) {
            const handler = new Handler(e, index, events)
            handler.delete()
        })

    const dragButton = element.querySelector('[data-button=drag]')
    dragButton
        .addEventListener('dragstart', function(e) {
        })
    dragButton
        .addEventListener('dragend', function(e) {
        })
}

const getElements = (habit, index, events) => {
    const { name } = habit
    const element = createNewNode(template)
    const inputEl = element.querySelector('input[name=name]')
    const trackersEl = element.querySelector('[data-component=trackers]')

    element.dataset.index = index
    inputEl.value = name
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
        .map( (habit, index) => getElements(habit, index, events))
        .forEach( element => {
            newHabikerList.appendChild(element)
        })

    return newHabikerList
}
