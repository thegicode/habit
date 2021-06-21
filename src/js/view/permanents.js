import { createNewNode, isInputEmpty, isInputInclues } from './helpers.js'

const template = document.querySelector('[data-template=permanent]')

const addEvents = (element, index, events) => {

    const { 
        includesPermanent, 
        updateItemPermanent, 
        deleteItemPermanent 
        } = events
    
    element
        .querySelector('input[name=pnName]')
        .addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                if (isInputEmpty(this)) {
                    window.alert('고정 습관명을 입력하세요.')
                    return
                }
                if (isInputInclues(includesPermanent, this, index)) {
                    window.alert('이미 있는 습관명입니다.')
                    return
                }
                if (updateItemPermanent(index, this.value)) {
                    console.log('이름 변경 완료')
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
