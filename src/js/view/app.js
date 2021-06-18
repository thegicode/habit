import { createNewNode } from './helpers.js'

const template = document.querySelector('[data-template=app')

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

    if (includes(text, '2021.06')) {
        window.alert('이미 있는 습관명입니다.')
        inputEl.focus()
        inputEl.value = ''
        return true
    }
    return false
}

const getFoldText = boolean => {
    return boolean ? '타이틀만 보기' : '타이틀과 날짜 함께 보기'
}

const addContents = (newCpnt, events) => {
    const { activeMonth, fold } = events

    if (!activeMonth.value) {
        const date = new Date()
        const getMonth = () => {
            let month = date.getMonth() + 1
            if(parseInt(month) < 10) {
                month =  `0${month}`
            }
            return month
        }
        const yearMonth = `${date.getFullYear()}.${getMonth()}`
        activeMonth.value = yearMonth
    }
    
    const monthEl = newCpnt.querySelector('[data-text=month]')
    monthEl.textContent = activeMonth.value

    addEventsDate(newCpnt, activeMonth, monthEl)

    newCpnt.querySelector('[data-checkbox=expand]')
        .checked = fold.value
    newCpnt.querySelector('[data-text=expand]')
        .textContent = getFoldText(fold.value)
    newCpnt.querySelector('[data-component=habikers]')
        .dataset.expanded = fold.value

}

const addEventsDate = (newCpnt, activeMonth, monthEl) => {
    let year, month
    const getMonth = function(){
        const arr = activeMonth.value.split('.')
        year = Number(arr[0])
        month = Number(arr[1])
    }
    const setActiveMonth = function(){
        if( month < 10 ) {
            month = `0${month}`
        }
        const str = `${year}.${month}`
        activeMonth.value = str
        monthEl.textContent = str
    }
    newCpnt.querySelector('[data-button=month-prev]')
        .addEventListener('click', function(){
            getMonth()
            month = month - 1
            if( month === 0 ) {
                month = 12
                year = year - 1
            }
            setActiveMonth()
        })
    newCpnt.querySelector('[data-button=month-next]')
        .addEventListener('click', function(){
            getMonth()
            month = month + 1
            if( month === 13 ) {
                month = 1
                year = year + 1
            }
            setActiveMonth()
        })
    newCpnt.querySelector('[data-button=month-current]')
        .addEventListener('click', function(){
            year = new Date().getFullYear()
            month = new Date().getMonth()+1
            setActiveMonth()
        })

}

const addEvents = (newCpnt, events) => {
    const { addItem, includes, fold } = events

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

    newCpnt.querySelector('[data-checkbox=expand]')
        .addEventListener('change', function(e){
            const boolean = this.checked
            document.querySelector('[data-text=expand]')
                .textContent = getFoldText(boolean)
            document.querySelector('[data-component=habikers]')
                .dataset.expanded = boolean
            fold.value = boolean
        })
}

export default (targetElement, state, events) => {
    const newApp = targetElement.cloneNode(true)

    newApp.innerHTML = ''
    newApp.appendChild(createNewNode(template))

    addContents(newApp, events)
    addEvents(newApp, events)

    return newApp
}

