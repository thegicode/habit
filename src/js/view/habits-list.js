let template

const createNewNode = () => {
    if( !template ){
        template = document.querySelector('[data-template=habits-item]')
    }

    return template
        .content
        .firstElementChild
        .cloneNode(true)
}


const getHabitElement = (habits, habit, index, events) => {
    const { name } = habit
    const { updateItem, deleteItem } = events

    const el = createNewNode()
    const buttnEdit = el.querySelector('[data-button=edit')
    const buttnConfirm = el.querySelector('[data-button=confirm')
    const buttnDelete = el.querySelector('[data-button=delete')
    const inputName = el.querySelector('input[name=name]')

    el.dataset.index = index
    inputName.value = name
    inputName.dataset.value = name
    inputName.setAttribute('readonly', 'readonly')

    const editInputName = value => {
        updateItem(index, value)
        buttnConfirm.dataset.hidden = true
        buttnEdit.dataset.hidden = false
        inputName.setAttribute('readonly', 'readonly')
    }

    buttnEdit
        .addEventListener('click', function(e){
            inputName.removeAttribute('readonly')
            this.dataset.hidden = true
            buttnConfirm.dataset.hidden = false
        })
    buttnConfirm
        .addEventListener('click', function(e){
            editInputName(inputName.value)
        })
    inputName
        .addEventListener('keyup', function(e){
            if (e.type === 'enter' || e.keyCode === 13){
                editInputName(this.value)
            }
        })
    buttnDelete
        .addEventListener('click', e => {
            deleteItem(index)
        })

    return el
}

export default (targetElement, state, events) => {
    const { habits } = state
    const newHabitList = targetElement.cloneNode(true)

    newHabitList.innerHTML = ''

    const list = habits.map( (habit, index) => getHabitElement(habits, habit, index, events))

    list.forEach( element => {
            newHabitList.appendChild(element)
        })

    return newHabitList
}