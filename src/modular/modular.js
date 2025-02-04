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

const buttons = document.querySelectorAll('.btn');
const indicator = document.querySelector('.indicator');
const buttonContainer = document.querySelector('.button-container');

buttons.forEach(button => {
  button.addEventListener('click', function () {
    // Зняти клас active з усіх кнопок
    buttons.forEach(btn => btn.classList.remove('active'));

    // Додати клас active до натиснутої кнопки
    button.classList.add('active');

    // Отримуємо позицію кнопки
    const index = button.getAttribute('data-index');
    const buttonWidth = button.offsetWidth;
    const containerOffset = button.offsetLeft;

    // Позиціонування indicator на відповідну кнопку
    indicator.style.transform = `translateX(${containerOffset}px)`;
  });
});
