// responsive.js - Funcionalidades para el diseño responsive de BellaVita

document.addEventListener('DOMContentLoaded', function() {
    // ===== MENÚ MÓVIL =====
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    const closeMenu = document.getElementById('close-mobile-menu');
    const submenuToggles = document.querySelectorAll('.submenu-toggle');
    
    // Función para abrir el menú móvil
    function openMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.add('open');
            if (overlay) {
                overlay.classList.add('open');
            }
            document.body.style.overflow = 'hidden'; // Prevenir scroll
        }
    }
    
    // Función para cerrar el menú móvil
    function closeMobileMenu() {
        if (mobileMenu) {
            mobileMenu.classList.remove('open');
            if (overlay) {
                overlay.classList.remove('open');
            }
            document.body.style.overflow = ''; // Restaurar scroll
            
            // Cerrar todos los submenús cuando se cierra el menú
            document.querySelectorAll('.mobile-submenu.open').forEach(submenu => {
                submenu.classList.remove('open');
                
                // También resetear los símbolos +/- en los botones
                const toggle = submenu.previousElementSibling;
                if (toggle && toggle.classList.contains('submenu-toggle')) {
                    toggle.textContent = '+';
                }
            });
        }
    }
    
    // Evento para abrir el menú con el botón hamburguesa
    if (menuToggle) {
        menuToggle.addEventListener('click', openMobileMenu);
    }
    
    // Evento para cerrar el menú con el botón X
    if (closeMenu) {
        closeMenu.addEventListener('click', closeMobileMenu);
    }
    
    // Evento para cerrar el menú al hacer clic en el overlay
    if (overlay) {
        overlay.addEventListener('click', closeMobileMenu);
    }
    
    // Manejo de submenús (como el dropdown de PRODUCTOS)
    submenuToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            const submenu = this.nextElementSibling;
            if (submenu && submenu.classList.contains('mobile-submenu')) {
                submenu.classList.toggle('open');
                this.textContent = submenu.classList.contains('open') ? '-' : '+';
            }
        });
    });
    
    // Cerrar el menú móvil si la ventana se redimensiona a un tamaño grande
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992 && mobileMenu && mobileMenu.classList.contains('open')) {
            closeMobileMenu();
        }
    });
    
    // ===== MEJORAS RESPONSIVE ADICIONALES =====
    
    // Ajustes para el slider principal en dispositivos móviles
    const mainPortada = document.querySelector('.main_portada');
    if (mainPortada) {
        // Ajustar posición de textos para mejor visibilidad
        function adjustHeroContent() {
            const textoPortada = document.querySelector('.texto_portada');
            const infoProducto = document.querySelector('.info_producto');
            
            if (window.innerWidth <= 767) {
                // Versión móvil: textos más legibles y mejor posicionados
                if (textoPortada) {
                    textoPortada.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.5)';
                }
                
                if (infoProducto) {
                    infoProducto.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.5)';
                }
            } else {
                // Restaurar para desktop
                if (textoPortada) {
                    textoPortada.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)';
                }
                
                if (infoProducto) {
                    infoProducto.style.textShadow = '2px 2px 5px rgba(0, 0, 0, 0.3)';
                }
            }
        }
        
        // Realizar ajustes iniciales
        adjustHeroContent();
        
        // Reajustar cuando cambia el tamaño de la ventana
        window.addEventListener('resize', adjustHeroContent);
    }
    
    // Ajustes para las tarjetas de antes/después
    const tarjetasComparacion = document.querySelectorAll('.tarjeta-comparacion');
    if (tarjetasComparacion.length > 0) {
        // Evitar que el efecto de revelación sea demasiado sensible en móviles
        function adjustRevealEffect() {
            tarjetasComparacion.forEach(tarjeta => {
                if (window.innerWidth <= 767) {
                    // En móviles, hacer click para revelar completamente
                    tarjeta.dataset.mobileView = 'true';
                } else {
                    // En desktop, mantener comportamiento normal
                    tarjeta.dataset.mobileView = 'false';
                }
            });
        }
        
        // Aplicar ajustes iniciales
        adjustRevealEffect();
        
        // Reajustar cuando cambia el tamaño de la ventana
        window.addEventListener('resize', adjustRevealEffect);
    }
    
    // Mostrar/ocultar elementos según el tamaño de pantalla (helper function)
    function showForScreenSize(elements, minWidth, maxWidth) {
        if (!elements) return;
        
        const width = window.innerWidth;
        const elementsArray = Array.isArray(elements) ? elements : [elements];
        
        elementsArray.forEach(el => {
            if ((minWidth === null || width >= minWidth) && 
                (maxWidth === null || width <= maxWidth)) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    }
});