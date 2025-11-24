const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;
let magicTimeout;

// BOTÃO FAIRE VOLER LES PAGES
const scatterButton = document.getElementById('scatterPages');

scatterButton.addEventListener('click', () => {
    if (!isOpen) return;

    const pages = document.querySelectorAll('.page');

    // Anima as páginas com pequenos delays
    pages.forEach((page, index) => {
        setTimeout(() => page.classList.add('scatter'), index * 150);
    });

    // Cria partículas mágicas saindo do centro do livro
    for (let i = 0; i < 70; i++) {
        setTimeout(createParticle, i * 20);
    }

    // Remove a classe scatter após a animação
    setTimeout(() => {
        pages.forEach(page => page.classList.remove('scatter'));
    }, 2600);
});

// FUNÇÕES PRINCIPAIS
function playSound(audioId) {
    const audio = document.getElementById(audioId);
    if (audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log("Erreur de lecture audio : " + e));
    }
}

function toggleTheme() {
    body.classList.toggle('dark-mode');
    body.style.transition = 'background 1.5s ease, color 1.5s ease';
    setTimeout(() => { body.style.transition = ''; }, 1600);
}

function toggleBook() {
    isOpen = !isOpen;
    if (isOpen) {
        bookContainer.classList.add('open');
        const pageTurnDelay = 200;
        setTimeout(() => playSound('soundPage'), 300);
        setTimeout(() => playSound('soundPage'), 300 + pageTurnDelay);
        setTimeout(() => playSound('soundPage'), 300 + 2 * pageTurnDelay);
        magicTimeout = setTimeout(startMagic, 2200);
    } else {
        bookContainer.classList.remove('open');
        clearTimeout(magicTimeout);
        stopMagic();
    }
}

// CRIAÇÃO DE PARTÍCULAS DO CENTRO DO LIVRO
function createParticle() {
    if (!isOpen) return;

    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 14 + 5; 
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    const colors = body.classList.contains('dark-mode')
        ? ['#ffffff', '#cfcfcf', '#a0a0ff', '#ffd700', '#e0e0ff']
        : ['#ffd700', '#ff9a9e', '#a18cd1', '#ffffff', '#ffb6c1'];

    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size * 3}px ${color}`;

    const rect = bookContainer.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2 + (Math.random() * 120 - 60);

    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;

    const tx = (Math.random() - 0.5) * 120;
    const txEnd = (Math.random() - 0.5) * 700;

    particle.style.setProperty('--tx', `${tx}px`);
    particle.style.setProperty('--tx-end', `${txEnd}px`);

    const duration = Math.random() * 2 + 2;
    particle.style.animation = `floatUp ${duration}s ease-out forwards`;

    document.body.appendChild(particle);

    setTimeout(() => particle.remove(), duration * 1000);
}

// INICIA MAGIA COM EXPLOSÃO INTENSA DE PARTÍCULAS
function startMagic() {
    stopMagic();

    for (let i = 0; i < 100; i++) {
        setTimeout(createParticle, i * 15);
    }

    particleInterval = setInterval(createParticle, 15);
}

function stopMagic() {
    if (particleInterval) clearInterval(particleInterval);
}
