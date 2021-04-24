
const view = function(model, template){

    const init = function( habits ){
        showHabits( habits )
    }

    const showHabits = function( habits ){
        const $cpnts = document.querySelectorAll('[data-component]')
        if( !$cpnts ) return
        $cpnts.forEach( cpnt => {
            if( cpnt.dataset.component === 'trackerlist'){
                drawHabitItem( habits, cpnt )
            } else {
                cpnt.innerHTML = template[cpnt.dataset.component]()
            }
        })
    }

    const drawHabitItem = function( habits, cpnt ){
        const items = habits.map( item => {
            return template.trackerlist(item)
        })
        cpnt.innerHTML = items.join('')
    }

    const handleInputName = function( elInput ){
        const val = elInput.value
        if( val.length === 0 ){
            window.alert('습관명을 입력하세요.')
            elInput.focus()
            return
        }
        const newHabits = model.addHabitItem(val)
        showHabits( newHabits )
        elInput.value = ''
        elInput.focus()
    }

    return {
        init: init,
        showHabits: showHabits,
        handleInputName: handleInputName
    }

}

export default view