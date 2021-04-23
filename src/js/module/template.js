
const template = function(){

    const markup = {
        trackerlist: function( item ){
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
    }

    const drawItem = function( el ){
        const arr = []
        const habits = JSON.parse( window.localStorage.getItem('habits') )
        console.log('habits', habits)
        habits.forEach( item => {
            arr.push( markup.trackerlist(item) )
        })
        el.innerHTML = arr.join('')
    }

    const drawCpnt = function(){
        const cpnts = document.querySelectorAll('[data-component]')
        if( !cpnts ) return
        cpnts.forEach( el => {
            if( el.dataset.component === 'trackerlist'){
                drawItem( el )
            } else {
                el.innerHTML = markup[el.dataset.component]()
            }
        })
    } 

    return{
        drawCpnt: drawCpnt
    }

}

export default template
