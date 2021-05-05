import eventCreators from '../model/eventcreators.js'

let tempalte
let thisState = {}

const getTemplate = () => {
    if (!tempalte) {
        tempalte = document.querySelector('[data-template=habiker-app')
    }
    return tempalte
        .content
        .firstElementChild
        .cloneNode(true)
}

const isNotEmpty = inputElement => {
    if (inputElement.value.length === 0) {
        window.alert('습관명을 입력하세요.')
        inputElement.focus()
        return true
    }
    return false
}

const includes = (el, state) => {
    const is = state.habits
        .some( item => {
            return item.name === el.value
        })
    if ( is ) {
        window.alert('이미 있는 습관명입니다.')
        el.focus()
        el.value = ''
    }
    return is
}

const addEvents = (newCpnt, state, dispatch) => {

    const inputEl = newCpnt.querySelector('input[name=input-name]')
    const button = newCpnt.querySelector('[data-button=input]')

    const listenr = function (el) {
        if (isNotEmpty(el)) {
            return 
        }
        if (includes(el, thisState)) {
            return
        }
        const event = eventCreators.addItem(el.value)
        dispatch(event)
        el.value = ''
        el.focus()
    }

    inputEl.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            listenr(this)
        }
    })

    button.addEventListener('click', function(e) {
        listenr(inputEl)
    })
}

export default (targetElement, state, dispatch) => {

    const newApp = targetElement.cloneNode(true)

    newApp.innerHTML = ''
    newApp.appendChild(getTemplate())

    thisState = state

    addEvents(newApp, state, dispatch)

    return newApp
}

