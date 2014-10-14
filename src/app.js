$micButton.on('click', function() {
  if (micOnFlag === false) { // mic is off
    if (!!navigator.getUserMedia) { // can capture media
    $micButton.css('box-shadow', 'inset 0 0 5em #777777, 0 0 5em #AA7777');
    $micButton.css('background', '#aaCCCC');
      streamAudio();
    micOnFlag = true;
    } else { // no gUM
      console.log('HTML5 streaming media is not supported in your browser');
    } // end if hasGetUserMedia()
  } else { // mic is on
    $micButton.css('box-shadow', 'inset 0 0 0em black, 0 0 0em black');
    $micButton.css('background', '#CCCCCC');
    stopAudioStream();
    micOnFlag = false;
  }
}); // click function

$gain.on('mouseup', function() {
//   gainNode.gain.value = (CurY/HEIGHT) * maxVol;
  
  gainValue = $gain[0].value; // update gain value
  gainValueAsNumber = $gain[0].valueAsNumber;
  audioGainNode.gain.value = gainValueAsNumber;
  console.log(gainValue, ", ", $gain[0].valueAsNumber , ", ", audioGainNode.gain.value);
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
        
        /////////////////   CALLBACK???   /////////////////
//      $.getJSON('/thumb', function( data ) { audioDestination = data;}); // get audioDestination item from server
//      $.getJSON('/thumb', function( data ) { audioDestination = data; console.log(data); }); // get audioDestination item from server
        /////////////////   CALLBACK???   /////////////////
        
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
  sourceNode.connect(audioGainNode); // connect audio stream to destination
  audioGainNode.connect(audioDestination); // connect audio stream to destination
  audioStreamTrack = (audioStream.getAudioTracks())[0];
  console.log(audioStreamTrack);

  if (isDestinationMachine) {
    assignAudioStream(audioStreamURL); // assign audio stream
  } else {// is not destination machine
    
    // 
    
  } // end (if is destination mechine)

}; // end applyStreamToAudioNodes

var stopAudioStream = function() {
  audioElement.src = ""; // end stream source
//   audioStreamTrack.stop();
//   audioGainNode.disconnect(audioDestination);
}; // end stopAudioStream();

var assignAudioStream = function(streamURL) {
  audioElement.src = streamURL; // !!!!!!!!!!!!!!  
  audioElement.volume = 0.8;
}; // end assignAudioStream


/////////////////////////////////////////////////////////////////


// $.post(url)
// $.post( url, [data], [callback function], [type] )
// $.post( '/destination', audioDestination, [callback function], json );
var postJSON = function() {
  $.getJSON('/destination', 'Aaron');


// $.post( "test.php", { name: "John", time: "2pm" } );
$.post( "/destination", { name: "John", time: "2pm" } );
$.post( "", { name: "John", time: "2pm" } );
$.getJSON('/destination', {'audioDestination': audioDestination}); // get audioDestination item from server
};  


var getJSONFunctionFast = function() {
  $.getJSON('/thumb', function( data ) { console.log(data); }); // end immediate function
}; // end getJSONFunctionFast
// data = data.responseJSON (Object), responseText (text)

var getJSONFunction = function() {
$.getJSON('/thumb')
  .done(
    function( data ) {console.log("in getJSON function"); console.log(data.audioDestination); audioDestination = data.audioDestination;
}); // end GET with promise
};