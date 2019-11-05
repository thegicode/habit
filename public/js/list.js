
// 11월 습관 목록
let HABIT_LIST = [
    '운동', 
    '영어',
];

const template = {
    actions1: `
        <button type="button" class="list-button">보기</button>
        <button type="button" class="list-button" onclick="handleEdit(this);">수정</button>
        <button type="button" class="list-button">삭제</button>`,
    actions2: `
        <button type="button" class="list-button" onclick="handleEditEnd(this);">완료</button>
        <button type="button" class="list-button" onclick="habndleEditCancel(this);">취소</button>`,
    item: function( data ){
        return(
            `<input type="text" value=${data} class="list-title" readOnly></input>
            <div class="list-actions">
                ${template.actions1}
            </div>`
        )
    }

};




// function
function drawHabitList(){
    HABIT_LIST.forEach( data => {
        elHabitList.appendChild( drawHabitItem(data) );
    });
}

function drawHabitItem( data ){
    let idx = HABIT_LIST.indexOf(data);
    let el = document.createElement('li');
    el.setAttribute( 'data-index', idx );
    el.className = 'list-item';
    el.innerHTML = template.item(data);
    return el;
}

function handleEdit( button ){
    let elActions = button.parentElement;
    let elInput = elActions.previousElementSibling;
    let elItem = elInput.parentElement;
    let el;
    elInput.readOnly = false;
    elInput.focus();
    elActions.hidden = true;
    el = document.createElement('li');
    el.className = 'list-actions';
    el.innerHTML = template.actions2;
    elItem.appendChild(el);
}

function handleEditEnd( button ){
    let elActions2 = button.parentElement;
    let elItem = elActions2.parentElement;
    let idx = elItem.dataset.index;
    let elInput = elItem.querySelector('input');
    let val = elInput.value;
    if( HABIT_LIST.indexOf(val) > -1 ){
        alert('이미 등록된 이름입니다.')
    } else{
        HABIT_LIST[idx] = val;
        elInput.readOnly = true;
        elActions2.previousElementSibling.hidden = false;
        elActions2.remove();
    }
    console.log(HABIT_LIST);
}

function habndleEditCancel( button ){
    let elActions2 = button.parentElement;
    let elItem = elActions2.parentElement;
    let idx = elItem.dataset.index;
    let elInput = elItem.querySelector('input');
    elInput.value = HABIT_LIST[idx];
    elActions2.previousElementSibling.hidden = false;
    elActions2.remove();
}


// draw
drawHabitList();


// event
inputForm.addEventListener('submit', function(){
    event.preventDefault();
    let val = this.title.value;
    if(!val)
        this.focus();
    else
        drawHabitItem( val );
});



