document.addEventListener("DOMContentLoaded", function() {
  // ******** SELECCIÓN DEL ENCABEZADO ********
  const header = document.querySelector(".header_container");

  // ******** FUNCIÓN PARA CAMBIAR EL ESTILO DEL ENCABEZADO AL HACER SCROLL ********
  window.addEventListener("scroll", function() {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // ******** MENÚ DESPLEGABLE ********
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    const dropdownBtn = dropdown.querySelector('.header_link');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    // Función para mostrar/ocultar el menú al hacer clic
    function toggleDropdown(e) {
      e.preventDefault(); // Prevenir navegación al hacer clic
      
      if (dropdownContent.classList.contains('show')) {
        // Si está visible, ocultarlo
        dropdownContent.classList.remove('show');
        setTimeout(() => {
          dropdownContent.style.display = 'none';
        }, 200);
      } else {
        // Si está oculto, mostrarlo
        dropdownContent.style.display = 'block';
        setTimeout(() => {
          dropdownContent.classList.add('show');
        }, 10);
      }
    }
    
    // Cerrar el menú si se hace clic fuera de él
    function closeDropdown(e) {
      if (dropdown && !dropdown.contains(e.target)) {
        dropdownContent.classList.remove('show');
        setTimeout(() => {
          dropdownContent.style.display = 'none';
        }, 200);
      }
    }
    
    // Asignar eventos
    dropdownBtn.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdown);
  }

  // ******** CONFIGURACIÓN PARA BOTONES DE PRODUCTOS ********
  // Estos event listeners son seguros y no interfieren con el carrito global
  
  // Configurar los botones "Ver detalles" para ir a la página de detalle
  function configurarBotonesVerDetalles() {
    document.querySelectorAll('.btn-comprar').forEach(button => {
      button.addEventListener('click', function(event) {
        const card = this.closest('.producto-card');
        if (card) {
          const id = card.dataset.id;
          if (id) {
            window.location.href = `producto-detalle.html?id=${id}`;
          }
        }
      });
    });
  }
  
  // Configurar los efectos visuales para los productos
  function configurarEfectosProductos() {
    // Efecto hover para imágenes de producto
    document.querySelectorAll('.producto-imagen').forEach(imagen => {
      imagen.addEventListener('mouseover', function() {
        const img = this.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1.05)';
        }
      });
      
      imagen.addEventListener('mouseout', function() {
        const img = this.querySelector('img');
        if (img) {
          img.style.transform = 'scale(1)';
        }
      });
    });
  }
  
  // Inicializar funcionalidades de la página de productos
  configurarBotonesVerDetalles();
  configurarEfectosProductos();
});