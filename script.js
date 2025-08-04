const container = document.querySelector('.particle-container');

function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    particle.style.left = Math.random() * 100 + 'vw';
    const size = Math.random() * 4 + 2;
    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.setProperty('--drift', (Math.random() * 50 - 25) + 'px');
    const duration = Math.random() * 3 + 2;
    particle.style.animationDuration = duration + 's';
    container.appendChild(particle);
    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

setInterval(createParticle, 200);

const audio = document.getElementById('audioPlayer');
const lyrics = document.querySelectorAll('.lyrics-container p');

let currentActive = null;

audio.addEventListener('timeupdate', () => {
    const currentTime = audio.currentTime;
    lyrics.forEach((line, index) => {
        const lineTime = parseFloat(line.getAttribute('data-time'));
        const nextLineTime = index + 1 < lyrics.length ? parseFloat(lyrics[index + 1].getAttribute('data-time')) : Infinity;
        if (currentTime >= lineTime && currentTime < nextLineTime) {
            if (currentActive !== line) {
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                line.classList.add('active');
                line.classList.remove('fade-out');
                currentActive = line;
            }
            if (nextLineTime - currentTime <= 0.5) {
                line.classList.add('fade-out');
            } else {
                line.classList.remove('fade-out');
            }
        }
    });
});
