// document.addEventListener('DOMContentLoaded', function () {
//   const svgObject = document.getElementById('svg-object');

//   svgObject.addEventListener('load', function () {
//     const svgDoc = svgObject.contentDocument; // Отримуємо доступ до внутрішнього SVG документа
//     const paths = svgDoc.querySelectorAll('path'); // Вибираємо всі елементи path в SVG

//     paths.forEach(path => {
//       path.style.strokeDasharray = path.getTotalLength(); // Встановлюємо довжину для кожного path
//       path.style.strokeDashoffset = path.getTotalLength(); // Сховуємо лінію
//       path.classList.add('draw'); // Додаємо клас для анімації
//     });
//   });
// });
// document.addEventListener('DOMContentLoaded', function () {
//   const imageGrid = document.querySelector('.image-grid');
//   const images = document.querySelectorAll('.image-wrapper');

//   function updateImageOpacity() {
//     const gridRect = imageGrid.getBoundingClientRect();
//     const gridCenter = gridRect.left + gridRect.width / 2;

//     images.forEach(image => {
//       const rect = image.getBoundingClientRect();
//       const imageCenter = rect.left + rect.width / 2;
//       const distance = Math.abs(gridCenter - imageCenter);
//       const maxDistance = gridRect.width / 2;

//       // Обчислення прозорості залежно від відстані
//       let opacity = Math.max(0.3, 1 - distance / maxDistance);
//       image.style.opacity = opacity;
//     });
//   }

//   imageGrid.addEventListener('scroll', updateImageOpacity);
//   window.addEventListener('resize', updateImageOpacity);

//   updateImageOpacity();
// });
// window.onload = function () {
//   window.scrollGallery = function (direction) {
//     const container = document.querySelector('.image-grid');
//     const scrollAmount = container.clientWidth * 0.5; // Прокрутка на 50% ширини
//     container.scrollBy({
//       left: direction * scrollAmount,
//       behavior: 'smooth',
//     });
//   };
// };

if (!('scrollBehavior' in document.documentElement.style)) {
  import(
    'https://cdn.jsdelivr.net/npm/smoothscroll-polyfill@0.4.4/dist/smoothscroll.min.js'
  ).then(() => {
    window.__forceSmoothScrollPolyfill__ = true;
  });
}

document.addEventListener('DOMContentLoaded', function () {
  const svgObject = document.getElementById('svg-object');

  if (svgObject) {
    svgObject.addEventListener('load', function () {
      const svgDoc = svgObject.contentDocument;
      const paths = svgDoc.querySelectorAll('path');

      paths.forEach(path => {
        path.style.strokeDasharray = path.getTotalLength();
        path.style.strokeDashoffset = path.getTotalLength();
        path.classList.add('draw');
      });
    });
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const imageGrid = document.querySelector('.image-grid');
  const images = document.querySelectorAll('.image-wrapper');

  // Оновлення прозорості зображень
  function updateImageOpacity() {
    if (window.innerWidth > 768) {
      images.forEach(image => (image.style.opacity = 1));
      return;
    }

    const gridRect = imageGrid.getBoundingClientRect();
    const gridCenter = gridRect.left + gridRect.width / 2;

    images.forEach(image => {
      const rect = image.getBoundingClientRect();
      const imageCenter = rect.left + rect.width / 2;
      const distance = Math.abs(gridCenter - imageCenter);
      const maxDistance = gridRect.width / 2;

      let opacity = Math.max(0.3, 1 - distance / maxDistance);
      image.style.opacity = opacity;
    });
  }

  imageGrid.addEventListener('scroll', updateImageOpacity);
  window.addEventListener('resize', updateImageOpacity);
  updateImageOpacity();
});

document.addEventListener('DOMContentLoaded', function () {
  const container = document.querySelector('.image-grid');

  if (container) {
    container.scrollLeft = 1;
    container.scrollLeft = 0;

    if (window.innerWidth < 768) {
      Object.assign(container.style, {
        display: 'flex',
        overflowX: 'scroll',
        scrollSnapType: 'x mandatory',
        scrollBehavior: 'smooth',
        WebkitOverflowScrolling: 'touch', // Додає підтримку для iOS
      });
    }

    // Функція для прокручування з setTimeout для iOS
    window.scrollGallery = function (direction) {
      const scrollAmount = container.clientWidth * 0.5;
      setTimeout(() => {
        container.scrollBy({
          left: direction * scrollAmount,
          behavior: 'smooth',
        });
      }, 0);
    };

    // Додаємо обробники подій для кнопок
    document.querySelectorAll('.scroll-btn').forEach(btn => {
      const direction = btn.classList.contains('left') ? -1 : 1;

      btn.addEventListener('click', () => window.scrollGallery(direction));
      btn.addEventListener('touchstart', e => {
        e.preventDefault();
        window.scrollGallery(direction);
      });
    });
  }
});

// window.onload = function () {
//   window.scrollGallery = function (direction) {
//     const container = document.querySelector('.image-grid');
//     const scrollAmount = container.clientWidth * 0.5;

//     container.scrollBy({
//       left: direction * scrollAmount,
//       behavior: 'smooth',
//     });
//   };
// };
// document.addEventListener('DOMContentLoaded', () => {
//   const container = document.querySelector('.image-grid');

//   if (container) {
//     // Примусово змушуємо контейнер ініціалізувати скрол
//     container.scrollLeft = 1;
//     container.scrollLeft = 0;
//     if (window.innerWidth < 768) {
//       Object.assign(container.style, {
//         display: 'flex',
//         overflowX: 'scroll',
//         scrollSnapType: 'x mandatory',
//         scrollBehavior: 'smooth',
//       });
//     }

//     // Додаємо стилі динамічно

//     window.scrollGallery = function (direction) {
//       const scrollAmount = container.clientWidth * 0.5;

//       setTimeout(() => {
//         container.scrollBy({
//           left: direction * scrollAmount,
//           behavior: 'smooth',
//         });
//       }, 50);
//     };
//   }
// });
