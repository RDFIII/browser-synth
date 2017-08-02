context = new AudioContext();

setInterval(function(){
	$("#time").text(Math.floor(context.currentTime));
}, 1000);

function startOsc(frequency){  // Frequency is passed to this function
	// buffer
	buffer = context.createBuffer(1, 22050, 22050);
	// oscillatorNode
	const oscillator = context.createOscillator(); // Create sound source
	oscillator.type = 'sine'; // Sine wave
	oscillator.frequency.value = frequency; // Frequency in hertz (passed from noteHash)
	oscillator.start(0); // Play oscillator immediately, start at 0 seconds
	// gainNode
	gain = context.createGain(); // Create gain node
	gain.gain.value = 0.1; // Set gain to full volume
	// Connect the Nodes
	oscillator.connect(gain); // Connect oscillator to gain
	gain.connect(context.destination); // Connect gain to output
  return oscillator;
};


function off(oscillator) {
	oscillator.stop(0); // Stop oscillator immediately, after 0 seconds
  oscillator.disconnect(); // Disconnect oscillator
}



$(window).keydown(function(event){
	if (event.key === "d") {
		noteHash[event.key] = ((Math.random()+10)*((Math.random()+1)*100));
		oscHash[event.key] = startOsc(noteHash[event.key]);
	}
  else if (!event.originalEvent.repeat && event.key in noteHash) {
    oscHash[event.key] = startOsc(noteHash[event.key]);
  }
});


var oscHash = {} // Populated as a note/oscillator is engaged, repetitions are overwritten

var noteHash = {  // keys are keyboard keys, values are note frequencies
	1: 155.56, // D#3
	q: 164.81, // E3
	w: 174.61, // F3
	3: 185.00, // F#
	e: 196.00, // G3
	4: 207.65, // G#3
	r: 220.00, // A3
	5: 233.08, // A#3
	t: 246.94, // B3
	y: 261.63, // C4
	7: 277.18, // C#4
	u: 293.66, // D3
	8: 311.13, // D#3
	i: 329.63, // E3
	o: 349.23, // F4
	0: 369.99, // F#4
	p: 392.00, // G4
	// -------- NEXT LINE ---------
	a: 415.30, // G#4
  z: 440,     // A4
  s: 466.16,  // A#4
  x: 493.88,  // B4
	d: 100,
  c: 523.25,  // C5
  f: 554.37,  // C#5
  v: 587.33,  // D5
  g: 622.25,  // D#5
  b: 659.25,  // E5
  n: 698.46,  // F5
  j: 739.99,  // F#5
  m: 783.99,  // G5
  k: 830.61,  // G#5
  // ,: 880.00,  A5
  // l: 932.33,  A#5
  // .: 987.77,  B5a
}

$(window).keyup(function(event){
	console.log(event.key);
  if (event.key in oscHash) {
    off(oscHash[event.key]);
		delete oscHash[event.key];
  }
});

// ---------------------------------------------

// Analyzer

var analyser = context.createAnalyser();
