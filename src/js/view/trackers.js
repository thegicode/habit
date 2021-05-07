let template

const createNewNode = () => {
    if( !template ){
        template = document.querySelector('[data-template=tracker-item]')
    }

    return template
        .content
        .firstElementChild
        .cloneNode(true)
}

const getHabitElement = (date, index, habits, updateChecked) => {
    const element = createNewNode()
    const inputEl = element.querySelector('input[name=check]')
    const textEl = element.querySelector('.__text')

    const checkedDays = habits[index].checked


    if (checkedDays.includes(date)) {
        inputEl.checked = true
    }
    textEl.textContent = date

    inputEl
        .addEventListener('change', function(e) {
            updateChecked(date, this.checked, index)
        })

    return element
}

export default (targetElement, state, events) => {
    const { habits } = state
    const { updateChecked } = events
    const newTrackerList = targetElement.cloneNode(true)

    newTrackerList.innerHTML = ''

    const index = targetElement.dataset.index

    const date = new Date(),
        fullDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

    let days = []
    for(let i = 0 ; i < fullDay ; i++){
        days.push(i+1)
    }

    days
        .map( date => getHabitElement(date, index, habits, updateChecked))
        .forEach( element => {
            newTrackerList.appendChild(element)
        })

    return newTrackerList
}
