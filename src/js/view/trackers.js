import { createNewNode } from './helpers.js'

const template = document.querySelector('[data-template=tracker-item]')

const getElements = (checkedDate, index, events) => {
    const { activeMonth, updateItemChecked } = events

    const newDate = new Date(),
        getFullYear = newDate.getFullYear(),
        getMonth = newDate.getMonth() + 1;

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

        inputEl
            .addEventListener('change', function() {
                const isUpdated = updateItemChecked(date, this.checked, index)
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
    const { habits } = state
    const { activeMonth, updateItemChecked } = events
    const newTrackerList = targetElement.cloneNode(true)

    newTrackerList.innerHTML = ''

    let activeHabits = habits[activeMonth.value]
    if( !activeHabits  || activeHabits.length < 1 ) {
        return targetElement
    }

    const index = targetElement.dataset.index
    if( !activeHabits[index] ) {
        return targetElement
    }

    const checkedDate = activeHabits[index].checked
    const elements = getElements(checkedDate, index, events)
    elements.forEach( el => {
         newTrackerList.appendChild(el)
    })

    return newTrackerList
}
