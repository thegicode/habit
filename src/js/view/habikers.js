import eventCreators from '../model/eventcreators.js'

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
    constructor (e, index, dispatch) {
        this.e = e
        this.index = index
        this.dispatch = dispatch
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
        const event = eventCreators.updateItem(this.index, inputEl.value)
        this.dispatch(event)
        el.querySelector('[data-button=confirm]').dataset.hidden = true
        el.querySelector('[data-button=edit]').dataset.hidden = false
        inputEl.setAttribute('readonly', 'readonly')
    }

    delete(){
        this.dispatch(eventCreators.deleteItem(this.index))
    }

}

const addEvents = (element, index, dispatch) => {

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
    const inputEl = element.querySelector('input[name=name]')

    element.dataset.index = index
    inputEl.value = name
    inputEl.setAttribute('readonly', 'readonly')
     
    addEvents(element, index, dispatch)

    return element
}

export default (targetElement, state, dispatch) => {
    const { habits } = state
    const newHabikerList = targetElement.cloneNode(true)

    newHabikerList.innerHTML = ''

    thisState = state

    habits
        .map( (habit, index) => getHabitElement(habit, index, dispatch))
        .forEach( element => {
            newHabikerList.appendChild(element)
        })

    return newHabikerList
}
