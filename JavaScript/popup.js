// Función para mostrar el popup solo en la página index.html y solo la primera vez
document.addEventListener('DOMContentLoaded', function() {
    // Verificar si estamos en index.html
    if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname === '') {
        // Verificar si es la primera visita
        const hasVisited = localStorage.getItem('hasVisitedBellaVita');
        
        if (!hasVisited) {
            // Marcar como visitado para futuras visitas
            localStorage.setItem('hasVisitedBellaVita', 'true');
            
            // Mostrar el popup después de un breve retraso
            setTimeout(function() {
                document.getElementById('ventaja-popup').style.display = 'flex';
                
                // Ajustar layout para pantallas en modo landscape con altura reducida
                adjustPopupLayout();
            }, 2000);
        }
    }
    
    // Función para ajustar el layout en pantallas pequeñas en modo landscape
    function adjustPopupLayout() {
        const popupContent = document.querySelector('.popup-content');
        
        if (window.innerHeight <= 500 && window.innerWidth > window.innerHeight) {
            // Si estamos en modo landscape y la altura es pequeña
            if (!document.querySelector('.popup-left')) {
                // Reorganizar el contenido
                const header = document.querySelector('.popup-header');
                const imageContainer = document.querySelector('.popup-image-container');
                const message = document.querySelector('.popup-message');
                const form = document.querySelector('.popup-form');
                
                // Crear contenedores para dividir el contenido
                const left = document.createElement('div');
                left.className = 'popup-left';
                
                const right = document.createElement('div');
                right.className = 'popup-right';
                
                // Limpiar el contenido
                const closeButton = document.querySelector('.popup-close');
                popupContent.innerHTML = '';
                popupContent.appendChild(closeButton);
                
                // Reorganizar
                left.appendChild(header);
                left.appendChild(imageContainer);
                
                right.appendChild(message);
                right.appendChild(form);
                
                // Añadir al contenido
                popupContent.appendChild(left);
                popupContent.appendChild(right);
            }
        } else {
            // Si no estamos en modo landscape con altura pequeña
            if (document.querySelector('.popup-left')) {
                // Volver a la organización normal
                const left = document.querySelector('.popup-left');
                const right = document.querySelector('.popup-right');
                const closeButton = document.querySelector('.popup-close');
                
                // Limpiar el contenido
                popupContent.innerHTML = '';
                popupContent.appendChild(closeButton);
                
                // Añadir elementos en orden normal
                const children = [...left.children, ...right.children];
                children.forEach(child => {
                    popupContent.appendChild(child);
                });
            }
        }
    }
    
    // Evento para cerrar el popup
    document.getElementById('close-popup').addEventListener('click', function() {
        document.getElementById('ventaja-popup').style.display = 'none';
    });
    
    // Evento para enviar el formulario
    document.getElementById('popup-form').addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar checkboxes
        const privacyCheck = document.getElementById('privacy-policy-check');
        if (!privacyCheck.checked) {
            alert('Debes aceptar las políticas de privacidad para continuar.');
            return;
        }
        
        const email = document.getElementById('popup-email').value;
        const marketingCheck = document.getElementById('marketing-check').checked;
        
        // Aquí puedes agregar código para procesar el email
        console.log('Email suscrito:', email);
        console.log('Acepta marketing:', marketingCheck);
        
        // Mostrar mensaje de confirmación
        alert('¡Gracias por suscribirte! Tu código de descuento es: BELLAVITA10');
        
        // Cerrar el popup
        document.getElementById('ventaja-popup').style.display = 'none';
    });
    
    // Cerrar el popup haciendo clic fuera del contenido
    document.getElementById('ventaja-popup').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
    
    // Ajustar el layout cuando cambia el tamaño de la ventana
    window.addEventListener('resize', function() {
        if (document.getElementById('ventaja-popup').style.display === 'flex') {
            adjustPopupLayout();
        }
    });
});