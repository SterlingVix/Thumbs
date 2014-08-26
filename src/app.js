$micButton.on('mousedown', function() {
    if (!!navigator.getUserMedia) { // can capture media
      streamAudio();
    } else {
      console.log('HTML5 streaming media is not supported in your browser');
    } // end if hasGetUserMedia()
}); // click function

$micButton.on('mouseup', function() {
  stopAudioStream();
}); // click function


$micButton.on('event', function() {
  console.log(event);
});

var streamAudio = function() {
  if (noStreamFlag) { // create audio stream here once and only once
    noStreamFlag = false; // set flag to false
    
    navigator.getUserMedia(
      {audio: true},
      function(localMediaStream) {
        sourceNode = audioContext.createMediaStreamSource(localMediaStream); // MediaStreamAudioSourceNode
        audioStreamURL = URL.createObjectURL(localMediaStream); // blob:http...
        applyStreamToAudioNodes();
      },
      function(err) {
        console.log('The following gUM error occured: ' + err);
      }
    ); // end getUserMedia()  <== constraint, success callback, failure callback
  } else { // end if(streamFlag)
    applyStreamToAudioNodes();
  } // end if-else (flag)
}; // end streamAudio()

var applyStreamToAudioNodes = function() {
        // apply stream to audioNodes
        audioStream = sourceNode.mediaStream;
        sourceNode.connect(audioDestination); // connect audio stream to destination
        audioStreamTrack = (audioStream.getAudioTracks())[0];
        
        audioElement.src = audioStreamURL; // !!!!!!!!!!!!!!
        audioElement.volume = 0.8;
}; // end applyStreamToAudioNodes

var stopAudioStream = function() {
//   audioStreamTrack.stop();
  audioElement.src = ""; // end stream source
//   audioGainNode.disconnect(audioDestination);
}; // end stopAudioStream();