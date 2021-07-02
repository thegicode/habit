import { isInputEmpty, isInputInclues, getCurrentMonth } from '../view/helpers.js'

const addControls = (component, renderPermanents, events) => {

    const { addChangeListener2 } = events

    const backdrop = document
        .querySelector('#backdrop')

    const launcherButton = document
        .querySelector('#root [data-button=permanents]')
    
    const closeButton = component
        .querySelector('[data-button=close]')

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

const addEvents = (component, events) => {
    const { includesPermanent, addItemPermanent } = events
    const inputEl = component.querySelector('input[name=pnEnter]')
    const button = component.querySelector('[data-button=pnEnter]')

    const addItem = function (inputEl) {
        const str = inputEl.value
        
        if (isInputEmpty(inputEl)) {
            window.alert('고정 습관명을 입력하세요.')
            return 
        }
        if (isInputInclues(includesPermanent, inputEl)) {
            window.alert('이미 있는 습관명입니다.')
            return
        }

        addItemPermanent(str, getCurrentMonth())
        inputEl.value = ''
        inputEl.focus()
    }

    inputEl.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            e.preventDefault()
            addItem(this)
        }
    })
    button.addEventListener('click', function(e) {
        addItem(inputEl)
    })
}

export default (renderPermanents, events) => {
    const component = document.querySelector('#permanents')
    addControls(component, renderPermanents, events)
    addEvents(component, events)
}

