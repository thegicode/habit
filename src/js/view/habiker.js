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

const addEvents = (newCpnt, events) => {
    const { getState, addItem } = events

    const inputEl = newCpnt.querySelector('input[name=input-name]')
    const button = newCpnt.querySelector('[data-button=input]')

    const listenr = function (inputEl) {
        const nameText = inputEl.value
        
        if (isNotEmpty(inputEl)) {
            return 
        }
        if (includes(inputEl)) {
            return
        }

        addItem(nameText)
        inputEl.value = ''
        inputEl.focus()
    }

    inputEl.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            listenr(inputEl)
        }
    })

    button.addEventListener('click', function(e) {
        listenr(inputEl)
    })
}

export default (targetElement, state, events) => {
    const newApp = targetElement.cloneNode(true)

    newApp.innerHTML = ''
    newApp.appendChild(getTemplate())

    thisState = state

    addEvents(newApp, events)

    return newApp
}

