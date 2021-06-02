import { createNewNode } from './_helpers.js'

const template = document.querySelector('[data-template=tracker-item]')

const getElements = (checkedDate, index, events) => {
    const { activeMonth, updateItemChecked } = events
    let elements = []

    const newDate = new Date(),
        fullDay = new Date(newDate.getFullYear(), newDate.getMonth() + 1, 0).getDate()
    let days = []
    for(let i = 0 ; i < fullDay ; i++){
        days.push(i+1)
    }

    elements = days.map( date => {
        const el = createNewNode(template)
        const inputEl = el.querySelector('input[name=check]')
        const textEl = el.querySelector('.__text')
        
        if (checkedDate.includes(date)) {
            inputEl.checked = true
        }

        const arr = activeMonth.value.split('.')
        const year = Number(arr[0])
        const month = Number(arr[1])
        if( year >= newDate.getFullYear() ){
            const getMonth = newDate.getMonth() + 1
            if (month === getMonth && date > newDate.getDate()) {
                inputEl.disabled = true
            }
            if (month > getMonth ) {
               inputEl.disabled = true 
            }
        }

        textEl.textContent = date

        const oldChecked = inputEl.checked
        inputEl
            .addEventListener('change', function(e) {
                const isUpdated = updateItemChecked(date, this.checked, index)
                if (!isUpdated) {
                    console.log('Not changed')
                    this.checked = oldChecked
                }
            })
        return el
    })

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
