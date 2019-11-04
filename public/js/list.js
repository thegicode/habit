
// 11월 습관 목록
let HABIT_LIST = [
    '운동', 
    '영어',
];



// function
function drawHabitList(){
    HABIT_LIST.forEach( data => {
        drawHabitItem(data);
    });
}

function drawHabitItem( data ){
    let idx = HABIT_LIST.indexOf(data);
    let tp = `
        <input type="text" value=${data} class="list-title" readOnly></input>
        <div class="list-actions">
            <button type="button" class="list-button">보기</button>
            <button type="button" class="list-button" onclick="handleEdit(this, ${idx});">수정</button>
            <button type="button" class="list-button">삭제</button>
        </div>`;
    let el = document.createElement('li');
    el.setAttribute( 'data-index', idx );
    el.className = 'list-item';
    el.innerHTML = tp;
    elHabitList.appendChild(el);
}

function handleEdit( button, idx ){
    let elInput = button.parentElement.previousElementSibling;
    elInput.readOnly = false;
    button.textContent = '완료';
    elInput.focus();
    button.addEventListener('click', function(){
        let val = elInput.value;
        if( HABIT_LIST.indexOf(val) > -1 ){
            alert('등록된 이름입니다.')
        } else{
            HABIT_LIST[idx] = val;
            elInput.readOnly = true;
            button.textContent = '수정';
        }
    });
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



