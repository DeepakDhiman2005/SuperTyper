let inputid = document.getElementById('inputid');
let textid = document.getElementById('textid');
let btnid = document.getElementById('btnid');

// let todolisthisbox = document.querySelector('todolist-history-box');
let todolisthisbox = document.getElementById('todolisthisbox');
let todolisthistory = document.querySelector('todolist-history');

btnid.addEventListener('click', ()=>{Addlist(inputid.value, textid.value)});

function Addlist(title, text){
    let array = [];
    if (localStorage.getItem('todolist') == null) {
        array.push([title, text]);
        localStorage.setItem('todolist', JSON.stringify(array));
    }else{
        let catchtodolist = localStorage.getItem('todolist');
        array = JSON.parse(catchtodolist);
        array.push([title, text]);
        localStorage.setItem('todolist', JSON.stringify(array));
    }
    updatelist();
}

function updatelist(){
    if (localStorage.getItem('todolist') == null) {
        let strarray = [];
        localStorage.setItem('todolist', JSON.stringify(strarray));
    }else{
        let strarraycatch = localStorage.getItem('todolist');
        strarray = JSON.parse(strarraycatch);
    }
    let str="";
    strarray.forEach((element, index) => {
        // console.log(index); // index is 0, 1 etc
        str +=`
        <div class="todolist-history">
            <div class="box-top-side">
                <div class="left-side">${element[0]}</div>
                <div class="right-side">
                    <button id="Edit" onclick="TodoEdit(${index})">Edit</button>
                    <button id="deleted" onclick="deleted(${index})">Delete</button>
                </div>
            </div>
            <div class="box-center-side">
                ${element[1]}
                <button id="readbtnid">Read...</button>
            </div>
        </div>
    `
    });
    todolisthisbox.innerHTML = str;
}
updatelist();

function deleted(itemIndex) {
    console.log("deleted", itemIndex);
    let itemJsonArrayStr = localStorage.getItem('todolist');
    let itemJsonArray = JSON.parse(itemJsonArrayStr);
    // Delete itemIndex element from the array
    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('todolist', JSON.stringify(itemJsonArray));
    updatelist();
}

function TodoEdit(itemIndex){
    console.log("Edit ", itemIndex);
    let Editstage = JSON.parse(localStorage.getItem('todolist'));
    inputid.value = Editstage[itemIndex][0];
    textid.value = Editstage[itemIndex][1];
}

let Edit = document.querySelectorAll('button#Edit');
let dele = document.querySelectorAll('button#deleted');