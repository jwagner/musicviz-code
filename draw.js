var ctx = c.getContext('2d');
ctx.fillRect(0, 0, c.width, c.height);
var imageData = ctx.getImageData(0, 0, 1, c.height);
function draw(){
    if(audio.paused) return;
    analyser.getFloatFrequencyData(spectrum);
    var guess = guessNote(spectrum),
        hue = Math.round(guess.primaryNote/12*255),
        alpha = guess.totalEnergy*100;
    ctx.strokeStyle = 'hsla(' + hue + ', 50%, 10%, ' + alpha + ')';
    ctx.lineWidth = 4;
    ctx.beginPath();
    for(var i = 0; i < spectrum.length; i++) {
        ctx.lineTo(i/spectrum.length*c.width, 400+spectrum[i]*2);
    }
    //ctx.fillRect(0, 0, c.width, c.height);
    ctx.globalCompositeOperation = 'lighter';
    ctx.stroke();
    ctx.globalCompositeOperation = 'source-over';
    ctx.drawImage(c, -4, -1, c.width+8, c.height+8);
}
