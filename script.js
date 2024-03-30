let isBlowing = false;
    let isFlameOff = false;

    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            const audioContext = new AudioContext();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);

            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);

            microphone.connect(analyser);

            setInterval(function() {
                analyser.getByteTimeDomainData(dataArray);
                const sum = dataArray.reduce((acc, val) => acc + val, 0);
                const average = sum / bufferLength;
                if (average > 135) { // Adjusted threshold to 180 for higher effort blow
                    if (!isBlowing && !isFlameOff) {
                        isBlowing = true;
                        toggleFlame(); // Turn off the flame when blowing into the microphone
                        toggleFlame2(); // Toggle flame2 text visibility
                        isFlameOff = true;
                    }
                } else {
                    isBlowing = false;
                }
            }, 100);
        })
        .catch(function(err) {
            console.error('Error accessing microphone:', err);
        });

    function toggleFlame() {
        const flame = document.getElementById('toggleFlame');
        flame.classList.toggle('off');
    }

    function toggleFlame2() {
        const flame2 = document.getElementById('texttoggleFlame');
        flame2.classList.toggle('on');
    }

    document.getElementById('toggleFlame').addEventListener('click', function() {
        this.classList.toggle('off');
        document.getElementById('texttoggleFlame').classList.toggle('on');
        isFlameOff = !isFlameOff;
    });

const audio = document.querySelector('audio');
const body = document.body;
  
    
audio.addEventListener('play', () => {
    body.classList.add('play-music');
});
  
audio.addEventListener('pause', () => {
    body.classList.remove('play-music');
});

document.addEventListener("DOMContentLoaded", function() {
    Swal.fire({
        title: 'cara tiup lilin',
        text: 'tiup lilinnya lewat mic, tiup di mic sekenceng mungkin sampe lilinnya mati',
        imageUrl: 'wawa.jpg', // Replace 'url_to_marva_photo.jpg' with the actual URL to Marva's photo
        imageWidth: 200, // Specify the width of the image
        imageHeight: 200, // Specify the height of the image
        imageAlt: 'Marva', // Alt text for the image
        confirmButtonText: 'ayo liat kuenya'
    });
});