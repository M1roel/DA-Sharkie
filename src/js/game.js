let canvas;
let ctx;
let charakter = new Image();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    charakter.src = '/public/img/1.Sharkie/1.IDLE/1.png';
    ctx.drawImage(charakter, 20, 20, 50, 150);
}