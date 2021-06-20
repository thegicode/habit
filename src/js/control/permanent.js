
const addControls = (renderPermanents, events) => {

    const { addChangeListener2 } = events

    const launcherButton = document
        .querySelector('[data-button=setPermanent]')

    const dimmed = document
        .querySelector('[data-component=dimmed]')

    const component = document
        .querySelector('[data-component=permanent]')

    const closeButton = document
        .querySelector('[data-button=closePermanent]')

    const show = function() {
        addChangeListener2(renderPermanents)
        component.dataset.hidden = false
        dimmed.dataset.hidden = false
        closeButton.focus()
    }

    const hide = function() {
        component.dataset.hidden = true
        dimmed.dataset.hidden = true
        launcherButton.focus()
    }

    launcherButton
        .addEventListener('click', show)

    closeButton
        .addEventListener('click', hide)

    dimmed
        .addEventListener('click', function(){
            if (component.dataset.hidden === "false") {
                hide()
            }
        })
}

const isEmpty = inputEl => {
    if (inputEl.value.length === 0) {
        window.alert('고정 습관명을 입력하세요.')
        inputEl.focus()
        return true
    }
    return false
}

const isInclues = (includesPermanent, inputEl) => {
    if(includesPermanent(inputEl.value)) {
        window.alert('이미 있는 습관명입니다.')
        inputEl.focus()
        inputEl.value = ''
        return true
    }
    return false
}

const addEvents = (events) => {
    const { includesPermanent, addItemPermanent } = events
    const inputEl = document.querySelector('input[name=pnEnter]')
    const button = document.querySelector('[data-button=pnEnter]')

    const listener = function (inputEl) {
        const str = inputEl.value
        
        if (isEmpty(inputEl)) {
            return 
        }
        if (isInclues(includesPermanent, inputEl)) {
            return
        }

        addItemPermanent(str)
        inputEl.value = ''
        inputEl.focus()
    }

    inputEl.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            listener(inputEl)
        }
    })
    button.addEventListener('click', function(e) {
        listener(inputEl)
    })
}

export default (renderPermanents, events) => {
    addControls(renderPermanents, events)
    addEvents(events)
}

