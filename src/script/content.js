function getPolishMonthWord(number) {
  if (number === 1) {
    return 'miesiąc';
  } else if (number >= 2 && number <= 4) {
    return 'miesiące';
  } else {
    return 'miesięcy';
  }
}

async function loadData() {
  try {
    const response = await fetch('updated_data.json'); // Завантаження JSON
    const data = await response.json();

    // Отримуємо номер сторінки з URL
    const params = new URLSearchParams(window.location.search);
    const pageId = Number(params.get('page')) || 1;

    // Знаходимо відповідний запис у JSON за index
    const pageData = data.find(item => item.index === pageId);

    if (pageData) {
      // Оновлення заголовків
      document.getElementById('title').innerText = pageData.title.toUpperCase();
      document.getElementById('title2').innerText = pageData.title;

      // Оновлення основного зображення
      const images = document.getElementsByClassName('image1');
      const imagePath = `img/modular/${pageId}.jpg`;
      const altImagePath = `img/modular_alt/${pageId}_alt.jpg`;

      for (let img of images) {
        img.src = imagePath;
      }

      document.getElementById('image2').src = altImagePath;

      // Оновлення тексту опису
      document.getElementById('text').innerText = pageData.descriptions[4];

      // Оновлення таблиці характеристик
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = ''; // Очищення таблиці

      const properties_list = [
        'Area',
        'Living area',
        'Module Size',
        'Height',
        'Bedrooms',
        'Terrace',
        'Time for construction',
      ];
      const units = ['m²', 'm²', 'm', 'm', '', 'm²', 'months'];

      pageData.characteristics.forEach((item, index) => {
        if (index < properties_list.length) {
          const row = document.createElement('tr');

          const firstColumn = document.createElement('td');
          firstColumn.innerText = properties_list[index];
          row.appendChild(firstColumn);

          const secondColumn = document.createElement('td');
          // Перевірка для часу на будівництво
          if (index === 6) {
            const months = item; // item містить число місяців
            secondColumn.innerText = `${months} ${getPolishMonthWord(
              months
            )}`.trim();
          } else {
            secondColumn.innerText = item
              ? `${item} ${units[index]}`.trim()
              : '—';
          }
          row.appendChild(secondColumn);

          tableBody.appendChild(row);
        }
      });

      // Оновлення details для першого блоку

      console.log('✅ Дані успішно завантажені!');
    } else {
      console.warn('⛔️ Дані для цієї сторінки не знайдено.');
    }
  } catch (error) {
    console.error('❌ Помилка завантаження JSON:', error);
  }
}

function changeMainImage(src) {
  const mainImage = document.getElementById('main-image');
  mainImage.src = src;
}

document.addEventListener('DOMContentLoaded', loadData);

document.querySelectorAll('.details-container summary').forEach(summary => {
  summary.addEventListener('click', function () {
    const parentContainer = this.closest('.details-container');

    // Закриваємо всі відкриті details в межах поточного details-container
    parentContainer.querySelectorAll('.details[open]').forEach(openDetail => {
      if (openDetail !== this.parentElement) {
        openDetail.removeAttribute('open');
      }
    });

    // Перемикаємо відкриття поточного елемента
    const parent = summary.parentElement;
    if (parent.hasAttribute('open')) {
      parent.removeAttribute('open');
    } else {
      parent.setAttribute('open', 'true');
    }
  });
});
