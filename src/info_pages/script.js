// Функція для завантаження JSON-файлу та оновлення сторінки
async function loadData() {
  try {
    const response = await fetch('../modular_houses_data.json'); // Завантаження JSON
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
      document.getElementById('text').innerText =
        pageData.descriptions.join('\n');

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
      const units = ['m²', '', 'm', 'm', '', 'm²', 'months'];

      pageData.characteristics.forEach((item, index) => {
        if (index < properties_list.length) {
          const row = document.createElement('tr');

          const firstColumn = document.createElement('td');
          firstColumn.innerText = properties_list[index];
          row.appendChild(firstColumn);

          const secondColumn = document.createElement('td');
          secondColumn.innerText = `${item} ${units[index]}`.trim();
          row.appendChild(secondColumn);

          tableBody.appendChild(row);
        }
      });

      console.log('✅ Дані успішно завантажені!');
    } else {
      console.warn('⛔️ Дані для цієї сторінки не знайдено.');
    }
  } catch (error) {
    console.error('❌ Помилка завантаження JSON:', error);
  }
}

// Виклик функції після завантаження сторінки
document.addEventListener('DOMContentLoaded', loadData);
