document.addEventListener('DOMContentLoaded', function () {
  let navbar = document.getElementById('navbar');
  let dropdownMenu = document.querySelector('.dropdown-menu');

  if (!navbar) {
    console.error('Елемент #navbar не знайдено!');
    return;
  }

  // Функція для оновлення прозорості на основі прокрутки
  function updateScrollOpacity() {
    let scrollTop = window.scrollY;
    let opacity = Math.min(scrollTop / 300, 0.8); // Обмежуємо прозорість до 0.8

    navbar.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;

    if (dropdownMenu) {
      dropdownMenu.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`; // Робимо дропдаун прозорим відповідно до скролу
    }
  }

  // Викликаємо функцію при завантаженні сторінки для врахування поточного прокрутки
  updateScrollOpacity();

  // Обробник скролу
  window.addEventListener('scroll', updateScrollOpacity);
});

document.addEventListener('DOMContentLoaded', function () {
  const links = document.querySelectorAll('a[href*="#"]');

  links.forEach(link => {
    link.addEventListener('click', function (event) {
      const targetId = this.getAttribute('href').split('#')[1];
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        event.preventDefault();
        const offset = 120; // Висота відступу (змінюй під себе)
        const elementPosition =
          targetElement.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
          top: elementPosition - offset,
          behavior: 'smooth',
        });
      }
    });
  });
});
