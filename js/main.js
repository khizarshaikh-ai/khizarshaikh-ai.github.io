const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = innerWidth / 2, mouseY = innerHeight / 2, ringX = mouseX, ringY = mouseY;

if (!prefersReducedMotion && matchMedia('(pointer:fine)').matches) {
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = `${mouseX}px`; cursorDot.style.top = `${mouseY}px`;
  });
  function animateCursor() {
    ringX += (mouseX - ringX) * 0.16;
    ringY += (mouseY - ringY) * 0.16;
    cursorRing.style.left = `${ringX}px`; cursorRing.style.top = `${ringY}px`;
    requestAnimationFrame(animateCursor);
  }
  animateCursor();
  document.querySelectorAll('a,button,input,textarea,.tilt-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('hover'));
  });
}

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Subtle 3D tilt on cards
if (!prefersReducedMotion && matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(900px) rotateY(${x * 7}deg) rotateX(${-y * 7}deg) translateY(-3px)`;
    });
    card.addEventListener('mouseleave', () => card.style.transform = '');
  });
}

// Magnetic buttons
if (!prefersReducedMotion && matchMedia('(pointer:fine)').matches) {
  document.querySelectorAll('.magnetic').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width / 2)) * 0.12;
      const dy = (e.clientY - (r.top + r.height / 2)) * 0.12;
      el.style.transform = `translate(${dx}px,${dy}px)`;
    });
    el.addEventListener('mouseleave', () => el.style.transform = '');
  });
}

// Active navigation and reading progress
const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-link')];
function updateScrollUI() {
  const max = document.documentElement.scrollHeight - innerHeight;
  document.querySelector('.progress-bar').style.width = `${max > 0 ? scrollY / max * 100 : 0}%`;
  let current = 'home';
  sections.forEach(section => { if (scrollY >= section.offsetTop - 180) current = section.id; });
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}`));
}
window.addEventListener('scroll', updateScrollUI, { passive: true });
updateScrollUI();

// Mobile navigation
const nav = document.getElementById('nav');
document.getElementById('menuToggle').addEventListener('click', () => nav.classList.toggle('open'));
navLinks.forEach(link => link.addEventListener('click', () => nav.classList.remove('open')));

// Theme toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const dark = document.body.classList.contains('dark');
  themeIcon.textContent = dark ? '☀' : '☾';
  localStorage.setItem('khizar-theme', dark ? 'dark' : 'light');
});
if (localStorage.getItem('khizar-theme') === 'dark') {
  document.body.classList.add('dark'); themeIcon.textContent = '☀';
}

document.getElementById('year').textContent = new Date().getFullYear();
