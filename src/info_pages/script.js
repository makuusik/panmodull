// Об'єкт з контентом для кожної сторінки (без зображень)
const pagesData = {
  17: {
    title: 'MODULAR HOUSE M-17',
    text: 'Це унікальний текст для сторінки 1.',
    list: [
      'Пуr',
      'Пункт 1.2',
      'Пункт 1.3',
      'Пуr',
      'Пункт 1.2',
      'Пункт 1.3',
      'Пункт 1.3',
    ],
  },
  18: {
    title: 'Сторінка 18',
    text: 'Опис для сторінки 2.',
    list: ['Пункт 2.1', 'Пункт 2.2', 'Пункт 2.3'],
  },
  19: {
    title: 'Сторінка 19',
    text: 'Деталі для сторінки 3.',
    list: ['Пункт 3.1', 'Пункт 3.2', 'Пункт 3.3'],
  },
};

// Масив властивостей
const properties_list = [
  'Area',
  'Living area',
  'Module Size',
  'Height',
  'Bedrooms',
  'Terrace',
  'Time for construction',
];

// Отримуємо номер сторінки з URL
const params = new URLSearchParams(window.location.search);
const pageId = Number(params.get('page')) || 1;

// Отримуємо потрібні дані
const pageData = pagesData[pageId];

if (pageData) {
  // Оновлення заголовку
  document.getElementById('title').innerText = pageData.title;

  // Оновлення зображення на основі pageId
  const images = document.getElementsByClassName('image1');
  const imagePath = `../img/media/modular/${pageId}.jpg`; // Динамічний шлях до зображення
  const altImagePath = `../img/media/modular_alt/${pageId}_alt.jpg`; // Динамічний шлях до альтернативного зображення

  if (images.length > 0) {
    for (let i = 0; i < images.length; i++) {
      images[i].src = imagePath; // Присвоюємо нове значення src
    }
  }

  // Оновлення другого зображення
  document.getElementById('image2').src = altImagePath;

  // Оновлення тексту
  document.getElementById('text').innerText = pageData.text;

  // Оновлення таблиці
  const tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // Очищаємо таблицю перед додаванням нових елементів

  // Заміна тільки елементів в другій колонці
  pageData.list.forEach((item, index) => {
    if (index < properties_list.length) {
      // Перевіряємо, чи є для цього індексу елемент у properties_list
      const row = document.createElement('tr'); // Створюємо новий рядок таблиці

      // Створюємо комірку для першої колонки (пункт)
      const firstColumn = document.createElement('td');
      firstColumn.innerText = properties_list[index]; // Для прикладу: Пункт 1, Пункт 2 тощо
      row.appendChild(firstColumn);

      // Створюємо комірку для другої колонки (дані)
      const secondColumn = document.createElement('td');
      secondColumn.innerText = item; // Встановлюємо значення з pageData.list
      row.appendChild(secondColumn);

      // Додаємо новий рядок в таблицю
      tableBody.appendChild(row);
    }
  });
}
