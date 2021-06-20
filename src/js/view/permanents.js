import { createNewNode } from './helpers.js'

const template = document.querySelector('[data-template=permanent]')

const isEmpty = inputEl => {
    if (inputEl.value.length === 0) {
        window.alert('고정 습관명을 입력하세요.')
        inputEl.focus()
        return true
    }
    return false
}

const isInclues = (includesPermanent, inputEl, index) => {
    if(includesPermanent(inputEl.value, index)) {
        window.alert('이미 있는 습관명입니다.')
        inputEl.focus()
        inputEl.value = ''
        return true
    }
    return false
}

const addEvents = (element, index, events) => {

    const { 
        updateItemPermanent, 
        includesPermanent, 
        deleteItemPermanent 
        } = events
    
    element
        .querySelector('input[name=pnName]')
        .addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (isEmpty(this)) {
                    return
                }
                if (isInclues(includesPermanent, this, index)) {
                    return
                }
                if (updateItemPermanent(index, this.value)) {
                    this.blur()
                }
            }
        })

    element
        .querySelector('[data-button=pnDelete]')
        .addEventListener('click', function(e) {
            deleteItemPermanent(index)
        })

}

const getElements = (permanent, index, events) => {
    const element = createNewNode(template)
    const inputEl = element.querySelector('input[name=pnName]')

    element.dataset.index = index
    inputEl.value = permanent
     
    addEvents(element, index, events)

    return element
}

export default (targetElement, state, events) => {
    const { permanents } = state
    const newCpnt = targetElement.cloneNode(true)

    newCpnt.innerHTML = ''

    permanents && permanents.length > 0 && permanents
        .map( (permanent, index) => getElements(permanent, index, events))
        .forEach( element => {
            newCpnt.appendChild(element)
        })

    return newCpnt
}
