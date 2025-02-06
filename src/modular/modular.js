const buttons = document.querySelectorAll('.btn');
const indicator = document.querySelector('.indicator');
const buttonContainer = document.querySelector('.button-container');
const all_content = document.querySelectorAll('.options-grid');

const firstButton = buttons[0];
buttons[0].classList.add('active');
indicator.style.width = `${firstButton.offsetWidth}px`;
indicator.style.transform = `translateX(${firstButton.parentElement.offsetLeft}px)`;

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
  });
});

function generateHouseBlocksForAllGrids(ranges) {
  document.querySelectorAll('.options-grid').forEach((contentBox, index) => {
    const [start, end] = ranges[index];
    let totalItems = end - start + 1;

    // Оновлення totalItems після виключення елемента з id 14
    if (start <= 14 && end >= 14) {
      totalItems--; // Якщо 14-й елемент є в діапазоні, зменшуємо totalItems
    }

    const buttonCount = contentBox.querySelectorAll('button').length;
    let remainder = (totalItems + buttonCount) % 3; // Кількість елементів, які залишаються
    let rowLastDiv = null;

    for (let i = start; i <= end; i++) {
      // Пропускаємо елемент з id=14
      if (i === 14) {
        continue; // Перехід до наступної ітерації
      }

      const houseDiv = document.createElement('button');
      houseDiv.onclick = function () {
        openPage(i); // Заміни 1 на потрібний номер сторінки
      };

      houseDiv.innerHTML = `
        <div class="image-wrapper">
          <img
            class="img-default"
            src="../img/media/modular/${i}.jpg"
            alt="House ${i}"
            width="350"
            height="177"
          />
          <img
            class="img-hover"
            src="../img/media/modular_alt/${i}_alt.jpg"
            alt="House ${i}"
            width="350"
            height="177"
          />
        </div>
        <h2>MODULE HOUSE M${i}</h2>
        <p>Some info about house option</p>
      `;

      // Останні елементи, якщо їх кількість не кратна 3, додаємо в row-last
      if (remainder > 0 && i > end - remainder) {
        if (!rowLastDiv) {
          rowLastDiv = document.createElement('div');
          rowLastDiv.classList.add('row-last');
        }
        rowLastDiv.appendChild(houseDiv);
      } else {
        contentBox.appendChild(houseDiv);
      }
    }

    // Додаємо row-last в кінець, якщо він є
    if (rowLastDiv) {
      contentBox.appendChild(rowLastDiv);
    }
  });
}

// Приклад масиву діапазонів для кожного options-grid
const ranges = [
  [17, 38], // Для першого options-grid
  [40, 43], // Для другого options-grid
  [44, 46], // Для третього options-grid
  [7, 16], // Для четвертого options-grid
];

// Викликаємо для всіх .options-grid
generateHouseBlocksForAllGrids(ranges);

function openPage(pageNumber) {
  window.location.href = `../info_pages/content.html?page=${pageNumber}`;
}
