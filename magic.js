function guessNote(spectrum){
    var notes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        primaryNote = 0,
        primaryNoteEnergy = -Infinity,
        total = 0,
        energy,
        freq,
        note;

    for(var i = 19; i < spectrum.length; i++) {
        energy = Math.pow(10, spectrum[i]/10);
        freq = i*audioContext.sampleRate/spectrum.length/2,
        note = Math.round(
            Math.log(freq/440)/Math.log(2)*12)%12;
        notes[note] += energy;
        if(notes[note] > primaryNoteEnergy){
            primaryNote = freq;
            primaryNoteEnergy = notes[note];
        }
        total += energy;
    }
    return {
        totalEnergy: total,
        primaryNoteEnergy: primaryNoteEnergy,
        primaryNote: primaryNote
    };
}
c.addEventListener('dragover', function(e){
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
}, false);

c.addEventListener('drop', function(e) {
    var files = e.dataTransfer.files;
    if(files.length > 0){
        a.pause();
        if(a.src){
            URL.revokeObjectURL(a.src);
        }
        a = document.createElement('audio');
        a.src = URL.createObjectURL(files[0]);
        a.addEventListener('canplay', function() {
            source = actx.createMediaElementSource(a),
            analyser.fftSize = FFT_SIZE;
            analyser.smoothingTimeConstant = 0.0;
            analyser = actx.createAnalyser();
            analyser.connect(actx.destination);
            source.connect(analyser);
            a.play();
        }, false);
    }
    e.preventDefault();
}, false); 

