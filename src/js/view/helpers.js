
export function createNewNode(tempalte) {
    if (!tempalte) {
        return
    }
    return tempalte
        .content
        .firstElementChild
        .cloneNode(true)
}

export function isInputEmpty(inputEl) {
    if (!inputEl) {
        return
    }
    if (inputEl.value.length === 0) {
        inputEl.focus()
        return true
    }
    return false
}

export function isInputInclues(isIncludes, inputEl, index) {
    if (!isIncludes || !inputEl) {
        return
    }
    if(isIncludes(inputEl.value, index)) {
        inputEl.focus()
        inputEl.value = ''
        return true
    }
    return false
}

export function getCurrentMonth() {
    const date = new Date()
    const getMonth = () => {
        let month = date.getMonth() + 1
        if(parseInt(month) < 10) {
            month =  `0${month}`
        }
        return month
    }
    return `${date.getFullYear()}.${getMonth()}`
}
