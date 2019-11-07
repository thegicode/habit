
// 11월 습관 목록
// let HABIT_LIST = [
//     '운동', 
//     '영어',
// ];

let HABIT_LIST = {
    '201801': ['1-1', '1-2'],
    '201802': ['2-1', '2-2'],
    '201803': ['3-1', '3-2'],
    '201804': ['4-1', '4-2'],
    '201805': ['5-1', '5-2'],
    '201806': ['6-1', '6-2'],
    '201807': ['7-1', '7-2'],
    '201808': ['8-1', '8-2'],
    '201809': ['9-1', '9-2'],
    '201810': ['10-1', '10-2'],
    '201811': ['운동', '영어'],
    '201812': ['12-1', '12-2'],

    '201901': ['1-1', '1-2'],
    '201902': ['2-1', '2-2'],
    '201903': ['3-1', '3-2'],
    '201904': ['4-1', '4-2'],
    '201905': ['5-1', '5-2'],
    '201906': ['6-1', '6-2'],
    '201907': ['7-1', '7-2'],
    '201908': ['8-1', '8-2'],
    '201909': ['9-1', '9-2'],
    '201910': ['10-1', '10-2'],
    '201911': ['운동', '영어'],
    '201912': ['12-1', '12-2'],
};

const DATE_LIST = {
    year: [2018, 2019],
    month: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
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
    },
    selectYear: function(year, cur){
        if( year === cur)
            return `<option value="${year}" selected>${year}년</option>`;
        return `<option value="${year}">${year}년</option>`;
    },
    selectMonth: function(month, cur){
        let m = month;
        if(month<10) m = `0${month}`;
        if( month === cur )
            return `<option value="${m}" selected>${m}월</option>`;
        return `<option value="${m}">${m}월</option>`;
    }
};


let GLOBAL = {};


// draw
setDate();
drawSelect();
drawList();


// Habit List Data Control
let habits = {
    list: HABIT_LIST[GLOBAL.date.full()],
    add: function( val ){
        this.list.push(val);
    },
    update: function( val, idx ){
        this.list[idx] =  val;
    },
    delete: function( idx ){
        this.list.splice(idx, 1);
    },
    include: function( val ){
        return this.list.indexOf(val) > -1
    }
}


// function
function setDate(){
    const currentDate = new Date;
    GLOBAL.date = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()+1,
        full: function(){
            return `${this.year}${this.month}`
        }
    };
}

function drawSelect(){

    const yearList = DATE_LIST.year,
        monthList = DATE_LIST.month;
   
    let arr = [],
        arr2 = [];

    // year
    arr = yearList.length > 0 && yearList.map( function( year ){
        return template.selectYear(year, GLOBAL.date.year);
    });
    formDate.year.innerHTML = arr.join('')
    
    // month
    arr2 = monthList.length > 0 && monthList.map( function( month ){
        return template.selectMonth(month, GLOBAL.date.month);
    });
    formDate.month.innerHTML = arr2.join('')
}

function handleYearChange( select ){
    GLOBAL.date.year = select.value;
    drawList();
}

function handleMonthChange( select ){
    GLOBAL.date.month = select.value;
    drawList();
}

function drawList(){
    elHabitList.innerHTML = '';
    HABIT_LIST[GLOBAL.date.full()].forEach( (data, idx) => {
        drawItem(data, idx);
    });
}

function drawItem( data, idx ){
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
        let list = HABIT_LIST[GLOBAL.date.full()];
        let idx = list.length;
        if( habits.include(val) ){
            alert('이미 등록된 타이틀입니다.')
        } else{
            list.push(val);
            drawItem( val, idx );
            console.log(list);
        }
        elTitle.value = '';
    }

    return false;
}


function handleItemSubmit( form, idx ){
    let val = form.itemInput.value;
    let list = HABIT_LIST[GLOBAL.date.full()];
    if( val && val !== list[idx] ){
        if( habits.include(val) ){
            alert('이미 등록된 타이틀입니다.')
            form.itemInput.value = list[idx];
        } else{
            habits.update(val, idx);
        }
        console.log(list);
    } else if(!val){
        alert("타이틀을 입력해주세요.")
    }
    return false;
}

function handleItemBlur( input, idx ){
    handleItemSubmit( input.parentElement, idx )
}

function handleView(idx){
    console.log('handleView', idx);
    // location.href = '/view?id=idx'
}

function handleDelete( idx ){
    habits.delete(idx);
    drawList();
    // let node = elHabitList.querySelector('li[data-index="' + idx + '"]');
    // node.remove();
    console.log(HABIT_LIST[GLOBAL.date.full()]);
}





