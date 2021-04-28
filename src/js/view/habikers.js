let template

const createNewNode = () => {
    if( !template ){
        template = document.querySelector('[data-template=habiker-item]')
    }

    return template
        .content
        .firstElementChild
        .cloneNode(true)
}

class Handler {
    constructor (e, index, events) {
        this.e = e
        this.index = index
        this.events = events
        this.habits = events.getState().habits
    }

    isNotEmpty (inputElement) {
        if (inputElement.value.length === 0) {
            window.alert('습관명을 입력하세요.')
            inputElement.focus()
            return true
        }

        return false
    }

    isIncludes (inputElement) {
        const nameText = inputElement.value

        const isIncludes = this.habits.some( (item, idx) => {
            if (this.index === idx) {
               return
            }
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

    edit () {
        const targetEl = this.e.target
        const el = targetEl.closest('.habits-item')
        const inputElement = el.querySelector('input')
        inputElement.removeAttribute('readonly')
        inputElement.focus()
        targetEl.dataset.hidden = true
        el.querySelector('[data-button=confirm]').dataset.hidden = false
    }

    confirm () {
        const targetEl = this.e.target
        const el = targetEl.closest('.habits-item')
        const inputElement = el.querySelector('input')
        if (this.isNotEmpty(inputElement)) {
            return 
        }
        if (this.isIncludes(inputElement)) {
            return
        }
        this.events.updateItem(this.index, inputElement.value)
        el.querySelector('[data-button=confirm]').dataset.hidden = true
        el.querySelector('[data-button=edit]').dataset.hidden = false
        inputElement.setAttribute('readonly', 'readonly')
    }

    delete(){
        this.events.deleteItem(this.index)
    }

}

const addEventsToHabitElement = (element, index, events) => {
    element
        .querySelector('[data-button=edit]')
        .addEventListener('click', e => {
            const handler = new Handler(e, index, events)
            handler.edit()
        })
    element
        .querySelector('[data-button=confirm]')
        .addEventListener('click', e => {
            const handler = new Handler(e, index, events)
            handler.confirm()
        })
    element.querySelector('input[name=name]')
        .addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                const handler = new Handler(e, index, events)
                handler.confirm()
            }
        })
    element
        .querySelector('[data-button=delete]')
        .addEventListener('click', e => {
            const handler = new Handler(e, index, events)
            handler.delete()
        })
}

const getHabitElement = (habit, index, events) => {
    const { name } = habit

    const element = createNewNode()
    const inputElement = element.querySelector('input[name=name]')

    element.dataset.index = index
    inputElement.value = name
    inputElement.setAttribute('readonly', 'readonly')
     
    addEventsToHabitElement(element, index, events)

    return element
}

export default (targetElement, state, events) => {
    const { habits } = state
    const { deleteItem } = events
    const newHabikers = targetElement.cloneNode(true)

    newHabikers.innerHTML = ''

    habits
        .map( (habit, index) => getHabitElement(habit, index, events))
        .forEach( element => {
            newHabikers.appendChild(element)
        })

    return newHabikers
}