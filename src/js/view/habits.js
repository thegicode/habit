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



const getHabitElement = (habit, index, events) => {
    const { name, readonly } = habit
    const { updateItem, deleteItem } = events

    const el = createNewNode()
    el.dataset.index = index
    el.querySelector('input[name=name]').value = name

    const buttnEdit = el.querySelector('[data-button=edit')
    const buttnConfirm = el.querySelector('[data-button=confirm')
    const buttnDelete = el.querySelector('[data-button=delete')
    const inputName = el.querySelector('input')

    const editInputName = value => {
        inputName.setAttribute('readonly', 'readonly')
        buttnConfirm.dataset.hidden = true
        buttnEdit.dataset.hidden = false
        if (name !== value){
            updateItem(index, value)
        }
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
    inputName.addEventListener('keyup', function(e){
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

    habits
        .map( (habit, index) => getHabitElement(habit, index, events))
        .forEach( element => {
            newHabitList.appendChild(element)
        })


    return newHabitList
}