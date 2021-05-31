let tempalte

const createNewNode = () => {
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

const checkIncludes = (includes, inputEl) => {
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
    const { addItem, includes } = events

    const inputEl = newCpnt.querySelector('input[name=name]')
    const button = newCpnt.querySelector('[data-button=input]')

    const listener = function (inputEl) {
        const nameText = inputEl.value
        
        if (isNotEmpty(inputEl)) {
            return 
        }
        if (checkIncludes(includes, inputEl)) {
            return
        }

        const cpnt = document.querySelector['[data-component=habikers]']
        const parent = document.querySelector['[data-component=app]']
        addItem(nameText, cpnt, parent)
        inputEl.value = ''
        inputEl.focus()
    }

    inputEl.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            listener(inputEl)
        }
    })

    button.addEventListener('click', function(e) {
        listener(inputEl)
    })
}

const addOptions = (newCpnt) => {
    const date = new Date()
    const year = date.getFullYear()
    const getMonth = () => {
        let month = date.getMonth() + 1
        if(parseInt(month) < 10) {
            month =  `0${month}`
        }
        return month
    }
    newCpnt.querySelector('[data-text=option-title]')
        .textContent = `${year}.${getMonth()}`
}

export default (targetElement, state, events) => {
    const newApp = targetElement.cloneNode(true)

    newApp.innerHTML = ''
    newApp.appendChild(createNewNode())

    addOptions(newApp)

    addEvents(newApp, events)

    return newApp
}

