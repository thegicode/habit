import { createNewNode, isInputEmpty, isInputInclues } from './helpers.js'

const template = document.querySelector('[data-template=habiker]')
let showedAlert = false

const updateName = (inputEl, index, events, oldName) => {
    const { includes, updateItemName } =  events

    if (isInputEmpty(inputEl)) {
        if(showedAlert) {
            return
        }
        window.alert('습관명을 입력하세요.')
        showedAlert = true
        return 
    }

    if (isInputInclues(includes, inputEl, index)) {
        window.alert('이미 있는 습관명입니다.')
        return
    }

    const isUpdate = updateItemName(index, inputEl.value)
    if (!isUpdate) {
        inputEl.value = oldName
        console.log('이름이 변경되지 않았습니다.')
    } 

    inputEl.blur()
}



const addEvents = (element, index, events) => {

    const { deleteItem } = events

    const inputEl = element.querySelector('input[name=name]')

    inputEl
        .addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                updateName(this, index, events, this.value)
            }
        })

    inputEl.addEventListener('focus', function(e){
        showedAlert = false
    })

    inputEl.addEventListener('blur', function(e){
        updateName(this, index, events, this.value)
    })

    element
        .querySelector('[data-button=delete]')
        .addEventListener('click', function(e) {
            deleteItem(index)
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
