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
      dropdownMenu.style.backgroundColor = `transparent`; // Робимо дропдаун прозорим відповідно до скролу
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
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const menu = document.querySelector('.nav-links');
  const menuItems = document.querySelectorAll('.nav-links .nav-option');
  const toggleButton = document.createElement('button');

  toggleButton.textContent = '☰';
  toggleButton.classList.add('menu-toggle');

  if (navbar) {
    navbar.appendChild(toggleButton);
  } else {
    console.error('Navbar element not found!');
  }

  toggleButton.addEventListener('click', function () {
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
    } else {
      menu.classList.add('open');
      menuItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(100px)';
        setTimeout(() => {
          item.style.opacity = '1';
          item.style.transform = 'translateX(0)';
        }, 100 * index);
      });
    }
  });
});
document.addEventListener('DOMContentLoaded', function () {
  const navbar = document.getElementById('navbar');
  const dropdownToggle = document.querySelector('.dropdown > a'); // Посилання, яке відкриває дропдаун
  const dropdownMenu = document.querySelector('.dropdown-menu');

  if (!navbar || !dropdownToggle || !dropdownMenu) {
    console.error('Не знайдено необхідних елементів!');
    return;
  }

  function updateScrollOpacity() {
    let scrollTop = window.scrollY;
    let opacity = Math.min(scrollTop / 300, 0.8);

    navbar.classList.toggle('scrolled', opacity > 0);
    dropdownMenu.classList.toggle('scrolled', opacity > 0);
  }

  updateScrollOpacity();
  window.addEventListener('scroll', updateScrollOpacity);

  // Обробник кліку на кнопку відкриття дропдауну
  dropdownToggle.addEventListener('click', function (event) {
    if (!dropdownMenu.contains(event.target)) {
      event.preventDefault(); // Запобігає переходу за посиланням тільки для "PROJEKTY"
      dropdownMenu.classList.toggle('open');
    }
  });

  // Дозволяємо вкладеним посиланням працювати нормально
  dropdownMenu.addEventListener('click', function (event) {
    event.stopPropagation(); // Запобігає закриттю при кліку на внутрішні посилання
  });

  // Закриття дропдауну при кліку поза ним
  document.addEventListener('click', function (event) {
    if (
      !dropdownToggle.contains(event.target) &&
      !dropdownMenu.contains(event.target)
    ) {
      dropdownMenu.classList.remove('open');
    }
  });
});
