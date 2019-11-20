"use strict";

console.log('localStorage', localStorage);


/* Date */
const DATE_LIST = {
    year: [2019, 2020],
    month: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
};



/* Template */
const template = {
    item: function( data, idx ){
        return(
            `<form class='list-form' onsubmit='return handleItemSubmit(this, ${idx});'>
                <input type='text' name='itemInput' value=${data} class='list-title' onblur='handleItemBlur(this, ${idx})'></input>
                <div class="list-actions">
                    <button type='button' class='list-button' onclick='handleView(${idx});'>보기</button>
                    <button type='button' class='list-button' onclick='handleDelete(${idx});'>삭제</button>
                </div>
            </form>`
        )
    },
    selectYear: function(year, cur){
        if(year === cur)
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



/* Global Variable */
let GLOBAL = {
    storageName: 'habits'
};



/* Call Function */
initial();
setDate();
drawSelect();
drawList();


/* Initial */
function initial(){
    if( !localStorage.getItem(GLOBAL.storageName) ){
        let obj = {};
        localStorage.setItem(GLOBAL.storageName, JSON.stringify(obj));
        console.log('initial', localStorage);
    }
}

/* Draw Template */
function drawSelect(){

    const formSelect = document.formSelect;

    let yearList, monthList,
        arrYear = [],
        arrMonth = [];

    if(!DATE_LIST || !DATE_LIST.year || !DATE_LIST.month || DATE_LIST.year.length===0 || DATE_LIST.month.length===0) {
        return;
    }

    yearList = DATE_LIST.year;
    monthList = DATE_LIST.month;

    arrYear = yearList.map( function( year ){
        return template.selectYear(year, GLOBAL.habitDate.year);
    });
    formSelect.year.innerHTML = arrYear && arrYear.join('');
    
    arrMonth = monthList.map( function( month ){
        return template.selectMonth(month, GLOBAL.habitDate.month);
    });
    formSelect.month.innerHTML = arrMonth && arrMonth.join('');

    formSelect.setAttribute('aria-hidden', 'false');
}

function drawList(){
    let storage, list;
    elHabitList.innerHTML = '';
    storage = JSON.parse(localStorage.getItem('habits'));
    if(!storage) return;

    list = storage[GLOBAL.habitDate.fullName()];
    if(!list || list.length === 0 ) return;
    list.forEach( function(data, idx){
        drawItem(data, idx)
    });
}

function drawItem( data, idx ){
    let el = document.createElement('li');
    el.setAttribute( 'data-index', idx );
    el.className = 'list-item';
    el.innerHTML = template.item(data, idx);
    elHabitList.appendChild( el );
}


/* Handle Data */
let handleData = {
    getData: function(){
        let storage = JSON.parse( localStorage.getItem(GLOBAL.storageName) );
        return storage;
    },
    getDataOfDate: function(){
        let storage = JSON.parse( localStorage.getItem(GLOBAL.storageName) );
        return storage[GLOBAL.habitDate.fullName()] || [];
    },
    setDataOfDate: function( arr ){
        let data = this.getData(), 
            date = GLOBAL.habitDate.fullName();
        data[date] = arr;
        localStorage.setItem(GLOBAL.storageName, JSON.stringify(data));
    },
    include: function( val ){
        let arr = this.getDataOfDate();
        return arr.indexOf(val) > -1;
    },
    add: function( val ){
        let arr = this.getDataOfDate();
        arr.push(val);

        this.setDataOfDate(arr);

        console.log('add', localStorage);
    },
    delete: function( idx ){
        let arr = this.getDataOfDate();
        arr.splice(idx, 1);

        this.setDataOfDate(arr);

        console.log('delete', localStorage);
    },
    update: function(val, idx){
        let arr = this.getDataOfDate();
        arr[idx] =  val;

        this.setDataOfDate(arr);

        console.log('add', localStorage);

    }
}



/* Function */
function setDate(){
    const currentDate = new Date;
    GLOBAL.date = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()+1,
        fullName: function(){
            return `d_${this.year}${this.month}`
        }
    };
    GLOBAL.habitDate = {
        year: currentDate.getFullYear(),
        month: currentDate.getMonth()+1,
        fullName: function(){
            return `d_${this.year}${this.month}`
        }
    };
    console.log(GLOBAL.habitDate);
}


/* Event Function */
function handleSelect( form ){
    GLOBAL.habitDate.year = form.year.value;
    GLOBAL.habitDate.month = form.month.value;
    drawList();
    console.log(GLOBAL.habitDate.fullName())
    return false;
}

function handleInput( form ){
    let elTitle = form.title,
        val = elTitle.value;
    if(!val)
        elTitle.focus();
    else{
        if( handleData.include(val) ){
            alert('이미 등록된 습관입니다.')
        } else{
            let idx;
            handleData.add(val); 
            idx = handleData.getDataOfDate().length-1 || 0 ;
            drawItem(val, idx);
        }
        elTitle.value = '';
    }
    return false;
}

function handleItemSubmit( form, idx ){
    let val = form.itemInput.value;
    let list = handleData.getDataOfDate();
    if( val && val !== list[idx] ){
        if( handleData.include(val) ){
            alert('이미 등록된 타이틀입니다.')
            form.itemInput.value = list[idx];
        } else{
            handleData.update(val, idx);
        }
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
    handleData.delete(idx);
    drawList();
    // let node = elHabitList.querySelector('li[data-index="' + idx + '"]');
    // node.remove();
    // console.log(HABIT_LIST[GLOBAL.habitDate.fullName()]);
}





