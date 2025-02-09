const buttons = document.querySelectorAll('.btn');
const indicator = document.querySelector('.indicator');
const buttonContainer = document.querySelector('.button-container');
const all_content = document.querySelectorAll('.options-grid');

// Збереження стану вибраного табу в LocalStorage
const savedTabIndex = localStorage.getItem('activeTabIndex') || 0; // Якщо немає збереженого індексу, вибираємо перший таб
const firstButton = buttons[savedTabIndex];
buttons[savedTabIndex].classList.add('active');
indicator.style.width = `${firstButton.offsetWidth}px`;
indicator.style.transform = `translateX(${firstButton.parentElement.offsetLeft}px)`;

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

document.addEventListener('DOMContentLoaded', () => {
  const grids = document.querySelectorAll('.options-grid');

  // Отримуємо збережений індекс активного гріда (за замовчуванням 0)
  const savedIndex = localStorage.getItem('activeGridIndex') || 0;

  // Встановлюємо клас "active" на збережений грід
  grids.forEach((grid, index) => {
    grid.classList.toggle('active', index == savedIndex);
  });

  // Додаємо обробник подій для кожного гріда
  grids.forEach((grid, index) => {
    grid.addEventListener('click', () => {
      // Видаляємо "active" у всіх
      grids.forEach(g => g.classList.remove('active'));

      // Додаємо "active" до натиснутого
      grid.classList.add('active');

      // Зберігаємо індекс активного гріда
      localStorage.setItem('activeGridIndex', index);
    });
  });
});

function generateHouseBlocksForAllGrids(ranges, jsonData) {
  document.querySelectorAll('.options-grid').forEach((contentBox, index) => {
    const [start, end] = ranges[index];
    let totalItems = end - start + 1;

    // Оновлення totalItems після виключення елемента з id 14
    if (start <= 14 && end >= 14) {
      totalItems--;
    }

    const buttonCount = contentBox.querySelectorAll('button').length;
    let remainder = (totalItems + buttonCount) % 3; // Кількість елементів, які залишаються
    let rowLastDiv = null;

    for (let i = start; i <= end; i++) {
      if (i === 14) continue;

      // Визначаємо заголовок в залежності від діапазону
      let title = '';
      if (i >= 17 && i <= 38) title = `DOM MODUŁOWY MH-${i}`;
      else if (i >= 40 && i <= 43) title = `BIURO MODUŁOWE MH-${i}`;
      else if (i >= 44 && i <= 46) title = `SAUNA MODUŁOWA MH-${i}`;
      else if (i >= 7 && i <= 16) title = `DOMEK MODUŁOWY MH-${i}`;

      // Перевіряємо, чи є jsonData і чи містить воно дані
      let shortInfo = 'Brak opisu'; // Значення за замовчуванням
      if (jsonData && Array.isArray(jsonData)) {
        // Оскільки jsonData - це масив масивів, розгортаємо його
        const flatData = jsonData.flat();
        const houseData = flatData.find(item => item.index === i);
        if (houseData && houseData['short-info']) {
          shortInfo = houseData['short-info'];
        }
      }

      const houseDiv = document.createElement('button');
      houseDiv.onclick = function () {
        openPage(i);
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
          <h2>${title}</h2>
          <p>${shortInfo}</p> <!-- Вставляємо дані з JSON -->
        `;

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
