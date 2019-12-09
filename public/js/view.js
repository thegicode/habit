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
    }
};



/* Call Function */
initial();
drawTitle();
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
    document.querySelector('.contents h3').textContent = habitName;
}

function drawList(){
    let arr = [];
    for(let i=0 ; i<30 ; i++){
        arr.push( template.item(i+1) );
    }
    document.querySelector('.contents ul').innerHTML = arr.join('');
}



/* Event Handle */
function handleCheck( el ){
    console.log(el.name);
    console.log(el.checked);
}







