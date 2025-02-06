document.addEventListener('DOMContentLoaded', function () {
  let navbar = document.getElementById('navbar');

  if (!navbar) {
    console.error('Елемент #navbar не знайдено!');
    return;
  }

  window.addEventListener('scroll', function () {
    let scrollTop = window.scrollY;
    let opacity = Math.min(scrollTop / 300, 0.8); // Обмежуємо прозорість до 0.8

    navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
  });
});
