import { isInputEmpty, isInputInclues } from '../view/helpers.js'

const addControls = (renderPermanents, events) => {

    const { addChangeListener2 } = events

    const launcherButton = document
        .querySelector('[data-button=setPermanent]')

    const backdrop = document
        .querySelector('[data-component=backdrop]')

    const component = document
        .querySelector('[data-component=permanent]')

    const closeButton = document
        .querySelector('[data-button=closePermanent]')

    const show = function() {
        addChangeListener2(renderPermanents)
        component.dataset.hidden = false
        backdrop.dataset.hidden = false
        closeButton.focus()
    }

    const hide = function() {
        component.dataset.hidden = true
        backdrop.dataset.hidden = true
        launcherButton.focus()
    }

    launcherButton
        .addEventListener('click', show)

    closeButton
        .addEventListener('click', hide)

    backdrop
        .addEventListener('click', function(){
            if (component.dataset.hidden === "false") {
                hide()
            }
        })
}

const addEvents = events => {
    const { includesPermanent, addItemPermanent } = events
    const inputEl = document.querySelector('input[name=pnEnter]')
    const button = document.querySelector('[data-button=pnEnter]')

    const listener = function (inputEl) {
        const str = inputEl.value
        
        if (isInputEmpty(inputEl)) {
            window.alert('고정 습관명을 입력하세요.')
            return 
        }
        if (isInputInclues(includesPermanent, inputEl)) {
            window.alert('이미 있는 습관명입니다.')
            return
        }

        addItemPermanent(str)
        inputEl.value = ''
        inputEl.focus()
    }

    inputEl.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            e.preventDefault()
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

