const isEnglish = window.location.href.includes('_en');
const jsonFile = isEnglish ? 'updated_data_en.json' : 'updated_data.json';

fetch(jsonFile) // Вибір JSON залежно від мови
  .then(response => response.json())
  .then(jsonData => {
    generateHouseBlocksForAllGrids(ranges, jsonData);
  })
  .catch(error => console.error('Помилка завантаження JSON:', error));

function openPage(pageNumber) {
  const pageUrl = isEnglish
    ? `content_en.html?page=${pageNumber}`
    : `content.html?page=${pageNumber}`;
  window.location.href = pageUrl;
}
window.openPage = openPage;
