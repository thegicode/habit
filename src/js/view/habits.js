let tempalte

const getTemplate = () => {
    if (!tempalte) {
        tempalte = document.querySelector('[data-template=habits')
    }
    return tempalte
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

const isIncludes = (habits, inputElement) => {
    const nameText = inputElement.value
    const isIncludes = habits.some( item => {
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

const addEvents = (newHabit, state, events) => {
    const { addItem } = events
    const { habits } = state

    const form = newHabit.querySelector('form')
    const input = newHabit.querySelector('input[name=input-name]')
    const button = newHabit.querySelector('[data-button=input]')

    const listenr = function (inputElement) {
        const nameText = inputElement.value
        
        if (isNotEmpty(inputElement)) {
            return 
        }

        if (isIncludes(habits, inputElement)) {
            return
        }

        addItem(nameText)
        inputElement.value = ''
    }
    form.addEventListener('submit', function(e){
        e.preventDefault()
        listenr(input)
    })
    button.addEventListener('click', function(e) {
        listenr(input)
        input.focus()
    })
}

export default (targetElement, state, events) => {
    const newHabit = targetElement.cloneNode(true)
    newHabit.innerHTML = ''
    newHabit.appendChild(getTemplate())
    addEvents(newHabit, state, events)

    return newHabit
}