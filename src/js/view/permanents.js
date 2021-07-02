import { createNewNode, isInputEmpty, isInputInclues } from './helpers.js'

const template = document.querySelector('[data-template=permanent]')
let showedAlert = false

const updateName = (inputEl, index, events, oldName) => {
    const { includesPermanent, updateItemPermanent } =  events

    if (isInputEmpty(inputEl)) {
        if(showedAlert) {
            return
        }
        window.alert('고정 습관명을 입력하세요.')
        showedAlert = true
        return
    }

    if (isInputInclues(includesPermanent, inputEl, index)) {
        window.alert('이미 있는 습관명입니다.')
        return
    }

    const isUpdate = updateItemPermanent(index, inputEl.value)
    if (!updateItemPermanent) {
        inputEl.value = oldName
        console.log('이름이 변경되지 않았습니다.')
    } 

    inputEl.blur()
    /*if (updateItemPermanent(index, this.value)) {
        console.log('이름 변경 완료')
    }*/
}
const addEvents = (element, index, events) => {

    const { 
        deleteItemPermanent 
        } = events
    
    const inputEl = element.querySelector('input[name=pnName]')

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

    if (!permanents) {
        return
    }

    if (permanents.length < 0) {
        return
    }

    permanents
        .map ((permanent, index) => getElements(permanent, index, events))
        .forEach (element => {
            newCpnt.appendChild(element)
        })

    return newCpnt
}
