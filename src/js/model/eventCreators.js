
const EVENT_TYPES = Object.freeze({
    ITEM_ADDED: 'ITEM_ADDED',
    ITEM_UPDATED: 'ITEM_UPDATED',
    ITEM_DELETED: 'ITEM_DELETED',
    INCLUDES: 'INCLUDES'
})

export default {
    addItem: text => ({
        type: EVENT_TYPES.ITEM_ADDED,
        payload: text
    }),
    updateItem: (index, text) => ({
        type: EVENT_TYPES.ITEM_UPDATED,
        payload: {
            index,
            text
        }
    }),
    deleteItem: index => ({
        type: EVENT_TYPES.ITEM_DELETED,
        payload: index
    }),
    includes: (text, index) => ({
        type: EVENT_TYPES.INCLUDES,
        payload: {
            text, 
            index
        }
    })
}