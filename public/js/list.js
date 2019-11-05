
// 11월 습관 목록
let HABIT_LIST = [
    '운동', 
    '영어',
];

const template = {
    actions: function(idx){
        return(
            `<button type="button" class="list-button">보기</button>
            <button type="button" class="list-button" onclick="handleEdit(${idx});">수정</button>
            <button type="button" class="list-button">삭제</button>`
        )
    },
    item: function( data, idx ){
        return(
            `<input type="text" value=${data} class="list-title" readOnly></input>
            <div class="list-actions">
                ${template.actions(idx)}
            </div>`
        )
    },
    actionsEdit: `
        <button type="button" class="list-button" onclick="handleEditEnd();">완료</button>
        <button type="button" class="list-button" onclick="habndleEditCancel();">취소</button>`
};

let selector = {};



// function
function drawHabitList(){
    HABIT_LIST.forEach( (data, idx) => {
        drawHabitItem(data, idx);
    });
}

function drawHabitItem( data, idx ){
    let el = document.createElement('li');
    el.setAttribute( 'data-index', idx );
    el.className = 'list-item';
    el.innerHTML = template.item(data, idx);
    elHabitList.appendChild( el );
}

function handleEdit( idx ){
    let el;

    selector.item = elHabitList.querySelector('li[data-index="' + idx + '"]');
    selector.input = selector.item.querySelector('input');
    selector.actions = selector.item.querySelector('.list-actions');
    selector.idx = idx;

    selector.input.readOnly = false;
    selector.input.focus();
    selector.actions.hidden = true;
    el = document.createElement('div');
    el.className = 'list-actions2';
    el.innerHTML = template.actionsEdit;
    selector.item.appendChild(el);

    selector.actionsEdit = el;
}

function handleEditEnd(){
    let val = selector.input.value;
    if( !val ) {
        alert("타이틀을 입력해주세요.");
        selector.input.focus();
    } else{

        if( HABIT_LIST.indexOf(val) > -1 ){
            alert('이미 등록된 타이틀입니다.');
            selector.input.focus();
        } else{
            HABIT_LIST[selector.idx] = val;
            selector.input.readOnly = true;
            selector.actions.hidden = false;
            selector.actionsEdit.remove();

            selector = {};
            // console.log('selector', selector);
            console.log('HABIT_LIST', HABIT_LIST);
        }
       
    }
}

function habndleEditCancel(){
    selector.input.value = HABIT_LIST[selector.idx];
    selector.input.readOnly = true;
    selector.actions.hidden = false;
    selector.actionsEdit.remove();

    selector = {};
    // console.log('selector', selector);
}


// draw
drawHabitList();


// event
inputForm.addEventListener('submit', function(){
    event.preventDefault();
    let val = this.title.value;
    if(!val)
        this.focus();
    else{
        let idx = HABIT_LIST.length;
        HABIT_LIST.push(val);
        drawHabitItem( val, idx );
        console.log('HABIT_LIST', HABIT_LIST);
    }
});



