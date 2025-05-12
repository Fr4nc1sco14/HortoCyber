// Navbar mobile toggle
const btnMobile = document.getElementById('btn-mobile');
const menuList = document.getElementById('menu-list');
btnMobile.addEventListener('click', () => {
  menuList.classList.toggle('active');
});

// Tabs functionality
const tabs = document.querySelectorAll('.menu-tab');
const sections = document.querySelectorAll('.menu-section');
tabs.forEach(tab => tab.addEventListener('click', () => {
  tabs.forEach(t => t.classList.remove('active'));
  tab.classList.add('active');
  const target = tab.dataset.target;
  sections.forEach(sec => {
    sec.classList.toggle('active', sec.id === target);
  });
}));

// Scroll to section if anchored from another page
window.addEventListener('load', () => {
  const hash = window.location.hash.substring(1);
  if (hash) {
    document.querySelector(`.menu-tab[data-target="${hash}"]`)?.click();
  }
});