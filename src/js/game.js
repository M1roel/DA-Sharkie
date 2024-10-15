let canvas;
let ctx;
let charakter = new MoveableObject();

function init() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    
    console.log('My charakter is', MoveableObject);
}