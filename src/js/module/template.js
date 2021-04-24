
const template = function(){

    const trackerlist = function( item ){
       return `
        <li class="tracker-item">
            <p class="name">${item.name}</p>
            <div class="table">
                check table
            </div>
            <div class="actions">
                <button type="button" class="btn" data-button="edit">수정</button>
                <button type="button" class="btn" data-button="delete">삭제</button>
            </div>
        </li>`
    }

    return{
        trackerlist: trackerlist
    }

}

export default template
