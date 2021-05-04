
const ACTION_TYPES = Object.freeze({
    ITEM_ADDED: 'ITEM_ADDED',
    ITEM_UPDATED: 'ITEM_UPDATED',
    ITEM_DELETED: 'ITEM_DELETED'
})

export default {
    addItem: text => ({
        type: ACTION_TYPES.ITEM_ADDED,
        payload: text
    }),
    updateItem: (index, text) => ({
        type: ACTION_TYPES.ITEM_UPDATED,
        payload: {
            index,
            text
        }
    }),
    deleteItem: index => ({
        type: ACTION_TYPES.ITEM_DELETED,
        payload: index
    })
}