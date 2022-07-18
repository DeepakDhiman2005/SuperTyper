import { MarkParagraph, StringWordsArray, Random } from '../js/Myfunction.js'
let boxcontainer = document.querySelector('div.random-box-style');
let box = boxcontainer.getElementsByTagName('div');
let inputid = document.getElementById('inputid');
let btn = document.getElementById('btn');
let increase = 0; let decrease= -60;
let k=0; let i=0;
let time = 70;
let score=0;

let paragraph = `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, sed. 
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, sed. 
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, sed. 
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste, sed.`.trim();
let array = StringWordsArray(paragraph.length, paragraph);
// console.log(array.length);

box[0].innerText = `${array[Random(40)]}`.trim();
box[1].innerText = `${array[Random(40)]}`.trim();
box[2].innerText = `${array[Random(40)]}`.trim();
box[3].innerText = `${array[Random(40)]}`.trim();
box[4].innerText = `${array[Random(40)]}`.trim();

btn.addEventListener('click', ()=>{
    alert("Game Start: Type This Words!");
    console.log("game start!");
    score=0;
    let timer = setInterval(()=>{
        if (box[4].style.marginLeft == '0%') {
            score=score+i;
            box[0].style.marginLeft = '-150%';
            box[1].style.marginLeft = '-150%';
            box[2].style.marginLeft = '-150%';
            box[3].style.marginLeft = '-150%';
            box[4].style.marginLeft = '-150%';
            box[0].innerText = `${array[Random(40)]}`;
            box[1].innerText = `${array[Random(40)]}`;
            box[2].innerText = `${array[Random(40)]}`;
            box[3].innerText = `${array[Random(40)]}`;
            box[4].innerText = `${array[Random(40)]}`;
            i=0; k=0;
            inputid.value = "";
            decrease=-60;  increase=0; 
        }
        else if (box[increase].style.marginLeft == '0%') {
            if(inputid.value == box[i].innerText){
                box[i].style.marginLeft = '0%';
                inputid.value = "";
                k=0; i++;
                decrease=-60; increase++; 
            }
            else{
                score=score+i;
                alert("Game over! Your Score: "+score);
                console.log('stop')
                decrease=-60; increase=0; 
                k=0; i=0;
                box[0].style.marginLeft = '-150%';
                box[1].style.marginLeft = '-150%';
                box[2].style.marginLeft = '-150%';
                box[3].style.marginLeft = '-150%';
                box[4].style.marginLeft = '-150%';
                inputid.value = "";
                clearInterval(timer);
                // let scorecontainer={H:score,S:score};
                ScoreBox(score);
            }
        }
        else{
            box[increase].style.marginLeft = decrease+'%';
            decrease++;
        }
    }, time);
});

inputid.addEventListener('keyup',(e)=>{
    // console.log(e.key)
    if(e.key == "Enter"){
        console.log("Enter");
        if (inputid.value === box[i].innerText) {
            box[i].style.marginLeft = '0%';
            inputid.value = "";
            i++; k=0;
            decrease=-60;  increase++; 
        }
    }
    else if(inputid.value[k] == box[i].innerText[k]){
        box[i].innerHTML = MarkParagraph(box[i].innerText, k+1)
        k++;
    }
    else if(e.key == "Backspace"){
        if(k == 0){
            k=0;
        }else{
            k--;
        }
    }
});

let scorebox = document.querySelector('div.score-box');
function ScoreBox(score) {
    if (localStorage.getItem('game2data') == null) {
        let highscore=score;
        localStorage.setItem('game2data', JSON.stringify(highscore));
    }
    else{
        let scorecontainer = JSON.parse(localStorage.getItem('game2data'));
        if (scorecontainer < score) {
            scorecontainer=score;
            localStorage.setItem('game2data', JSON.stringify(scorecontainer));
        }
        updatescore();
    }
}

function updatescore(){
    if(localStorage.getItem('game2data') == null){
        let highscore=score;
        localStorage.setItem('game2data', JSON.stringify(highscore));
    }
    else{
        let PassScore = JSON.parse(localStorage.getItem('game2data'));
        if (PassScore < score) {
            PassScore=score;
            localStorage.setItem('game2data', JSON.stringify(PassScore));
        }else{
            let str=`
            <div class="top-side">
                    <i>Highest Score: ${PassScore}</i>
                    <button class="btn" id="dele">Delete</button>
                </div>
            <div class="bottom-side">Your Score: ${score}</div>
            `;
            scorebox.innerHTML = str;
        }
    }
}
updatescore();

let dele = document.getElementById('dele');
dele.addEventListener('click',()=>{
    console.log("delete")
    localStorage.removeItem('game2data');
    // updatescore();
    scorebox.innerHTML =`
    <div class="top-side">
        <i>Highest Score: ${0}</i>
        <button class="btn" id="dele">Delete</button>
    </div>
    <div class="bottom-side">Your Score: ${0}</div>
    `;
});