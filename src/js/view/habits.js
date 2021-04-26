let template

const createNewNode = () => {
    if( !template ){
        template = document.getElementById('habits-item')
    }

    return template
        .content
        .firstElementChild
        .cloneNode(true)
}

const getHabitElement = (habit, index, event) => {
    const { name } = habit
    const { deleteItem } = event

    const element = createNewNode()
    element.querySelector('[data-select=name]').textContent = name

    return element
}

export default (targetElement, state, events) => {
    const { habits } = state
    const newHabitList = targetElement.cloneNode(true)

    newHabitList.innerHTML = ''

    habits
        .map( (habit, index) => getHabitElement(habit, index, events))
        .forEach( element => {
            newHabitList.appendChild(element)
        })


    return newHabitList
}