// Об'єкт з контентом для кожної сторінки
const pagesData = {
  17: {
    title: 'Сторінка 17',
    image1: '../img/media/modular/17.jpg',
    image2: '../img/media/modular_alt/17_alt.jpg',
    text: 'Це унікальний текст для сторінки 1.',
    list: ['Пуr', 'Пункт 1.2', 'Пункт 1.3'],
  },
  18: {
    title: 'Сторінка 18',
    image1: '../img/media/modular/18.jpg',
    image2: '../img/media/modular_alt/18_alt.jpg',
    text: 'Опис для сторінки 2.',
    list: ['Пункт 2.1', 'Пункт 2.2', 'Пункт 2.3'],
  },
  19: {
    title: 'Сторінка 19',
    image1: '../img/media/modular/19.jpg',
    image2: '../img/media/modular_alt/19_alt.jpg',
    text: 'Деталі для сторінки 3.',
    list: ['Пункт 3.1', 'Пункт 3.2', 'Пункт 3.3'],
  },
};

// Отримуємо номер сторінки з URL
const params = new URLSearchParams(window.location.search);
const pageId = Number(params.get('page')) || 1;

// Отримуємо потрібні дані
const pageData = pagesData[pageId];

if (pageData) {
  document.getElementById('title').innerText = pageData.title;
  document.getElementById('image1').src = pageData.image1;
  document.getElementById('image2').src = pageData.image2;
  document.getElementById('text').innerText = pageData.text;

  const list = document.getElementById('list');
  list.innerHTML = ''; // Очищуємо список перед додаванням нових елементів
  pageData.list.forEach(item => {
    const li = document.createElement('li');
    li.innerText = item;
    list.appendChild(li);
  });
}
