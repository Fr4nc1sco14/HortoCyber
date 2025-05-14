// script.js

// MOBILE MENU TOGGLE
const btnMobile = document.getElementById('btn-mobile');
const navLinks = document.getElementById('menu-list');

if (btnMobile && navLinks) {
  btnMobile.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// CAROUSEL & TESTIMONIALS SETUP
const testimonials = [
  {
    text: "Lugar muito aconchegante, ao ar livre e bem descontraído. Música boa e ótimo atendimento!",
    author: "Kássia Guimarães",
    title: "Cliente do Restaurante",
    link: "https://g.co/kgs/v6Kjdrp"
  },
  {
    text: "Funcionário muito simpático, bebi Sangria de Maracujá que era realmente boa e comi Ovos Roto mais Batatas Fritas com cheddar e bacon, ambos deliciosos! O espaço é incrível e muito acolhedor.",
    author: "Helena Couto",
    title: "Cliente do Restaurante",
    link: "https://g.co/kgs/D6YXHjC"
  },
  {
    text: "Muito bom ambiente. Música agradável e funcionários simpáticos. Boas bebidas e bons crepes.",
    author: "André Fonseca",
    title: "Cliente do Restaurante",
    link: "https://g.co/kgs/AS5zWC8"
  }
];

let currentIndex = 0;
let autoSlideInterval;

// Elementos do testimonial/carousel
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('.carousel-indicators');
const contentEl    = document.querySelector('.testimonial-content');
const textEl       = document.getElementById('testimonial-text');
const authorEl     = document.getElementById('testimonial-author');
const titleEl      = document.getElementById('testimonial-title');
const prevBtn      = document.getElementById('prev');
const nextBtn      = document.getElementById('next');

// Cria indicadores (dots) dinamicamente, se existir container
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

// Funções de testimonial/carousel
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
  // parte visual do carousel (slides e dots), se existirem
  if (slides.length) {
    slides[currentIndex]?.classList.remove('active');
    dots[currentIndex]?.classList.remove('active');
  }

  currentIndex = index;

  if (slides.length) {
    slides[currentIndex].classList.add('active');
    dots[currentIndex]?.classList.add('active');
  }

  // atualiza testimonial
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

// Botões prev/next
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

  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });
  carousel.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const diff = startX - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
      isDragging = false;
    }
  });
  carousel.addEventListener('touchend', () => isDragging = false);

  carousel.addEventListener('mousedown', e => {
    startX = e.clientX;
    isDragging = true;
  });
  carousel.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? goNext() : goPrev();
      isDragging = false;
    }
  });
  ['mouseup', 'mouseleave'].forEach(evt =>
    carousel.addEventListener(evt, () => isDragging = false)
  );
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
    alert('Visite-nos em breve no Horto do Cyber Café!');
  });
}
