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

const isNotEmpty = inputElement => {
    if (inputElement.value.length === 0) {
        window.alert('습관명을 입력하세요.')
        inputElement.focus()
        return true
    }
    return false
}

const isIncludes = (habits, inputElement, id) => {
    const nameText = inputElement.value
    const isIncludes = habits.some( (item, index) => {
        if (id === index) return
        return item.name === nameText
    })
    if (isIncludes) {
        window.alert('이미 있는 습관명입니다.')
        inputElement.focus()
        inputElement.value = ''
        return true
    }
    return false
}

const getHabitElement = (habits, habit, index, events) => {
    const { name } = habit
    const { updateItem, deleteItem } = events

    const el = createNewNode()
    const form = el.querySelector('form')
    const editButton = el.querySelector('[data-button=edit]')
    const confirmButton = el.querySelector('[data-button=confirm]')
    const deleteButton = el.querySelector('[data-button=delete]')
    const inputElement = el.querySelector('input[name=name]')

    el.dataset.index = index
    inputElement.value = name
    inputElement.setAttribute('readonly', 'readonly')

    const listener = value => {

        if (isNotEmpty(inputElement)) {
            return 
        }

        if (isIncludes(habits, inputElement, index)) {
            return
        }

        updateItem(index, value)
        confirmButton.dataset.hidden = true
        editButton.dataset.hidden = false
        inputElement.setAttribute('readonly', 'readonly')
    }

    editButton
        .addEventListener('click', function(e){
            inputElement.removeAttribute('readonly')
            this.dataset.hidden = true
            confirmButton.dataset.hidden = false
        })
    confirmButton
        .addEventListener('click', function(e){
            listener(inputElement.value)
        })
    form.addEventListener('submit', function(e){
        e.preventDefault()
        listener(inputElement.value)
    })
    deleteButton
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