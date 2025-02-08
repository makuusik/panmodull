// Отримуємо кнопки
const modularButton = document.getElementById('modularButton');
const frameButton = document.getElementById('frameButton');

// Отримуємо всі елементи, які фільтруються
const modularElements = document.querySelectorAll('.modular-filter');
const frameElements = document.querySelectorAll('.frame-filter');

// Додаємо слухачів подій для кнопок
modularButton.addEventListener('click', function () {
  // Перемикаємо клас "disabled" кнопки
  modularButton.classList.toggle('disabled');

  // Перемикаємо видимість елементів класу "modular-filter"
  if (modularButton.classList.contains('disabled')) {
    modularElements.forEach(el => (el.style.display = 'none')); // Приховуємо елементи
  } else {
    modularElements.forEach(el => (el.style.display = 'flex')); // Відображаємо елементи
  }
});

frameButton.addEventListener('click', function () {
  // Перемикаємо клас "disabled" кнопки
  frameButton.classList.toggle('disabled');

  // Перемикаємо видимість елементів класу "frame-filter"
  if (frameButton.classList.contains('disabled')) {
    frameElements.forEach(el => (el.style.display = 'none')); // Приховуємо елементи
  } else {
    frameElements.forEach(el => (el.style.display = 'flex')); // Відображаємо елементи
  }
});
