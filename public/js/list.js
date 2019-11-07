
// 11월 습관 목록
let HABIT_LIST = [
    '운동', 
    '영어',
];

// Habit List Data Control
let habitList = {
    add: function( val ){
        HABIT_LIST.push(val);
    },
    update: function( val, idx ){
        HABIT_LIST[idx] =  val;
    },
    delete: function( idx ){
        HABIT_LIST.splice(idx, 1);
    },
    include: function( val ){
        return HABIT_LIST.indexOf(val) > -1
    }
};


// Template
const template = {
    item: function( data, idx ){
        return(
            `<form class="list-form" onsubmit="return handleItemSubmit(this, ${idx});">
                <input type="text" name="itemInput" value=${data} class="list-title" onblur="handleItemBlur(this, ${idx})"></input>
                <div class="list-actions">
                    <button type="button" class="list-button" onclick="handleView(${idx});">보기</button>
                    <button type="button" class="list-button" onclick="handleDelete(${idx});">삭제</button>
                </div>
            </form>`
        )
    }
};



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

function handleInputSubmit( form ){
    let elTitle = form.title,
        val = elTitle.value;
    if(!val)
        elTitle.focus();
    else{
        let idx = HABIT_LIST.length;
        if( habitList.include(val) ){
            alert('이미 등록된 타이틀입니다.')
        } else{
            HABIT_LIST.push(val);
            drawHabitItem( val, idx );
            console.log(HABIT_LIST);
        }
        elTitle.value = '';
    }

    return false;
}

function handleItemSubmit( form, idx ){
    let val = form.itemInput.value;
    if( val && val !== HABIT_LIST[idx] ){
        if( habitList.include(val) ){
            alert('이미 등록된 타이틀입니다.')
            form.itemInput.value = HABIT_LIST[idx];
        } else{
            habitList.update(val, idx);
        }
        console.log(HABIT_LIST);
    } else if(!val){
        alert("타이틀을 입력해주세요.")
    }
    return false;
}

function handleItemBlur( input, idx ){
    handleItemSubmit( input.parentElement, idx)
}

function handleView(idx){
    console.log('handleView', idx);
}

function handleDelete( idx ){
    // HABIT_LIST.splice(idx, 1);
    habitList.delete(idx);
    let node = elHabitList.querySelector('li[data-index="' + idx + '"]');
    node.remove();
    console.log(HABIT_LIST);
}


// draw
drawHabitList();




