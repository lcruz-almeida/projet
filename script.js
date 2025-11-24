const bookContainer = document.getElementById('bookContainer');
const body = document.body;
let isOpen = false;
let particleInterval;
let magicTimeout;

const colors = ['#ffd700', '#ff9a9e', '#a18cd1', '#ffffff', '#84fab0'];

function toggleBook() {
    isOpen = !isOpen;
    if (isOpen) {
        bookContainer.classList.add('open');
        magicTimeout = setTimeout(startMagic, 500);
    } else {
        bookContainer.classList.remove('open');
        clearTimeout(magicTimeout);
        stopMagic();
    }
}

function createParticle() {
    if (!isOpen) return;
    const particle = document.createElement('div');
    particle.classList.add('particle');
    const size = Math.random() * 14 + 5;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    const color = colors[Math.floor(Math.random() * colors.length)];
    particle.style.background = color;
    particle.style.boxShadow = `0 0 ${size*3}px ${color}`;
    const rect = bookContainer.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    const tx = (Math.random() - 0.5) * 400;
    const ty = (Math.random() - 0.5) * 800;
    const duration = 2 + Math.random() * 2;
    particle.style.transition = `transform ${duration}s ease-out, opacity ${duration}s ease-out`;
    requestAnimationFrame(() => {
        particle.style.transform = `translate(${tx}px, ${ty}px) rotate(${Math.random()*720}deg)`;
        particle.style.opacity = 0;
    });
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), duration*1000);
}

function startMagic() {
    stopMagic();
    for(let i=0;i<50;i++) setTimeout(createParticle, i*30);
    particleInterval = setInterval(createParticle, 25);
}

function stopMagic() {
    if(particleInterval) clearInterval(particleInterval);
}

function flyPages() {
    const pages = document.querySelectorAll('.page.inner-page');
    pages.forEach((page, i) => {
        setTimeout(() => {
            const clone = page.cloneNode(true);
            const rect = page.getBoundingClientRect();
            clone.style.position = 'absolute';
            clone.style.left = `${rect.left}px`;
            clone.style.top = `${rect.top}px`;
            clone.style.width = `${page.offsetWidth}px`;
            clone.style.height = `${page.offsetHeight}px`;
            clone.style.zIndex = 1000;
            document.body.appendChild(clone);
            const endX = (Math.random() - 0.5) * window.innerWidth * 2;
            const endY = -Math.random() * window.innerHeight * 1.5 - window.innerHeight;
            const rotate = (Math.random() - 0.5) * 1080;
            const duration = 3 + Math.random()*2;
            clone.style.transition = `transform ${duration}s ease-in-out, opacity ${duration}s ease-in-out`;
            requestAnimationFrame(() => {
                clone.style.transform = `translate(${endX}px, ${endY}px) rotate(${rotate}deg)`;
                clone.style.opacity = 0;
            });
            setTimeout(() => clone.remove(), duration*1000);
        }, i*100);
    });
}
