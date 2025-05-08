

// MOBILE MENU TOGGLE
const btnMobile = document.getElementById('btn-mobile');
const navLinks = document.querySelector('.nav-links');
const btnReserve = document.querySelector('.btn-primary');

btnMobile.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  btnReserve.classList.toggle('active');
});

// CAROUSEL
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const indicators = document.querySelector('.carousel-indicators');
let currentSlide = 0;

slides.forEach((_, index) => {
  const dot = document.createElement('span');
  dot.classList.add('dot');
  if (index === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goToSlide(index));
  indicators.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => {
  let newSlide = currentSlide - 1;
  if (newSlide < 0) newSlide = slides.length - 1;
  goToSlide(newSlide);
});

nextBtn.addEventListener('click', () => {
  let newSlide = (currentSlide + 1) % slides.length;
  goToSlide(newSlide);
});

setInterval(() => {
  let newSlide = (currentSlide + 1) % slides.length;
  goToSlide(newSlide);
}, 5000);

// SCROLL ANIMATIONS
const animateElements = document.querySelectorAll('.animate-on-scroll');

function checkScroll() {
  animateElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top <= window.innerHeight * 0.8) {
      el.classList.add('visible');
    }
  });
}

window.addEventListener('scroll', checkScroll);
checkScroll();