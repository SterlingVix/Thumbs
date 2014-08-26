var windowContext = this;

var $micButton = $('.mic-button');
$micButtonWidth = $micButton.width();
$micButton.height = $micButtonWidth;

var $mainScreen = $('.main-screen');
$mainScreen.width = $('html').clientWidth;
$mainScreen.height = $('html').clientHeight;

var $micIcon = $('.mic-icon');
$micIcon.height($micButtonWidth * .8);
$micIcon.width($micButtonWidth * .8);

var audioElement = document.getElementById("live_audio");    
audioElement.autoplay = true;
//   audioElement.play();
//   audioElement.src = window.webkitURL.createObjectURL(stream);
//   audioElement.src = (window.URL && window.URL.createObjectURL(stream)) || stream); // need a stream object here...

audioElement.onloadedmetadata = function(e) {
  audioElement.play();
  audioElement.muted = 'false';
}; // handle data loading...???

window.URL = window.URL || window.webkitURL;

navigator.getUserMedia = (navigator.getUserMedia
                       || navigator.webkitGetUserMedia
                       || navigator.mozGetUserMedia
                       || navigator.msGetUserMedia); // define which getUserMedia
                       
var audioContext = new (window.AudioContext || window.webkitAudioContext)(); // new context with compatibility

var audioStream;
var source; // for createMediaStreamSource
var dest = audioContext.createMediaStreamDestination();