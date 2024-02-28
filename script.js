let isBlowing = false;
let audioContext;
let analyser;
let microphone;

function initializeMicrophone() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            audioContext = new AudioContext();
            analyser = audioContext.createAnalyser();
            microphone = audioContext.createMediaStreamSource(stream);

            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            microphone.connect(analyser);

            setInterval(function() {
                analyser.getByteFrequencyData(dataArray);
                const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
                if (average > 1000) {
                    if (!isBlowing) {
                        isBlowing = true;
                        toggleFlame(); // Turn off the flame when blowing into the microphone
                    }
                } else {
                    isBlowing = false;
                }
            }, 100);
        })
        .catch(function(err) {
            console.error('Error accessing microphone:', err);
        });
}

function toggleFlame() {
    const flame = document.getElementById('toggleFlame');
    flame.classList.toggle('off');
}

document.getElementById('toggleFlame').addEventListener('click', function() {
    this.classList.toggle('off');
    document.getElementById('texttoggleFlame').classList.toggle('on');
});

// Initialize microphone when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeMicrophone();
});