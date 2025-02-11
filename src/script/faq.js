const buttons = document.querySelectorAll('.btn');
const indicator = document.querySelector('.indicator');
const buttonContainer = document.querySelector('.button-container');
const all_content = document.querySelectorAll('.questions');
// Збереження стану вибраного табу в LocalStorage
const savedTabIndex = localStorage.getItem('activeTabIndex') || 0; // Якщо немає збереженого індексу, вибираємо перший таб
const firstButton = buttons[savedTabIndex];
console.log(savedTabIndex);
buttons[savedTabIndex].classList.add('active');
indicator.style.width = `${firstButton.offsetWidth}px`;
indicator.style.transform = `translateX(${firstButton.parentElement.offsetLeft}px)`;

buttons.forEach((button, index) => {
  button.classList.remove('active');
  all_content[index]?.classList.remove('active'); // Видаляємо active у всіх options-grid
});
buttons[savedTabIndex].classList.add('active');
all_content[savedTabIndex]?.classList.add('active');

// Позиціонуємо indicator
indicator.style.width = `${firstButton.offsetWidth}px`;

indicator.style.transform = `translateX(${firstButton.offsetLeft}px)`;

buttons.forEach((button, index) => {
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

    all_content.forEach(content => {
      content.classList.remove('active');
    });
    all_content[index].classList.add('active');

    // Зберігаємо індекс вибраної вкладки
    localStorage.setItem('activeTabIndex', index);
  });
});

document.querySelectorAll('.details-container summary').forEach(summary => {
  summary.addEventListener('click', function () {
    const parent = summary.parentElement;
    const content = parent.querySelector('p');

    if (parent.hasAttribute('open')) {
      // Закриття: фіксуємо поточну висоту перед анімацією
      content.style.height = `${content.scrollHeight}px`;
      content.style.paddingTop = '15px';
      content.style.paddingBottom = '15px';

      setTimeout(() => {
        content.style.height = '0';
        content.style.opacity = '0';
        content.style.paddingTop = '0';
        content.style.paddingBottom = '0';
      }, 10);

      setTimeout(() => parent.removeAttribute('open'), 300); // Закриваємо після анімації
    } else {
      // Відкриття
      parent.setAttribute('open', 'true');
      content.style.height = '0';
      content.style.paddingTop = '0';
      content.style.paddingBottom = '0';

      setTimeout(() => {
        content.style.height = `${content.scrollHeight + 30}px`;
        content.style.opacity = '1';
        content.style.paddingTop = '15px';
        content.style.paddingBottom = '15px';
      }, 10);
    }
  });
});
