import { createNewNode, isInputEmpty, isInputInclues, getCurrentMonth } from './helpers.js'

const template = document.querySelector('[data-template=habits')

const getExpandText = boolean => {
    return boolean ? '타이틀만 보기' : '모두 보기'
}

const addPermanents = (permanents, events) => {
    const { activeMonth, addPermanent } = events
    const month = activeMonth.value
    if (month < getCurrentMonth()) {
        return
    }
    permanents.map( (permanent, index) => {
        if (Object.keys(permanent.data).includes(month)) {
            return
        }
        addPermanent(index, month)
    })
}

const addContents = (newCpnt, events) => {
    const { activeMonth, expand } = events
    const currentMonth = getCurrentMonth()

    if (!activeMonth.value) {
        activeMonth.value = currentMonth
    }
    
    newCpnt
        .querySelector('[data-text=month]')
        .textContent = activeMonth.value
    if (activeMonth.value === currentMonth) {
        newCpnt
            .querySelector('[data-button=month-current]')
            .hidden = true
    }

    newCpnt
        .querySelector('[data-checkbox=expand]')
        .checked = expand.value
    newCpnt
        .querySelector('[data-text=expand]')
        .textContent = getExpandText(expand.value)
    newCpnt
        .querySelector('[data-component=habikers]')
        .dataset.expanded = expand.value
}


const addEvents = (newCpnt, events) => {
    const { activeMonth, expand } = events

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

    newCpnt.querySelector('[data-checkbox=expand]')
        .addEventListener('change', function(e){
            const boolean = this.checked
            document.querySelector('[data-text=expand]')
                .textContent = getExpandText(boolean)
            document.querySelector('[data-component=habikers]')
                .dataset.expanded = boolean
            expand.value = boolean
        })
}

export default (targetElement, state, events) => {
    const {permanents} = state
    const newApp = targetElement.cloneNode(true)

    newApp.innerHTML = ''
    newApp.appendChild(createNewNode(template))

    addPermanents(permanents, events)
    addContents(newApp, events)
    addEvents(newApp, events)

    return newApp
}

