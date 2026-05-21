const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

const fadeEls = document.querySelectorAll('.fade-up');

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

fadeEls.forEach(el => observer.observe(el));

const strip = document.querySelector('.gallery-strip');
let isDown = false;
let startX;
let scrollLeft;

strip.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - strip.offsetLeft;
    scrollLeft = strip.scrollLeft;
});

strip.addEventListener('mouseleave', () => {
    isDown = false;
});

strip.addEventListener('mouseup', () => {
    isDown = false;
});

strip.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - strip.offsetLeft;
    const walk = (x - startX) * 1.5;
    strip.scrollLeft = scrollLeft - walk;
});

strip.addEventListener('touchstart', e => {
    startX = e.touches[0].pageX - strip.offsetLeft;
    scrollLeft = strip.scrollLeft;
}, { passive: true });

strip.addEventListener('touchmove', e => {
    const x = e.touches[0].pageX - strip.offsetLeft;
    const walk = (x - startX) * 1.5;
    strip.scrollLeft = scrollLeft - walk;
}, { passive: true });
