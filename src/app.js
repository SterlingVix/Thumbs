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


$micButton.on('event', function() {
  console.log(event);
});



var streamAudio = function() {
  navigator.getUserMedia(
    {audio: true},
    startAudioStream,
    audioStreamError
  ); // end getUserMedia()  <== constraint, success callback, failure callback
}; // end streamAudio()

var startAudioStream = function(localMediaStream) {
//   audioElement.play();
  audioElement.src = URL.createObjectURL(localMediaStream);
  audioElement.volume = 0.8;
  source = audioContext.createMediaStreamSource(localMediaStream);
  audioStream = source.mediaStream;
  audioStreamTrack = (audioStream.getAudioTracks())[0];
  
  
  console.log(audioElement, audioContext, localMediaStream, audioStream, source, audioStreamTrack);
}; // end stream

var stopAudioStream = function() {
  audioStreamTrack.stop();
  audioElement.pause(); // might break
  audioElement.src = ""; // end stream source
  // audioGainNode.disconnect(audioDestination);
}; // end stopAudioStream();


var audioStreamError = function(err) {
  console.log('The following gUM error occured: ' + err);
}