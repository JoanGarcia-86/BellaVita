document.addEventListener('DOMContentLoaded', () => {
    const productSlider = document.querySelector('.product-slider');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    // Si no hay productos o botones, salir
    if (!productSlider || !prevBtn || !nextBtn || productCards.length === 0) {
      console.error('No se encontraron elementos necesarios para el slider');
      return;
    }
    
    // Configuración del carrusel
    let currentIndex = 0;
    
    // Función para mostrar la tarjeta actual y las adyacentes con efecto 3D
    function updateDisplay() {
      // Detectar si estamos en pantalla pequeña
      const isMobile = window.innerWidth <= 768;
      
      productCards.forEach((card, index) => {
        // Resetear transformaciones y estilos
        card.style.transform = '';
        card.style.opacity = '';
        card.style.filter = '';
        card.style.zIndex = '';
        
        if (index === currentIndex) {
          // Tarjeta activa (visible en el centro)
          card.classList.add('active');
          card.style.transform = 'translateX(0) scale(1)';
          card.style.opacity = '1';
          card.style.zIndex = '2';
          card.style.filter = 'blur(0)';
        } 
        else if (!isMobile && index === ((currentIndex - 1 + productCards.length) % productCards.length)) {
          // Tarjeta a la izquierda (solo en pantallas medianas y grandes)
          card.classList.remove('active');
          card.style.transform = 'translateX(-300px) scale(0.85)';
          card.style.opacity = '0.7';
          card.style.zIndex = '1';
          card.style.filter = 'blur(1px)';
        }
        else if (!isMobile && index === ((currentIndex + 1) % productCards.length)) {
          // Tarjeta a la derecha (solo en pantallas medianas y grandes)
          card.classList.remove('active');
          card.style.transform = 'translateX(300px) scale(0.85)';
          card.style.opacity = '0.7';
          card.style.zIndex = '1';
          card.style.filter = 'blur(1px)';
        }
        else {
          // Tarjetas más lejanas (ocultas)
          card.classList.remove('active');
          card.style.opacity = '0';
          card.style.zIndex = '0';
        }
      });
    }
    
    // Inicializar carrusel
    updateDisplay();
    
    // Actualizar el slider cuando cambia el tamaño de la ventana
    window.addEventListener('resize', updateDisplay);
    
    // Evento para el botón siguiente
    nextBtn.addEventListener('click', () => {
      currentIndex = (currentIndex + 1) % productCards.length;
      updateDisplay();
    });
    
    // Evento para el botón anterior
    prevBtn.addEventListener('click', () => {
      currentIndex = (currentIndex - 1 + productCards.length) % productCards.length;
      updateDisplay();
    });
    
    // Auto-rotación del carrusel (opcional - descomenta si lo deseas)
    
    let autoSlideInterval = setInterval(() => {
      currentIndex = (currentIndex + 1) % productCards.length;
      updateDisplay();
    }, 5000); // Cambia cada 5 segundos
    
    // Detener auto-rotación al interactuar con los controles
    prevBtn.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    nextBtn.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    
  });