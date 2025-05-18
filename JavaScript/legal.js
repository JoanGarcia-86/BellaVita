document.addEventListener('DOMContentLoaded', function() {
  // Seleccionar elementos
  const sidebarLinks = document.querySelectorAll('.legal-sidebar a');
  const legalSections = document.querySelectorAll('.legal-section');
  
  // Función para mostrar una sección específica
  function showSection(sectionId) {
    // Ocultar todas las secciones
    legalSections.forEach(section => {
      section.classList.remove('active');
    });
    
    // Desactivar todos los enlaces
    sidebarLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Mostrar la sección solicitada
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
      targetSection.classList.add('active');
      
      // Activar el enlace correspondiente
      const targetLink = document.querySelector(`.legal-sidebar a[href="#${sectionId}"]`);
      if (targetLink) {
        targetLink.classList.add('active');
      }
      
      // Desplazamiento suave para dispositivos móviles
      if (window.innerWidth <= 992) {
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  }
  
  // Asignar eventos a los enlaces del sidebar
  sidebarLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Obtener el ID de la sección desde el href
      const targetId = this.getAttribute('href').substring(1);
      
      // Cambiar la URL sin recargar la página
      history.pushState(null, null, `#${targetId}`);
      
      // Mostrar la sección
      showSection(targetId);
    });
  });
  
  // Cargar la sección correcta basada en el hash de la URL
  function loadSectionFromHash() {
    const hash = window.location.hash.substring(1);
    if (hash) {
      showSection(hash);
    } else {
      // Si no hay hash, mostrar la primera sección por defecto
      const firstSectionId = legalSections[0].id;
      showSection(firstSectionId);
    }
  }
  
  // Cargar sección inicial
  loadSectionFromHash();
  
  // Manejar cambios en el hash de la URL
  window.addEventListener('hashchange', loadSectionFromHash);

  // Efecto de scroll para el header
  const header = document.querySelector(".header_container");
  
  window.addEventListener("scroll", function () {
    if (window.scrollY > 10) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
  // Manejar menú desplegable
  const dropdown = document.querySelector('.dropdown');
  if (dropdown) {
    const dropdownBtn = dropdown.querySelector('.header_link');
    const dropdownContent = dropdown.querySelector('.dropdown-content');
    
    function toggleDropdown(e) {
      e.preventDefault();
      
      if (dropdownContent.classList.contains('show')) {
        dropdownContent.classList.remove('show');
        setTimeout(() => {
          dropdownContent.style.display = 'none';
        }, 200);
      } else {
        dropdownContent.style.display = 'block';
        setTimeout(() => {
          dropdownContent.classList.add('show');
        }, 10);
      }
    }
    
    function closeDropdown(e) {
      if (dropdown && !dropdown.contains(e.target)) {
        dropdownContent.classList.remove('show');
        setTimeout(() => {
          dropdownContent.style.display = 'none';
        }, 200);
      }
    }
    
    dropdownBtn.addEventListener('click', toggleDropdown);
    document.addEventListener('click', closeDropdown);
  }
});