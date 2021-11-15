let VIDEO = null;
let CANVAS = null;
let CONTEXT = null;
let SCALER = 0.6;
let SIZE = { x: 0, y: 0, width: 0, height: 0 };

function main() {
    CANVAS = document.getElementById("myCanvas");
    CONTEXT = CANVAS.getContext("2d");
    // console.log("main")
    let promise = navigator.mediaDevices.getUserMedia({ video: true });
    promise.then(function(signal) {
        VIDEO = document.createElement("video");
        VIDEO.srcObject = signal;
        VIDEO.play();

        VIDEO.onloadeddata = function() {
            handleResize();
            // window.addEventListener('resize', handleResize);
            updateCanvas();
        }
    }).catch(function(err) {
        alert("Camera error: " + err);
    })
}

function handleResize() {

    CANVAS.width = window.innerWidth;
    CANVAS.height = window.innerHeight;

    let resizer = SCALER *
        Math.min(
            window.innerWidth / VIDEO.videoWidth,
            window.innerHeight / VIDEO.videoHeight
        );
    SIZE.width = resizer * VIDEO.videoWidth;
    SIZE.height = resizer * VIDEO.videoWidth;
    SIZE.x = window.innerWidth / 2 - SIZE.width / 2;
    SIZE.y = window.innerHeight / 2 - SIZE.width / 2;
}

function updateCanvas() {
    CONTEXT.drawImage(VIDEO,
        SIZE.x, SIZE.y,
        SIZE.width, SIZE.height);
    window.requestAnimationFrame(updateCanvas);
}