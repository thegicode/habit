import template from './template.js'

const getHabitElement = function( habit ){
    const { name } = habit
    return template.habitslist(name)
}

const showHabits = function( targetElement, habits ){
        const element = targetElement.cloneNode(true)
        const list = element.querySelector('[data-component=habitslist')
        list.innerHTML = habits.map(getHabitElement).join('')
        return element
}

const handleInputName = function( main, elInput ){
    const val = elInput.value
    if( val.length === 0 ){
        window.alert('습관명을 입력하세요.')
        elInput.focus()
        return
    }
    const newHabits = model.addHabitItem(val)
    showHabits( main )
    elInput.value = ''
    elInput.focus()
    return newHabits
}

export default {
    showHabits,
    handleInputName
}

