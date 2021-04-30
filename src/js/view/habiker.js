import eventCreators from '../model/eventcreators.js'

let tempalte

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

const isIncludes = (el, dispatch) => {
    if (dispatch(eventCreators.isIncludes(el.value))) {
        window.alert('이미 있는 습관명입니다.')
        el.focus()
        el.value = ''
        return true
    }
    return false
}

const addEvents = (newCpnt, dispatch) => {

    const inputEl = newCpnt.querySelector('input[name=input-name]')
    const button = newCpnt.querySelector('[data-button=input]')

    const listenr = function (el) {
        if (isNotEmpty(el)) {
            return 
        }
        if (isIncludes(el, dispatch)) {
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

    addEvents(newApp, dispatch)

    return newApp
}

