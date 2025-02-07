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
    const response = await fetch('modular_houses_data_pl.json'); // Завантаження JSON
    const data = await response.json();

    // Отримуємо номер сторінки з URL
    const params = new URLSearchParams(window.location.search);
    const pageId = Number(params.get('page')) || 1;

    // Знаходимо відповідний запис у JSON за index
    const pageData = data.find(item => item.index === pageId);

    if (pageData) {
      // Оновлення заголовків
      document.getElementById('title').innerText = `MODULAR HOUSE MH-${pageId}`;
      document.getElementById('title2').innerText = pageData.title;

      // Оновлення основного зображення
      const images = document.getElementsByClassName('image1');
      const imagePath = `../img/media/modular/${pageId}.jpg`;
      const altImagePath = `../img/media/modular_alt/${pageId}_alt.jpg`;

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
      const detailsContainer1 = document.getElementById('details-container-1');
      detailsContainer1.innerHTML = ''; // Очищення контейнера перед додаванням нових даних

      const firstDetailGroup = pageData.details[0];
      const titleIndexes1 = [0, 6, 26, 41, 61, 75, 77, 79];

      titleIndexes1.forEach((titleIndex, i) => {
        const detailSection = document.createElement('details');
        const summary = document.createElement('summary');
        summary.innerText = firstDetailGroup[titleIndex]; // Заголовок з індексу

        detailSection.appendChild(summary);

        const startIdx = titleIndex + 1;
        const endIdx = titleIndexes1[i + 1] || firstDetailGroup.length;

        for (let j = startIdx; j < endIdx; j++) {
          const pointElement = document.createElement('p');
          pointElement.innerText = firstDetailGroup[j]; // Пункти
          detailSection.appendChild(pointElement);
        }

        detailsContainer1.appendChild(detailSection);
      });

      // Оновлення details для другого блоку
      const detailsContainer2 = document.getElementById('details-container-2');
      detailsContainer2.innerHTML = ''; // Очищення контейнера перед додаванням нових даних

      const secondDetailGroup = pageData.details[0]; // Другий масив
      const titleIndexes2 = [81, 87, 107, 123, 143, 158, 160, 162, 164];

      titleIndexes2.forEach((titleIndex, i) => {
        const detailSection = document.createElement('details');
        const summary = document.createElement('summary');
        summary.innerText = secondDetailGroup[titleIndex]; // Заголовок з індексу

        detailSection.appendChild(summary);

        const startIdx = titleIndex + 1;
        const endIdx = titleIndexes2[i + 1] || secondDetailGroup.length;

        for (let j = startIdx; j < endIdx; j++) {
          const pointElement = document.createElement('p');
          pointElement.innerText = secondDetailGroup[j]; // Пункти
          detailSection.appendChild(pointElement);
        }

        detailsContainer2.appendChild(detailSection);
      });

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
