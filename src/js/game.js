let canvas;
let ctx;
let charakter = new Character();
let enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken()
];

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    console.log('My charakter is', charakter);
}