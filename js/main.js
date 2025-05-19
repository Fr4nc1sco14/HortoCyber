// MOBILE MENU TOGGLE
const btnMobile = document.getElementById('btn-mobile');
const navLinks = document.getElementById('menu-list');

if (btnMobile && navLinks) {
  btnMobile.addEventListener('click', () => {
    const isActive = navLinks.classList.toggle('active');
    // troca o ícone entre "☰" e "✕"
    btnMobile.textContent = isActive ? '✕' : '☰';
    btnMobile.setAttribute('aria-label', isActive ? 'Fechar menu' : 'Abrir menu');
  });
}

// CAROUSEL & TESTIMONIALS SETUP
const testimonials = [
  {
    text: "Lugar muito aconchegante, ao ar livre e bem descontraído. Música boa e ótimo atendimento!",
    author: "Kássia Guimarães",
    title: "Cliente do Restaurante",
    link: "https://g.co/kgs/v6Kjdrp"
  },
  {
    text: "Funcionário muito simpático, bebi Sangria de Maracujá que era realmente boa e comi Ovos Roto mais Batatas Fritas com cheddar e bacon, ambos deliciosos! O espaço é incrível e muito acolhedor.",
    author: "Helena Couto",
    title: "Cliente do Restaurante",
    link: "https://g.co/kgs/D6YXHjC"
  },
  {
    text: "Muito bom ambiente. Música agradável e funcionários simpáticos. Boas bebidas e bons crepes.",
    author: "André Fonseca",
    title: "Cliente do Restaurante",
    link: "https://g.co/kgs/AS5zWC8"
  }
];

let currentIndex = 0;
let autoSlideInterval;

const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const contentEl    = document.querySelector('.testimonial-content');
const textEl       = document.getElementById('testimonial-text');
const authorEl     = document.getElementById('testimonial-author');
const titleEl      = document.getElementById('testimonial-title');
const prevBtn      = document.getElementById('prev');
const nextBtn      = document.getElementById('next');

// Cria indicadores (dots) dinamicamente
let dots = [];
if (indicatorsContainer && slides.length > 0) {
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
  });
  dots = indicatorsContainer.querySelectorAll('.dot');
}

function showTestimonial(index) {
  const t = testimonials[index];
  textEl.textContent = t.text;
  authorEl.innerHTML = `<a href="${t.link}" target="_blank" rel="noopener">${t.author}</a>`;
  titleEl.textContent = t.title;
}

function changeTestimonial(newIndex) {
  contentEl.classList.add('fading');
  setTimeout(() => {
    showTestimonial(newIndex);
    contentEl.classList.remove('fading');
  }, 400);
}

function goToSlide(index) {
  if (slides.length) {
    slides[currentIndex].classList.remove('active');
    dots[currentIndex]?.classList.remove('active');
  }

  currentIndex = index;

  slides[currentIndex].classList.add('active');
  dots[currentIndex]?.classList.add('active');

  changeTestimonial(currentIndex);
}

function goNext() {
  goToSlide((currentIndex + 1) % testimonials.length);
}

function goPrev() {
  goToSlide((currentIndex - 1 + testimonials.length) % testimonials.length);
}

function startAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(goNext, 5000);
}

prevBtn?.addEventListener('click', () => {
  goPrev();
  startAutoSlide();
});
nextBtn?.addEventListener('click', () => {
  goNext();
  startAutoSlide();
});

// Swipe / drag support no carousel
if (carousel) {
  let startX = 0;
  let isDragging = false;

  const onStart = e => {
    startX = e.touches ? e.touches[0].clientX : e.clientX;
    isDragging = true;
  };
  const onMove = e => {
    if (!isDragging) return;
    const currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const diff = startX - currentX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
      isDragging = false;
    }
  };
  const onEnd = () => { isDragging = false; };

  ['touchstart', 'mousedown'].forEach(evt => carousel.addEventListener(evt, onStart));
  ['touchmove', 'mousemove'].forEach(evt => carousel.addEventListener(evt, onMove));
  ['touchend', 'mouseup', 'mouseleave'].forEach(evt => carousel.addEventListener(evt, onEnd));
}

// Inicialização
showTestimonial(currentIndex);
startAutoSlide();

// SCROLL ANIMATIONS
const animateElements = document.querySelectorAll('.animate-on-scroll');
const SCROLL_THRESHOLD = 0.8;
function checkScroll() {
  animateElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * SCROLL_THRESHOLD) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', checkScroll);
checkScroll();

// BOTÃO “Descubra Mais”
const btnDescobrir = document.getElementById('btnDescobrir');
if (btnDescobrir) {
  btnDescobrir.addEventListener('click', e => {
    e.preventDefault();
    window.location.href = '#menu';
  });
}
