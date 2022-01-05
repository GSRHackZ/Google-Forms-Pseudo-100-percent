// ==UserScript==
// @name         Google Forms Pseudo 100%
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Tricks your teacher into thinking you got a 100% on the assignment. Send teacher a screenshot or video of the results. >_<
// @author       GSRHackZ
// @match        https://docs.google.com/forms/*
// @icon         https://i.ibb.co/Y8z7D7X/check.png
// @grant        none
// ==/UserScript==

let score = document.getElementsByClassName("freebirdFormviewerViewHeaderGradeFraction freebirdSolidBackground")[0];
function fixGrade(){
    let max = score.innerText.split("/")[1]
    score.innerText=`${max}/${max}`;
    let questScores = document.getElementsByClassName("freebirdFormviewerViewItemsItemScore");
    for(let i=0;i<questScores.length;i++){
        max = questScores[i].innerText.split("/")[1];
        questScores[i].innerText = `${max}/${max}`;
    }
    let inp_areas = document.getElementsByClassName("freebirdFormviewerViewItemsTextItemWrapper freebirdFormviewerViewItemsTextTextItemContainer");
    for(let i=0;i<inp_areas.length;i++){
        let correct = inp_areas[i].classList[2].split("Incorrect")[0]+"Correct";
        inp_areas[i].classList.add(correct);
        inp_areas[i].classList.remove("freebirdFormviewerViewItemsTextIncorrect");
    }
    let incorrect = document.getElementsByClassName("freebirdMaterialIconIconImage freebirdMaterialIconIconM2Icon");
    let correct = 'freebirdMaterialIconIconImage freebirdMaterialIconIconM2Icon freebird-qp-icon-check-green-m2';
    for(let i=0;i<incorrect.length;i++){
        incorrect[i].className=correct;
    }

    let quests = document.getElementsByClassName("freebirdFormviewerViewItemsItemItemTitle exportItemTitle freebirdCustomFont");
    for(let i=0;i<quests.length;i++){
        quests[i].style.color="#1e8e3e";
    }

    let answers = document.getElementsByClassName("freebirdFormviewerViewItemsTextCorrectAnswerBox");
    let collected = [];
    for(let i=0;i<answers.length;i++){
        collected.push(answers[i].children[0].innerText);
    }
    let proof = document.getElementsByClassName("freebirdFormviewerViewItemsItemGradingCorrectAnswerBox");
    for(let i=0;i<proof.length;i++){
        proof[i].style.display="none";
    }
    let inps = document.getElementsByClassName("freebirdFormviewerViewItemsTextShortText freebirdFormviewerViewItemsTextDisabledText freebirdThemedInput");
    for(let i=0;i<inps.length;i++){
        inps[i].innerHTML=collected[i];
    }
}

fixGrade();
