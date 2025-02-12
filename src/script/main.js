document.addEventListener('DOMContentLoaded', function () {
  const svgObject = document.getElementById('svg-object');

  svgObject.addEventListener('load', function () {
    const svgDoc = svgObject.contentDocument; // Отримуємо доступ до внутрішнього SVG документа
    const paths = svgDoc.querySelectorAll('path'); // Вибираємо всі елементи path в SVG

    paths.forEach(path => {
      path.style.strokeDasharray = path.getTotalLength(); // Встановлюємо довжину для кожного path
      path.style.strokeDashoffset = path.getTotalLength(); // Сховуємо лінію
      path.classList.add('draw'); // Додаємо клас для анімації
    });
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.image-grid');
  const items = document.querySelectorAll('.image-wrapper');

  let currentIndex = 0;
  let isSwiping = false; // Прапорець для запобігання подвійних свайпів

  function updateActiveImage(index) {
    items.forEach((item, i) => {
      item.classList.toggle('active', i === index);
    });
  }

  function scrollToIndex(index) {
    if (isSwiping) return; // Якщо вже відбувається свайп — ігноруємо

    if (index < 0) index = 0;
    if (index >= items.length) index = items.length - 1;

    isSwiping = true; // Блокуємо повторний свайп

    const target = items[index];
    container.scrollTo({
      left:
        target.offsetLeft -
        container.offsetLeft -
        (container.clientWidth - target.clientWidth) / 2,
      behavior: 'smooth',
    });

    currentIndex = index;
    updateActiveImage(index);

    setTimeout(() => {
      isSwiping = false; // Розблоковуємо свайпи після завершення анімації
    }, 300); // Затримка для плавності
  }

  let startX = 0;
  container.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  container.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      const direction = diff > 0 ? 1 : -1;
      scrollToIndex(currentIndex + direction);
    }
  });

  updateActiveImage(currentIndex);
});
