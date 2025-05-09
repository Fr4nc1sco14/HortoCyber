// MOBILE MENU TOGGLE
const btnMobile = document.getElementById('btn-mobile');
const navLinks = document.querySelector('.nav-links');

if (btnMobile && navLinks) {
  btnMobile.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// CAROUSEL
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicatorsContainer = document.querySelector('.carousel-indicators');

let currentSlide = 0;
let startX = 0;
let isDragging = false;

// Cria indicadores (dots)
if (indicatorsContainer) {
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
  });
}

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
  if (!slides.length) return;
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

  currentSlide = index;

  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

// Botões prev/next
if (prevBtn) {
  prevBtn.addEventListener('click', () => {
    let nextIndex = currentSlide - 1;
    if (nextIndex < 0) nextIndex = slides.length - 1;
    goToSlide(nextIndex);
  });
}

if (nextBtn) {
  nextBtn.addEventListener('click', () => {
    let nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  });
}

// Autoplay a cada 5s
setInterval(() => {
  let nextIndex = (currentSlide + 1) % slides.length;
  goToSlide(nextIndex);
}, 5000);

// Swipe / drag support
if (carousel) {
  // Touch events
  carousel.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isDragging = true;
  });

  carousel.addEventListener('touchmove', e => {
    if (!isDragging) return;
    const diff = startX - e.touches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      isDragging = false;
    }
  });

  carousel.addEventListener('touchend', () => {
    isDragging = false;
  });

  // Mouse drag events
  carousel.addEventListener('mousedown', e => {
    startX = e.clientX;
    isDragging = true;
  });

  carousel.addEventListener('mousemove', e => {
    if (!isDragging) return;
    const diff = startX - e.clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? nextSlide() : prevSlide();
      isDragging = false;
    }
  });

  ['mouseup', 'mouseleave'].forEach(evt =>
    carousel.addEventListener(evt, () => {
      isDragging = false;
    })
  );
}

function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}

function prevSlide() {
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

// Inicializa mostrando a primeira slide
goToSlide(currentSlide);

// SCROLL ANIMATIONS
const animateElements = document.querySelectorAll('.animate-on-scroll');
const SCROLL_THRESHOLD = 0.8; // 80% da altura da viewport

function checkScroll() {
  animateElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * SCROLL_THRESHOLD) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkScroll);
checkScroll(); // ao carregar a página
