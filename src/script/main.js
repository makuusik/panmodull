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
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.image-grid');
  const images = document.querySelectorAll('.image-wrapper');

  function updateImageOpacity() {
    if (window.innerWidth > 768) {
      images.forEach(image => (image.style.opacity = 1));
      return;
    }

    const gridRect = container.getBoundingClientRect();
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

  window.scrollGallery = direction => {
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.5;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
    setTimeout(updateImageOpacity, 300); // Затримка для анімації
  };

  // Оновлюємо opacity при завантаженні
  setTimeout(() => {
    container.scrollLeft += 1;
    container.scrollLeft -= 1;
    updateImageOpacity();
  }, 100);

  container.addEventListener('scroll', updateImageOpacity);
  window.addEventListener('resize', updateImageOpacity);

  // Виправлення проблеми з кнопками на мобільних
  container.addEventListener('touchstart', () =>
    setTimeout(updateImageOpacity, 50)
  );
  container.addEventListener('mousedown', () =>
    setTimeout(updateImageOpacity, 50)
  );
});

window.onload = function () {
  window.scrollGallery = function (direction) {
    const container = document.querySelector('.image-grid');
    const scrollAmount = container.clientWidth * 0.5; // Прокрутка на 50% ширини
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };
};

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

  function updateImageOpacity() {
    if (window.innerWidth > 768) {
      // Якщо це НЕ телефон, скидаємо прозорість і виходимо
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

document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.image-grid');

  window.scrollGallery = direction => {
    if (!container) return;
    const scrollAmount = container.clientWidth * 0.5;
    container.scrollBy({
      left: direction * scrollAmount,
      behavior: 'smooth',
    });
  };

  // Форсуємо оновлення стану після завантаження
  setTimeout(() => {
    container.scrollLeft += 1;
    container.scrollLeft -= 1;
  }, 100);
});
window.scrollGallery = direction => {
  if (!container) return;
  const scrollAmount = container.clientWidth * 0.5;
  container.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth',
  });
  setTimeout(updateImageOpacity, 300); // Затримка для анімації
};
container.addEventListener('scroll', updateImageOpacity);
window.addEventListener('resize', updateImageOpacity);
