var windowContext = this;

var WIDTH = window.innerWidth;
var HEIGHT = window.innerHeight;

var isDestinationMachine = false; // flag for destination machine

var $gain = $('.gain');
var gainValue = $gain[0].value;

var $micButton = $('.mic-button');
$micButtonWidth = $micButton.width();
$micButton.height = $micButtonWidth;
var micOnFlag = false;

var $mainScreen = $('.main-screen');
$mainScreenW = $('body').clientWidth || 320;
$mainScreenH = $('body').clientHeight || 480;

// if(WIDTH < HEIGHT) { // width is smaller
//   $micButton.css('width', '100%');
// } else { // height is smaller
    
// } // end (resize mic button)

var audioElement = document.getElementById("live_audio");
var audioVolume = audioElement.volume;
    audioVolume = 0.8; // from 0 to 1
audioElement.autoplay = true;

window.URL = window.URL || window.webkitURL;

navigator.getUserMedia = (navigator.getUserMedia
                       || navigator.webkitGetUserMedia
                       || navigator.mozGetUserMedia
                       || navigator.msGetUserMedia); // define which getUserMedia

var audioContext = new (window.AudioContext || window.webkitAudioContext)(); // new context with compatibility

var audioDestination = audioContext.createMediaStreamDestination();
// audioDestination = $.getJSON('/thumb', function( data ) { return data;}); // get audioContext item from server

var audioGainNode = audioContext.createGain();
    audioGainNode.connect(audioDestination);

// var audioStream;
// audioStream.connect(audioDestination); // connect audio stream to destination

var source; // for createMediaStreamSource
var audioStream; // from createObjectURL method
var audioStreamTrack; // streaming track
var audioStreamURL; // trackURL
var noStreamFlag = true;

// .connect() is on    sourceNode,    audioGainNode,    audioDestination

// source.connect(gainNode)
// gainNode.connect(destination)

var beDestinationMachine = function() {
  $.getJSON('/destination', function( data ) {
    isDestinationMachine = true;
  });
  audioGainNode.connect(audioDestination);
}