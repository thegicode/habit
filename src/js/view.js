"use strict";

console.log('localStorage', localStorage);


/* Global_view */
let Global_view = {};



/* Template */
const template = {
    item: function(date){
        return(
            `<li>
                <label>
                  <input type="checkbox" name="day_${date}" onchange="handleCheck(this)">
                  <span class="__text">${date}</span>
                </label>
            </li>`
        )
    },
    option: function(idx, name){
        return(
            `<option value="${idx}">${name}</option>`
        )
    }
};



/* Call Function */
initial();
drawTitle();
drawOptins();
drawList();



/* Fucntions */
function initial(){
    let items = location.search.replace('?','').split('&');
    let obj = {};
    items.forEach( item => {
        let val = item.split('=');
        obj[val[0]] = val[1];
    });
    Global_view = obj;
    console.log('Set Global_view > view', Global_view);
}

function drawTitle(){
    let habits = JSON.parse(localStorage.getItem('habits'));
    let habitName = habits[Global_view.date][Global_view.idx];
    let habitDate = Global_view.date.replace('d_','');
    document.querySelector('.contents h2').innerHTML = `${habitDate.substring(0,4)}.${habitDate.substring(4,6)}`;
    document.querySelector('.contents h3').textContent = habitName;
}

function drawOptins(){
    let habits = JSON.parse(localStorage.getItem('habits'));
    let habitsYear = habits[Global_view.date];
    console.log(habitsYear);
    let arr = habitsYear.map(  (item, idx) => {
        return template.option(idx, item);
    });
    document.querySelector('.formSelect select').innerHTML =  arr.join('');
}

function drawList(){
    let arr = [];
    for(let i=0 ; i<30 ; i++){
        arr.push( template.item(i+1) );
    }
    document.querySelector('.contents ul').innerHTML = arr.join('');
}



/* Event Handle */
function handleSelect( select ){
    console.log(select.value)
}

function handleCheck( inut ){
    console.log(inut.name);
    console.log(inut.checked);
}








