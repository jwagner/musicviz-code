var AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext,
    audioContext = new AudioContext(),
    audio;

function play(src){
    audio = document.createElement('audio');
    audio.src = src;
    audio.controls = true;
    document.body.appendChild(audio);
    audio.addEventListener('canplay', function() {
        source = audioContext.createMediaElementSource(audio);
        analyser = audioContext.createAnalyser();
        analyser.smoothingTimeConstant = 0.0;
        spectrum = new Float32Array(analyser.fftSize/8);
        source.connect(analyser);
        analyser.connect(audioContext.destination);
        audio.play();
        setInterval('draw();', 10);
    }); 
}

//play('music/jt-bruce-dreamers-overture.ogg');
play('music/kendra-springer-hope.mp3');
//play('music/aphex.ogg');
//play('music/cats.ogg');
