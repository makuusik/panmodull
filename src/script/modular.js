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

buttons.forEach((button, index) => {
  button.classList.remove('active');
  all_content[index]?.classList.remove('active'); // Видаляємо active у всіх options-grid
});
buttons[savedTabIndex].classList.add('active');
all_content[savedTabIndex]?.classList.add('active');

// Позиціонуємо indicator
indicator.style.width = `${firstButton.offsetWidth}px`;
indicator.style.transform = `translateX(${firstButton.offsetLeft}px)`;

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

function generateHouseBlocksForAllGrids(ranges, jsonData) {
  document.querySelectorAll('.options-grid').forEach((contentBox, index) => {
    const [start, end] = ranges[index];
    let totalItems = end - start + 1;

    // Виключаємо елемент з id 14
    if (start <= 14 && end >= 14) {
      totalItems--;
    }

    const existingButtons = contentBox.querySelectorAll('button');
    const lastButton =
      existingButtons.length > 0
        ? existingButtons[existingButtons.length - 1]
        : null;
    const totalExistingButtons = existingButtons.length;

    const totalWithExisting = totalItems + totalExistingButtons; // Враховуємо вже наявні кнопки
    let remainder = totalWithExisting % 3; // Скільки елементів залишиться "зайвими" в останньому ряді

    const fragment = document.createDocumentFragment();
    let tempRow = []; // Тимчасовий масив для row-last

    for (let i = start; i <= end; i++) {
      if (i === 14) continue; // Пропускаємо 14

      // Визначаємо заголовок
      let title = '';
      if (i >= 17 && i <= 38) title = `DOM MODUŁOWY MH-${i}`;
      else if (i >= 40 && i <= 43) title = `BIURO MODUŁOWE MH-${i}`;
      else if (i >= 44 && i <= 46) title = `SAUNA MODUŁOWA MH-${i}`;
      else if (i >= 7 && i <= 16) title = `DOMEK MODUŁOWY MH-${i}`;

      // Отримуємо short-info з jsonData
      let shortInfo = 'Brak opisu';
      if (jsonData && Array.isArray(jsonData)) {
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
          <p>${shortInfo}</p>
        `;

      // Визначаємо, чи елемент потрапляє в row-last
      if (
        remainder > 0 &&
        totalExistingButtons + fragment.childNodes.length + tempRow.length >=
          totalWithExisting - remainder
      ) {
        tempRow.push(houseDiv);
      } else {
        fragment.appendChild(houseDiv);
      }
    }

    // Якщо в tempRow є елементи, створюємо row-last
    if (tempRow.length > 0) {
      const rowLastDiv = document.createElement('div');
      rowLastDiv.classList.add('row-last');
      tempRow.forEach(el => rowLastDiv.appendChild(el));
      fragment.appendChild(rowLastDiv);
    }

    // Вставляємо фрагмент у DOM після всіх кнопок
    if (lastButton) {
      lastButton.after(fragment);
    } else {
      contentBox.prepend(fragment);
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

fetch('/updated_data.json') // Змініть шлях, якщо JSON у іншому місці
  .then(response => response.json())
  .then(jsonData => {
    generateHouseBlocksForAllGrids(ranges, jsonData);
  })
  .catch(error => console.error('Помилка завантаження JSON:', error));

function openPage(pageNumber) {
  window.location.href = `/content.html?page=${pageNumber}`;
}
