const registry = {}

let rootChildrenLen = 0

const renderWrapper = getComponent => {
    return (targetElement, state, events) => {
        const component = getComponent(targetElement, state, events)
        const children = component.querySelectorAll('[data-component]')

        Array
        .from(children)
        .forEach( target => {
            const name = target.dataset.component
            const getChild = registry[name]
            if (!getChild) {
                return
            }
            const childCpnt = getChild(target, state, events)
            target.replaceWith(childCpnt)

        })

        return component
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
