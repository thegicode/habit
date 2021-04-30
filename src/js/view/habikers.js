import eventCreators from '../model/eventcreators.js'

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
    constructor (e, index, dispatch) {
        this.e = e
        this.index = index
        this.dispatch = dispatch
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
        const event = eventCreators.isIncludes(inputElement.value, this.index)
        if (this.dispatch(event)) {
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
        const event = eventCreators.updateItem(this.index, inputElement.value)
        this.dispatch(event)
        el.querySelector('[data-button=confirm]').dataset.hidden = true
        el.querySelector('[data-button=edit]').dataset.hidden = false
        inputElement.setAttribute('readonly', 'readonly')
    }

    delete(){
        this.dispatch(eventCreators.deleteItem(this.index))
    }

}

const addEventsToHabitElement = (element, index, dispatch) => {
    element
        .querySelector('[data-button=edit]')
        .addEventListener('click', e => {
            const handler = new Handler(e, index, dispatch)
            handler.edit()
        })
    element
        .querySelector('[data-button=confirm]')
        .addEventListener('click', e => {
            const handler = new Handler(e, index, dispatch)
            handler.confirm()
        })
    element.querySelector('input[name=name]')
        .addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                const handler = new Handler(e, index, dispatch)
                handler.confirm()
            }
        })
    element
        .querySelector('[data-button=delete]')
        .addEventListener('click', e => {
            const handler = new Handler(e, index, dispatch)
            handler.delete()
        })
}

const getHabitElement = (habit, index, dispatch) => {
    const { name } = habit

    const element = createNewNode()
    const inputElement = element.querySelector('input[name=name]')

    element.dataset.index = index
    inputElement.value = name
    inputElement.setAttribute('readonly', 'readonly')
     
    addEventsToHabitElement(element, index, dispatch)

    return element
}

export default (targetElement, state, dispatch) => {
    const { habits } = state
    const newHabikerList = targetElement.cloneNode(true)

    newHabikerList.innerHTML = ''

    habits
        .map( (habit, index) => getHabitElement(habit, index, dispatch))
        .forEach( element => {
            newHabikerList.appendChild(element)
        })

    return newHabikerList
}