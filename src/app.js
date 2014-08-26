$micButton.on('mousedown', function() {
    if (!!navigator.getUserMedia) { // can capture media
    streamAudio();
    } else {
      console.log('HTML5 streaming media is not supported in your browser');
    } // end if hasGetUserMedia()
}); // click function

$micButton.on('mouseup', function() {
  stopAudioStream();
//     oscillator.stop();
}); // click function

var streamAudio = function() {
  console.log("in streamAudio");
//   debugger;

  navigator.getUserMedia(
    {audio: true},
    startAudioStream,
    audioStreamError
  ); // end getUserMedia()  <== constraint, success callback, failure callback
}; // end streamAudio()

var startAudioStream = function(localMediaStream) {
//   debugger;
//     var source = audioContext.createMediaStreamSource(stream); // Create a MediaStreamAudioSourceNode & feed the HTMLMediaElement into it

//       { 
//         // ... use 'stream' ...
//         var audio = document.getElementsByTagName('audio')[0];
//         audio.src = stream; 
//       }
  audioStream = localMediaStream;
  console.log('\nlocalMediaStream= ', localMediaStream);
  
  audioElement.src = URL.createObjectURL(localMediaStream);
  console.log("\nin getUserMedia");
  console.log('\nsource= ', source);
  console.log('\ndest= ', dest);
  console.log('\naudioContext= ', audioContext);

  audioElement.src = dest; // TEST
  source = audioContext.createMediaStreamSource(localMediaStream);
  source.connect(dest);
  audioElement.play();
//         source.connect(audioContext.destination);

//         var gainNode = audioContext.createGain();
//         gainNode.gain=1;
//         source.connect(gainNode);
//         gainNode.connect(audioContext.destination);
}; // end stream

var stopAudioStream = function() {
  console.log("inside stopAudioStream()"); // 
}; // end stopAudioStream();


var audioStreamError = function(err) {
  console.log('The following gUM error occured: ' + err);
}