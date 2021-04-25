
const view = function(model, template){

    const showHabits = function( targetElement ){
        const { habits } = window.state
        const element = targetElement.cloneNode(true)
        const list = element.querySelector('[data-component=trackerlist')
        list.innerHTML = habits.map(getHabitElement).join('')
        return element
    }

    const getHabitElement = function( habit ){
        const { name } = habit
        return template.trackerlist(name)
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
    }

    return {
        showHabits: showHabits,
        handleInputName: handleInputName
    }
}

export default view