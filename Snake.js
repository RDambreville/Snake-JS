import * as DrawService from '../draw.js'; 

// ====================== Method definitions =====================

function checkIfServiceLoaded() {
    DrawService.checkIfLoaded();
}

function openAlert() {
    alert('alert opened!');
    checkIfServiceLoaded();
}

// ======================== Method calls =========================
document.querySelector('#checkButton')
    .addEventListener('click', openAlert);
