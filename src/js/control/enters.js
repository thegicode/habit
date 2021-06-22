import { isInputEmpty, isInputInclues } from '../view/helpers.js'

export default (events) => {
    const { addItem, includes } = events

    const rootEl = document.querySelector('#root')
    const inputEl = rootEl.querySelector('input[name=name]')
    const button = rootEl.querySelector('[data-button=input]')

    const listener = function () {
        const nameText = inputEl.value

        if (isInputEmpty(inputEl)) {
            window.alert('습관명을 입력하세요.')
            return
        }
        if (isInputInclues(includes, inputEl)) {
            window.alert('이미 있는 습관명입니다.')
            return
        }

        const cpnt = document.querySelector['[data-component=habikers]']
        const parent = document.querySelector['[data-component=app]']
        addItem(nameText, cpnt, parent)
        inputEl.value = ''
        inputEl.focus()
    }

    inputEl.addEventListener('keypress', function(e){
        if (e.key === 'Enter') {
            e.preventDefault()
            listener()
        }
    })

    button.addEventListener('click', function(e) {
        listener()
    })
}