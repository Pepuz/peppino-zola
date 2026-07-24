document.documentElement.classList.add('js');

const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('nav');
menuBtn.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open');
  menuBtn.setAttribute('aria-expanded', 'false');
}));

const lb = document.getElementById('lb');
const lbImg = lb.querySelector('img');
const lbCap = lb.querySelector('.lb-cap');
const lbClose = lb.querySelector('.lb-close');
let lastFocus = null;

function openLightbox(fig) {
  const img = fig.querySelector('img');
  lbImg.src = img.currentSrc || img.src;
  lbImg.alt = img.alt;
  lbCap.textContent = fig.querySelector('figcaption')?.textContent || '';
  lb.classList.add('on');
  lastFocus = document.activeElement;
  lbClose.focus();
}
function closeLightbox() {
  lb.classList.remove('on');
  lbImg.removeAttribute('src');
  if (lastFocus) lastFocus.focus();
}
document.querySelectorAll('figure.g').forEach(fig => {
  fig.addEventListener('click', () => openLightbox(fig));
  fig.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(fig); }
  });
});
lb.addEventListener('click', e => { if (e.target !== lbCap) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (lb.classList.contains('on')) closeLightbox();
  else if (nav.classList.contains('open')) {
    nav.classList.remove('open');
    menuBtn.setAttribute('aria-expanded', 'false');
  }
});

const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(s => io.observe(s));
