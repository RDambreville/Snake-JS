import * as DrawService from '../draw.js'; 

function checkIfServiceLoaded() {
    // checkIfLoaded();
    DrawService.checkIfLoaded();
    // alert('Draw service loaded!!');
}

function openAlert() {
    alert('alert opened!');
    checkIfServiceLoaded();
}

document.querySelector('#checkButton')
    .addEventListener('click', openAlert);

// checkIfServiceLoaded();