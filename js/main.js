// MOBILE MENU TOGGLE
const btnMobile = document.getElementById('btn-mobile');
const navLinks = document.getElementById('menu-list'); // usar o ID

if (btnMobile && navLinks) {
  btnMobile.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

// CAROUSEL SETUP
const carousel = document.querySelector('.carousel');
const slides = document.querySelectorAll('.slide');
const indicatorsContainer = document.querySelector('.carousel-indicators');
let dots = [];
let currentSlide = 0;
let startX = 0;
let isDragging = false;

// Cria indicadores (dots) dinamicamente
if (indicatorsContainer && slides.length > 0) {
  slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(i));
    indicatorsContainer.appendChild(dot);
  });
  // Seleciona todos os dots após criação
  dots = indicatorsContainer.querySelectorAll('.dot');
}

function goToSlide(index) {
  if (slides.length === 0) return;
  // remove estado anterior
  slides[currentSlide].classList.remove('active');
  if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

  // atualiza índice
  currentSlide = index;

  // adiciona estado ativo
  slides[currentSlide].classList.add('active');
  if (dots[currentSlide]) dots[currentSlide].classList.add('active');
}

// autoplay a cada 5s
if (slides.length > 1) {
  setInterval(() => {
    const nextIndex = (currentSlide + 1) % slides.length;
    goToSlide(nextIndex);
  }, 5000);
}

// Funções de navegação no carousel
function nextSlide() {
  goToSlide((currentSlide + 1) % slides.length);
}
function prevSlide() {
  goToSlide((currentSlide - 1 + slides.length) % slides.length);
}

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

// EVENTO PARA O BOTÃO "Descubra Mais"
const btnDescobrir = document.getElementById('btnDescobrir');
if (btnDescobrir) {
  btnDescobrir.addEventListener('click', e => {
    e.preventDefault();
    alert('Visite-nos em breve no Horto do Cyber Café!');
  });
}
