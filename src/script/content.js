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
  // Визначення змінних для div
  try {
    const isEnglish = window.location.href.includes('_en');
    const jsonFile = isEnglish ? 'updated_data_en.json' : 'updated_data.json';
    const response = await fetch(jsonFile); // Завантаження JSON
    const data = await response.json();

    // Отримуємо номер сторінки з URL
    const params = new URLSearchParams(window.location.search);
    const pageId = Number(params.get('page')) || 1;
    const wrapperDetails = document.querySelectorAll('.wrapper-details'); // Отримуємо всі елементи

    if (wrapperDetails.length >= 2) {
      // Переконуємось, що є два елементи
      if ([44, 45, 46, 3, 4].includes(pageId)) {
        wrapperDetails[0].style.display = 'none';
        wrapperDetails[1].style.display = 'flex';
      } else {
        wrapperDetails[1].style.display = 'none';
        wrapperDetails[0].style.display = 'flex';
        wrapperDetails[2].style.display = 'none';
      }
    } else {
      console.warn(
        '⛔ Очікувалося два .wrapper-details, але знайдено:',
        wrapperDetails.length
      );
    }

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
      document.getElementById('text').innerHTML = pageData.descriptions[4];

      // Оновлення таблиці характеристик
      const tableBody = document.getElementById('table-body');
      tableBody.innerHTML = ''; // Очищення таблиці

      const isEnglish = window.location.href.includes('_en');

      const properties_list = isEnglish
        ? [
            'Area',
            'Living area',
            'Module size',
            'Height',
            'Bedrooms',
            'Terrace',
            'Construction time',
          ]
        : [
            'Powierzchnia',
            'Powierzchnia mieszkalna',
            'Rozmiar modułu',
            'Wysokość',
            'Sypialnie',
            'Taras',
            'Czas budowy',
          ];

      const units = isEnglish
        ? ['m²', 'm²', 'm', 'm', '', 'm²', 'months']
        : ['m²', 'm²', 'm', 'm', '', 'm²', 'miesiące'];

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

      // console.log('✅ Дані успішно завантажені!');
    } else {
      // console.warn('⛔️ Дані для цієї сторінки не знайдено.');
    }
  } catch (error) {
    console.error('❌ Помилка завантаження JSON:', error);
  }
}

export function changeMainImage(src) {
  const mainImage = document.getElementById('main-image');
  if (mainImage) {
    mainImage.src = src;
  }
}
window.changeMainImage = changeMainImage;

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
document.addEventListener('DOMContentLoaded', function () {
  const imageGrid = document.querySelector('.scroll-images');
  const images = document.querySelectorAll('img');

  function updateImageOpacity() {
    const gridRect = imageGrid.getBoundingClientRect();
    const gridCenter = gridRect.left + gridRect.width / 2;

    images.forEach(image => {
      const rect = image.getBoundingClientRect();
      const imageCenter = rect.left + rect.width / 2;
      const distance = Math.abs(gridCenter - imageCenter);
      const maxDistance = gridRect.width / 2;

      // Обчислення прозорості залежно від відстані
      let opacity = Math.max(0.3, 1 - distance / maxDistance);
      if (window.matchMedia('(max-width: 769px)').matches) {
        image.style.opacity = opacity;
      }
    });
  }

  imageGrid.addEventListener('scroll', updateImageOpacity);
  window.addEventListener('resize', updateImageOpacity);

  updateImageOpacity();
});
window.onload = function () {
  window.scrollGallery = function (direction) {
    const container = document.querySelector('.scroll-images');
    const scrollAmount = container.clientWidth * 0.5; // Прокрутка на 50% ширини
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };
};
