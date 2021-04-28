const registry = {}

const renderWrapper = component => {
    return (targetElement, state, events) => {
        const element = component(targetElement, state, events)
        const childComponent = element.querySelectorAll('[data-component]') 
        Array
        .from(childComponent)
        .forEach( target => {
            const name = target.dataset.component
            const child = registry[name]
            if (!child) {
                return
            }
            target.replaceWith(child(target, state, events))
        })
        return element
    }
}

const renderRoot = (root, state, events) => {
    const cloneComponent = root => {
        return root.cloneNode(true)
    }
    return renderWrapper(cloneComponent)(root, state, events)
}

const add = (name, component) => {
    registry[name] = renderWrapper(component)
}

export default {
    add, 
    renderRoot
}