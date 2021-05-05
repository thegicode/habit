import actionCreators from '../model/actionCreators.js'

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

const includes = el => {
    const is = thisState.habits
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

const addEvents = (targetElement, dispatch) => {
    const inputEl = targetElement.querySelector('input[name=input-name]')
    const button = targetElement.querySelector('[data-button=input]')

    const listener = function (el) {
        if (isNotEmpty(el)) {
            return 
        }
        if (includes(el)) {
            return
        }
        const event = actionCreators.addItem(el.value)
        dispatch(event)
        el.value = ''
        el.focus()
    }

    inputEl.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            listener(this)
        }
    })

    button.addEventListener('click', (e) => {
        listener(inputEl)
    })
}

export default (targetElement, state, dispatch) => {
    const newApp = targetElement.cloneNode(true)

    newApp.innerHTML = ''
    newApp.appendChild(getTemplate())

    thisState = state

    addEvents(newApp, dispatch)

    return newApp
}

