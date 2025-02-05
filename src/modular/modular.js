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

const firstButton = buttons[0];
buttons[0].classList.add('active');
indicator.style.width = `${firstButton.offsetWidth}px`;
indicator.style.transform = `translateX(${firstButton.parentElement.offsetLeft}px)`;

buttons.forEach(button => {
  button.addEventListener('click', function () {
    // Зняти клас active з усіх кнопок
    buttons.forEach(btn => btn.classList.remove('active'));

    // Додати клас active до натиснутої кнопки
    button.classList.add('active');

    // Отримуємо ширину кнопки та її позицію
    const buttonWidth = button.offsetWidth;
    const buttonOffset = button.parentElement.offsetLeft; // Враховуємо відступ <li>

    // Позиціонуємо indicator
    indicator.style.transform = `translateX(${buttonOffset}px)`;
    indicator.style.width = `${buttonWidth}px`; // Робимо ширину рівною кнопці
  });
});
