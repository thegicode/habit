const registry = {}

const renderWrapper = component => {
    return (targetElement, store) => {
        const element = component(targetElement, store)
        const childComponent = element.querySelectorAll('[data-component]') 
        Array
        .from(childComponent)
        .forEach( target => {
            const name = target.dataset.component
            const child = registry[name]
            if (!child) {
                return
            }
            target.replaceWith(child(target, store))
        })
        return element
    }
}

const add = (name, component) => {
    registry[name] = renderWrapper(component)
}

const renderRoot = (root, store) => {
    const cloneComponent = root => {
        return root.cloneNode(true)
    }
    return renderWrapper(cloneComponent)(root, store)
}

export default {
    add, 
    renderRoot
}