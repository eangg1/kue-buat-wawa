document.getElementById('toggleFlame').addEventListener('click', function() {
    this.classList.toggle('off');
    document.getElementById('texttoggleFlame').classList.toggle('on');
});

let isFlameOn = true;
let lastAverage = 0;

document.getElementById('toggleFlame').addEventListener('click', function() {
    toggleFlame();
});

function toggleFlame() {
    isFlameOn = !isFlameOn;
    document.getElementById('toggleFlame').classList.toggle('off', !isFlameOn);
    document.getElementById('texttoggleFlame').classList.toggle('on', !isFlameOn);
}

// Use Web Audio API to detect sound
const audioContext = new AudioContext();
const analyser = audioContext.createAnalyser();
navigator.mediaDevices.getUserMedia({ audio: true })
    .then(stream => {
        const source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        analyser.fftSize = 256;
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        function detectSound() {
            analyser.getByteFrequencyData(dataArray);
            const average = dataArray.reduce((acc, val) => acc + val, 0) / bufferLength;
            const smoothedAverage = (average + lastAverage) / 2; // Smooth the average with the last value
            lastAverage = average;
            if (smoothedAverage > 1024) { // Adjust this threshold as needed
                toggleFlame();
            }
            requestAnimationFrame(detectSound);
        }
        detectSound();
    })
    .catch(err => {
        console.error('Error accessing microphone:', err);
    });