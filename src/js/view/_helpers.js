
export function createNewNode(tempalte) {
    if (!tempalte) {
        return
    }
    return tempalte
        .content
        .firstElementChild
        .cloneNode(true)
}