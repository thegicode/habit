import actionCreators from '../model/actionCreators.js'

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

const isIncludes = (state, el) => {
    const is = state.habits
        .some( item => {
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

const addEvents = (store, newCpnt) => {
    const dispatch = store.dispatch
    const inputEl = newCpnt.querySelector('input[name=input-name]')
    const button = newCpnt.querySelector('[data-button=input]')

    const listener = function (el, store) {
        const state = store.getState()
        if (isNotEmpty(el)) {
            return 
        }
        if (isIncludes(state, el)) {
            return
        }
        const event = actionCreators.addItem(el.value)
        dispatch(event)
        el.value = ''
        el.focus()
    }

    inputEl.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            listener(this, store)
        }
    })

    button.addEventListener('click', (e) => {
        listener(inputEl, store)
    })
}

export default (targetElement, store) => {
    const state = store.getState()
    const dispatch = store.dispatch

    const newApp = targetElement.cloneNode(true)

    newApp.innerHTML = ''
    newApp.appendChild(getTemplate())

    addEvents(store, newApp)

    return newApp
}

