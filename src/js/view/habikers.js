let template
let thisState = {}

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
    }

    isNotEmpty (inputEl) {
        if (inputEl.value.length === 0) {
            window.alert('습관명을 입력하세요.')
            inputEl.focus()
            return true
        }

        return false
    }

    includes (inputEl) {
        const is = thisState.habits
            .some( (item, i) => {
                if( i === this.index ){
                    return
                }
                return item.name === inputEl.value
            })
        if (is) {
            window.alert('이미 있는 습관명입니다.')
            inputEl.focus()
            inputEl.value = ''
        }
        return is
    }

    edit () {
        const targetEl = this.e.target
        const el = targetEl.closest('.habits-item')
        const inputEl = el.querySelector('input')
        inputEl.removeAttribute('readonly')
        inputEl.focus()
        targetEl.dataset.hidden = true
        el.querySelector('[data-button=confirm]').dataset.hidden = false
    }

    confirm () {
        const targetEl = this.e.target
        const el = targetEl.closest('.habits-item')
        const inputEl = el.querySelector('input')
        if (this.isNotEmpty(inputEl)) {
            return 
        }
        if (this.includes(inputEl)) {
            return
        }
        this.events.updateItem(this.index, inputEl.value)
        el.querySelector('[data-button=confirm]').dataset.hidden = true
        el.querySelector('[data-button=edit]').dataset.hidden = false
        inputEl.setAttribute('readonly', 'readonly')
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
    const inputEl = element.querySelector('input[name=name]')

    element.dataset.index = index
    inputEl.value = name
    inputEl.setAttribute('readonly', 'readonly')
     
    addEventsToHabitElement(element, index, events)

    return element
}

export default (targetElement, state, events) => {
    const { habits } = state
    const { deleteItem } = events
    const newHabikerList = targetElement.cloneNode(true)

    newHabikerList.innerHTML = ''

    thisState = state

    habits
        .map( (habit, index) => getHabitElement(habit, index, events))
        .forEach( element => {
            newHabikerList.appendChild(element)
        })

    return newHabikerList
}
