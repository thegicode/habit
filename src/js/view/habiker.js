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

const isNotEmpty = inputEl => {
    if (inputEl.value.length === 0) {
        window.alert('습관명을 입력하세요.')
        inputEl.focus()
        return true
    }
    return false
}

const includes = (events, inputEl) => {
    const { includes } = events
    const text = inputEl.value

    if (includes(text)) {
        window.alert('이미 있는 습관명입니다.')
        inputEl.focus()
        inputEl.value = ''
        return true
    }
    return false
}

const addEvents = (newCpnt, events) => {
    const { addItem } = events

    const inputEl = newCpnt.querySelector('input[name=name]')
    const button = newCpnt.querySelector('[data-button=input]')

    const listenr = function (inputEl) {
        const nameText = inputEl.value
        
        if (isNotEmpty(inputEl)) {
            return 
        }
        if (includes(events, inputEl)) {
            return
        }

        const cpnt = document.querySelector['[data-component=habikers]']
        const parent = document.querySelector['[data-component=app]']
        const result = addItem(nameText, cpnt, parent)
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

