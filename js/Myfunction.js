function MarkParagraph(paragraph, selectnumber) {
    return(
        paragraph.replace(paragraph.substring(0, selectnumber), 
        `<mark>${paragraph.substring(0, selectnumber)}</mark>`)
    )
}

function StringWordsArray(number, strarr) {
    let j=0; let i=0;
    let array = [];
    console.log("start");
    if (strarr[i] == " ") {
        array[j]="";
        for (i = 1; i < strarr.length; i++) {
            // console.log(strarr);
            if (strarr[i] == " ") {
                i=i+1;
                j++;
                array[j]="";
            }
            array[j] += strarr[i];
        }
    }else{
        array[j]="";
        for (i = 0; i < strarr.length; i++) {
            // console.log(strarr);
            if (strarr[i] == " ") {
                i=i+1;
                if(j == number){
                    break;
                }
                j++;
                array[j]="";
            }
            array[j] += strarr[i];
        }
    }
    return array;
}

function Random(number){
    return Math.floor(Math.random()*number)
}

export { MarkParagraph, StringWordsArray, Random }