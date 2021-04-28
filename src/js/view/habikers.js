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

class HandleEvent {
    constructor(e, habits, index, events){
        this.e = e
        this.habits = habits
        this.index = index
        this.events = events
    }

    isNotEmpty(inputEl){
        if (inputEl.value.length === 0) {
            window.alert('습관명을 입력하세요.')
            inputEl.focus()
            return true
        }
        return false
    }

    isIncludes(inputEl){
        const nameText = inputEl.value
        const isIncludes = this.habits.some( (item, index) => {
            if (this.index === index) return
            return item.name === nameText
        })
        if (isIncludes) {
            window.alert('이미 있는 습관명입니다.')
            inputEl.focus()
            inputEl.value = ''
            return true
        }
        return false
    }

    edit(){
        const targetEl = this.e.target
        const el = targetEl.closest('.habits-item')
        const inputEl = el.querySelector('input')
        inputEl.removeAttribute('readonly')
        inputEl.focus()
        targetEl.dataset.hidden = true
        el.querySelector('[data-button=confirm]').dataset.hidden = false
    }

    confirm(){
        const targetEl = this.e.target
        const el = targetEl.closest('.habits-item')
        const inputEl = el.querySelector('input')
        if (this.isNotEmpty(inputEl)) {
            return 
        }
        if (this.isIncludes(inputEl)) {
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

const getHabitElement = (habits, habit, index, events) => {
    const { name } = habit
    const { updateItem, deleteItem } = events

    const el = createNewNode()
    const inputEl = el.querySelector('input[name=name]')

    el.dataset.index = index
    inputEl.value = name
    inputEl.dataset.value = name // For applyDiff
    inputEl.setAttribute('readonly', 'readonly')
 
    el.querySelector('[data-button=edit]')
        .addEventListener('click', e => {
            const instance = new HandleEvent(e, habits, index, events)
            instance.edit()
        })
    el.querySelector('[data-button=confirm]')
        .addEventListener('click', e => {
            const instance = new HandleEvent(e, habits, index, events)
            instance.confirm()
        })
    inputEl
        .addEventListener('keypress', e => {
            if (e.key === 'Enter') {
                const instance = new HandleEvent(e, habits, index, events)
                instance.confirm()
            }
        })
    el.querySelector('[data-button=delete]')
        .addEventListener('click', e => {
            const instance = new HandleEvent(e, habits, index, events)
            instance.delete()
        })

    return el
}

export default (targetElement, state, events) => {
    const { habits } = state
    const { deleteItem } = events
    const newCpnt = targetElement.cloneNode(true)

    newCpnt.innerHTML = ''

    habits
        .map( (habit, index) => getHabitElement(habits, habit, index, events))
        .forEach( element => {
            newCpnt.appendChild(element)
        })

    return newCpnt
}