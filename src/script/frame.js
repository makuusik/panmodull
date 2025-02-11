const buttons = document.querySelectorAll('.box');
const buttonContainer = document.querySelector('.button-container');
const all_content = document.querySelectorAll('.options-grid');

// Збереження стану вибраного табу в LocalStorage
// const savedTabIndex = localStorage.getItem('activeTabIndex') || 0; // Якщо немає збереженого індексу, вибираємо перший таб
const firstButton = buttons[savedTabIndex];
// buttons[savedTabIndex].classList.add('active');

buttons.forEach((button, index) => {
  button.classList.remove('active');
  all_content[index]?.classList.remove('active'); // Видаляємо active у всіх options-grid
});
// buttons[savedTabIndex].classList.add('active');
// all_content[savedTabIndex]?.classList.add('active');

// Відновлення вибраного табу при перезавантаженні сторінки
buttons.forEach((button, index) => {
  button.addEventListener('click', function () {
    // Зняти клас active з усіх кнопок
    buttons.forEach(btn => btn.classList.remove('active'));

    // Додати клас active до натиснутої кнопки
    button.classList.add('active');

    // Отримуємо ширину кнопки та її позицію
    const buttonWidth = button.offsetWidth;
    const buttonOffset = button.parentElement.offsetLeft; // Враховуємо відступ <li>

    all_content.forEach(content => {
      content.classList.remove('active');
    });
    all_content[index].classList.add('active');

    // // Зберігаємо індекс вибраної вкладки
    // localStorage.setItem('activeTabIndex', index);
  });
});

fetch('updated_data.json') // Змініть шлях, якщо JSON у іншому місці
  .then(response => response.json())
  .then(jsonData => {
    generateHouseBlocksForAllGrids(ranges, jsonData);
  })
  .catch(error => console.error('Помилка завантаження JSON:', error));

function openPage(pageNumber) {
  window.location.href = `content.html?page=${pageNumber}`;
}
window.openPage = function (pageNumber) {
  window.location.href = `content.html?page=${pageNumber}`;
};
