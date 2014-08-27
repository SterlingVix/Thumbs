$micButton.on('mousedown', function() {
    if (!!navigator.getUserMedia) { // can capture media
    $micButton.css('box-shadow', 'inset 0 0 5em #777777, 0 0 5em #AA7777');
    $micButton.css('background', '#aaCCCC');
      streamAudio();
    } else {
      console.log('HTML5 streaming media is not supported in your browser');
    } // end if hasGetUserMedia()
}); // click function

$micButton.on('mouseup', function() {
  $micButton.css('box-shadow', 'inset 0 0 0em black, 0 0 0em black');
  $micButton.css('background', '#CCCCCC');
  stopAudioStream();
}); // click function

var streamAudio = function() {
  if (noStreamFlag) { // create audio stream here once and only once
    noStreamFlag = false; // set flag to false
    
    navigator.getUserMedia(
      {audio: true},
      function(localMediaStream) {
        /////////////////   CALLBACK???   /////////////////
        /////////////////   CALLBACK???   /////////////////
        /////////////////   CALLBACK???   /////////////////
        $.getJSON('/thumb', function( data ) { audioDestination = data;}); // get audioDestination item from server
//      $.getJSON('/thumb', function( data ) { audioDestination = data; console.log(data); }); // get audioDestination item from server
        /////////////////   CALLBACK???   /////////////////
        /////////////////    .done()???   /////////////////
        /////////////////   CALLBACK???   /////////////////
        
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
        debugger;
}; // end applyStreamToAudioNodes

var stopAudioStream = function() {
//   audioStreamTrack.stop();
  audioElement.src = ""; // end stream source
//   audioGainNode.disconnect(audioDestination);
}; // end stopAudioStream();




/////////////////////////////////////////////////////////////////


var audioDestinationJSON = {
  'audioDestination' : audioDestination
};





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
  function( data ) {
    console.log("in getJSON function");
    console.log(data.audioDestination);
    audioDestination = data.audioDestination;
}); // end GET with promise
};


// $.getJSON( "ajax/test.json", function( data ) {
//   var items = [];
//   $.each( data, function( key, val ) {
//     items.push( "<li id='" + key + "'>" + val + "</li>" );
//   });
 
//   $( "<ul/>", {
//     "class": "my-new-list",
//     html: items.join( "" )
//   }).appendTo( "body" );
// });


// JSON.stringify(audioDestination);
//JSON.parse(;)