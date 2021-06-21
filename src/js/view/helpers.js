
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
    if (inputEl.value.length === 0) {
        inputEl.focus()
        return true
    }
    return false
}
