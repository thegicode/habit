import { createNewNode } from './helpers.js'

const template = document.querySelector('[data-template=tracker]')

const getElements = (checkedDate, index, events, isPermanent) => {
    const { activeMonth, 
            updateItemChecked, 
            updateItemCheckedPermanent } = events

    const newDate = new Date(),
        getFullYear = newDate.getFullYear(),
        getMonth = newDate.getMonth() + 1,
        today = newDate.getDate();

    const arr = activeMonth.value.split('.'),
        year = Number(arr[0]),
        month = Number(arr[1]),
        fullDay = new Date(year, month, 0).getDate()

    let elements = []
    
    for(let i = 0 ; i < fullDay ; i++){
        const date = i+1
        const el = createNewNode(template)
        const inputEl = el.querySelector('input[name=check]')
        const textEl = el.querySelector('[data-text=date]')
        const oldChecked = inputEl.checked
        
        if (checkedDate.includes(date)) {
            inputEl.checked = true
        }

        if( year >= getFullYear ){
            if (month === getMonth && date > newDate.getDate()) {
                inputEl.disabled = true
            }
            if (month > getMonth ) {
               inputEl.disabled = true 
            }
        }

        textEl.textContent = date
        if (month === getMonth && date === today) {
            textEl.dataset.today = true
        }

        inputEl
            .addEventListener('change', function() {
                let isUpdated
                if(isPermanent){
                    isUpdated = updateItemCheckedPermanent(date, this.checked, index)
                } else {
                    isUpdated = updateItemChecked(date, this.checked, index)
                }
                
                if (!isUpdated) {
                    console.log('Not changed')
                    this.checked = oldChecked
                }
            })

        elements.push(el)
    }

    return elements
}

export default (targetElement, state, events) => {
    const { habits, permanents } = state
    const { activeMonth } = events
    const newTrackerList = targetElement.cloneNode(true)

    const pIndex = targetElement.dataset.pIndex
    const month = activeMonth.value

    newTrackerList.innerHTML = ''

    const permanent = permanents[pIndex]
    if (permanent && permanent.data[month]) {
        const checked = permanent.data[month]
        const els = getElements(checked, pIndex, events, true)
        els.forEach( el => {
            newTrackerList.appendChild(el)
        })
    }

    const index = targetElement.dataset.index
    const activeHabits = habits[month]
    if (!activeHabits) {
        return newTrackerList
    }
    if (activeHabits.length < 1) {
        return newTrackerList
    }

    if (!activeHabits[index]) {
        return newTrackerList
    }

    const checkedDate = activeHabits[index].checked
    const labelEls = getElements(checkedDate, index, events)
    labelEls.forEach( el => {
        newTrackerList.appendChild(el)
    })

    return newTrackerList
}
