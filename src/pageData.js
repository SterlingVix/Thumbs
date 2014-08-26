var windowContext = this;

var $micButton = $('.mic-button');
$micButtonWidth = $micButton.width();
$micButton.height = $micButtonWidth;

var $mainScreen = $('.main-screen');
$mainScreen.width = $('html').clientWidth || 320;
$mainScreen.height = $('html').clientHeight || 480;

var $micIcon = $('.mic-icon');
$micIcon.height($micButtonWidth * .8);
$micIcon.width($micButtonWidth * .8);

var audioElement = document.getElementById("live_audio");    
var audioVolume = audioElement.volume = 0.8; // from 0 to 1
audioElement.autoplay = true;

//   audioElement.src = window.webkitURL.createObjectURL(stream);
//   audioElement.src = (window.URL && window.URL.createObjectURL(stream)) || stream); // need a stream object here...

window.URL = window.URL || window.webkitURL;

navigator.getUserMedia = (navigator.getUserMedia
                       || navigator.webkitGetUserMedia
                       || navigator.mozGetUserMedia
                       || navigator.msGetUserMedia); // define which getUserMedia

var audioContext = new (window.AudioContext || window.webkitAudioContext)(); // new context with compatibility
var audioDestination = audioContext.createMediaStreamDestination();
var audioGainNode = audioContext.createGain();
    audioGainNode.gain=1;

audioGainNode.connect(audioDestination); // connect gain node to destination

var audioStream; // audio stream
var source; // for createMediaStreamSource
var audioStreamTrack; // streaming track