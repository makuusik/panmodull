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
