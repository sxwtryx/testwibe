// scripts.js
document.addEventListener('DOMContentLoaded', function() {
  // Основные элементы
  const burger = document.getElementById('burger');
  const menu = document.getElementById('spisoc');
  const body = document.body;
  
  // Создаем оверлей для меню
  const overlay = document.createElement('div');
  overlay.className = 'menu-overlay';
  document.body.appendChild(overlay);
  
  // Переменная для отслеживания состояния меню
  let isMenuOpen = false;
  
  // Функция для открытия/закрытия меню
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (isMenuOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
      // Закрываем все открытые дропдауны при закрытии меню
      closeAllDropdowns();
    }
  }
  
  // Функция для закрытия меню
  function closeMenu() {
    if (isMenuOpen) {
      isMenuOpen = false;
      burger.classList.remove('active');
      menu.classList.remove('active');
      overlay.classList.remove('active');
      body.style.overflow = '';
      closeAllDropdowns();
    }
  }
  
  // Обработчик для бургер-меню
  burger.addEventListener('click', function(e) {
    e.stopPropagation();
    toggleMenu();
  });
  
  // Обработчик для оверлея
  overlay.addEventListener('click', closeMenu);
  
  // Обработчики для ссылок меню (кроме дропдаунов)
  const menuLinks = document.querySelectorAll('#spisoc > li > a:not(.dropdown-toggle)');
  menuLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 1024) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        // Закрываем меню
        closeMenu();
        
        // Плавный скролл к секции
        if (targetId && targetId.startsWith('#')) {
          setTimeout(() => {
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
              window.scrollTo({
                top: targetElement.offsetTop - 70,
                behavior: 'smooth'
              });
            }
          }, 300);
        }
      }
    });
  });
  
  // Обработчики для десктопных ссылок (якорные ссылки)
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement && window.innerWidth > 1024) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 70,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // РАБОТА С ВЫПАДАЮЩИМ МЕНЮ "УСЛУГИ"
  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = dropdown.querySelector('.dropdown-toggle');
  const dropdownMenu = dropdown.querySelector('.dropdown-menu');
  const dropdownLinks = dropdownMenu.querySelectorAll('a');
  
  // Переменная для отслеживания состояния дропдауна
  let isDropdownOpen = false;
  
  // Функция для переключения дропдауна
  function toggleDropdown(e) {
    if (window.innerWidth <= 1024) {
      e.preventDefault();
      e.stopPropagation();
      
      isDropdownOpen = !isDropdownOpen;
      dropdown.classList.toggle('open');
      
      // Закрываем другие дропдауны (если они есть)
      const otherDropdowns = document.querySelectorAll('.dropdown.open');
      otherDropdowns.forEach(otherDropdown => {
        if (otherDropdown !== dropdown) {
          otherDropdown.classList.remove('open');
        }
      });
    }
  }
  
  // Функция для закрытия всех дропдаунов
  function closeAllDropdowns() {
    document.querySelectorAll('.dropdown.open').forEach(dropdown => {
      dropdown.classList.remove('open');
    });
    isDropdownOpen = false;
  }
  
  // Обработчик для кнопки дропдауна
  dropdownToggle.addEventListener('click', toggleDropdown);
  
  // Обработчики для ссылок внутри дропдауна
  dropdownLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (window.innerWidth <= 1024) {
        // Закрываем меню полностью при клике на пункт подменю
        setTimeout(() => {
          closeMenu();
        }, 300);
      }
    });
  });
  
  // Закрытие дропдауна при клике вне его (только на мобильных)
  document.addEventListener('click', function(e) {
    if (window.innerWidth <= 1024 && isDropdownOpen && 
        !dropdown.contains(e.target) && 
        !dropdownToggle.contains(e.target)) {
      closeAllDropdowns();
    }
  });
  
  // Обработчик изменения размера окна
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      // Закрываем меню и дропдауны при переходе на десктоп
      closeMenu();
      closeAllDropdowns();
    }
  });
  
  // Закрытие меню при нажатии Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
  
  // Добавляем плавные анимации для ссылок (только для десктопа)
  const allLinks = document.querySelectorAll('#spisoc li a');
  allLinks.forEach(link => {
    link.addEventListener('mouseenter', function() {
      if (window.innerWidth > 1024) {
        this.style.transform = 'translateY(-2px)';
      }
    });
    
    link.addEventListener('mouseleave', function() {
      if (window.innerWidth > 1024) {
        this.style.transform = 'translateY(0)';
      }
    });
  });
});