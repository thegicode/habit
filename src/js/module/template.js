
const trackerlist = function( name ){
   return `
    <li class="tracker-item">
        <p class="name">${name}</p>
        <div class="table">
            check table
        </div>
        <div class="actions">
            <button type="button" class="btn" data-button="edit">수정</button>
            <button type="button" class="btn" data-button="delete">삭제</button>
        </div>
    </li>`
}

export default {
    trackerlist
}
