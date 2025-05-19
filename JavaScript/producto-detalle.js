document.addEventListener("DOMContentLoaded", function() {
  // ******** ELEMENTOS DEL CARRITO ********
  // Este archivo está destinado a manejar el carrito en la página de detalle de producto
  
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

  // ******** FUNCIONALIDAD DE DETALLE DE PRODUCTO ********
  // Obtener parámetros de la URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');

  // Elementos de la página
  const productoImagen = document.getElementById('producto-imagen');
  const productoNombre = document.getElementById('producto-nombre');
  const productoPrecio = document.getElementById('producto-precio');
  const productoVolumen = document.getElementById('producto-volumen');
  const productoDescripcion = document.getElementById('producto-descripcion-texto');
  const productoIngredientes = document.getElementById('producto-ingredientes-texto');
  const productoUso = document.getElementById('producto-uso-texto');

  // Variable para almacenar el producto actual (global para que esté disponible para carrito-global.js)
  window.productoActual = null;
  
  // Base de datos de productos (utilizando los textos exactos de los PDFs)
  const productos = [
    {
      id: "7",
      nombre: "Mascarilla POR ELLAS",
      precio: 22.90,
      volumen: "250ml",
      imagen: "./Assets/Imagenes/mascarilla-lila.jpg",
      descripcion: "Mascarilla capilar, diseñada para nutrir y proteger las puntas del cabello. Formulada con ingredientes naturales, proporciona hidratación profunda, dejando el pelo suave y radiante durante todo el día. Ideal para todo tipo de cabellos. Ideal para pelo seco o dañado.",
      ingredientes: "Aceite de coco virgen ecológico, manteca de karité orgánica, aloe vera puro aceite de argán bio, extracto de romero, miel ecológica, vitamina E natural.",
      uso: "Aplicar sobre el cabello húmedo, de medios a puntas. Dejar actuar entre 5 y 10 minutos y aclarar con abundante agua. Para una reparación intensiva, dejar actuar 20 minutos con el cabello envuelto en una toalla."
    },
    {
      id: "5",
      nombre: "Sérum POR ELLAS",
      precio: 25.99,
      volumen: "30ml",
      imagen: "./Assets/Imagenes/Botellin 1.png",
      descripcion: "Este sérum capilar orgánico está formulado con ingredientes naturales que revitalizan tu melena desde la raíz hasta las puntas. Aporta hidratación profunda, fortalece la fibra capilar y combate el encrespamiento sin dejar residuos grasos. Ideal para todo tipo de cabello, incluso el más sensible. Notarás un cabello más suave, brillante y saludable desde la primera aplicación.",
      ingredientes: "Aceite de argán orgánico: rico en vitamina E, aceite de jojoba, extracto de aloe vera, vitamina E natural (tocoferol), aceite esencial de romero y aceite de coco fraccionado.",
      uso: "Aplica 2–3 gotas sobre la palma de la mano y frótalas ligeramente, distribuye el sérum de medios a puntas, sobre el cabello limpio y húmedo o seco, no enjuagar, peina como de costumbre, úsalo diariamente o según necesidad, especialmente después del lavado o antes del peinado con calor."
    },
    {
      id: "6",
      nombre: "Champú POR ELLAS",
      precio: 22.99,
      volumen: "250ml",
      imagen: "./Assets/Imagenes/champu-lila.png",
      descripcion: "Formulado con ingredientes de origen vegetal, este champú limpia suavemente el cuero cabelludo sin sulfatos ni parabenos. Su combinación de extractos botánicos fortalece el cabello desde la raíz, aporta brillo natural y mantiene el equilibrio del pH. Ideal para uso diario y apto para todo tipo de cabello, incluso los más sensibles",
      ingredientes: "Aloe vera orgánico, aceite de coco virgen, extracto de romero, manzanilla, proteína de trigo y aceite esencial de lavanda.",
      uso: "Aplicar sobre el cabello mojado, masajear suavemente el cuero cabelludo con la yema de los dedos hasta formar una espuma ligera. Aclarar con abundante agua. Repetir si es necesario. Para mejores resultados, combinar con un acondicionador orgánico de la misma línea."
    },
    {
      id: "4",
      nombre: "Mascarilla BellaVita",
      precio: 20.90,
      volumen: "250ml",
      imagen: "./Assets/Imagenes/mascarilla-verde.jpg",
      descripcion: "Mascarilla capilar, diseñada para nutrir y proteger las puntas del cabello. Formulada con ingredientes naturales, proporciona hidratación profunda, dejando el pelo suave y radiante durante todo el día. Ideal para todo tipo de cabellos. Ideal para pelo seco o dañado.",
      ingredientes: "Aceite de coco virgen ecológico, manteca de karité orgánica, aloe vera puro aceite de argán bio, extracto de romero, miel ecológica, vitamina E natural.",
      uso: "Aplicar sobre el cabello húmedo, de medios a puntas. Dejar actuar entre 5 y 10 minutos y aclarar con abundante agua. Para una reparación intensiva, dejar actuar 20 minutos con el cabello envuelto en una toalla."
    },
    {
      id: "1",
      nombre: "Sérum orgánico BellaVita",
      precio: 22.99,
      volumen: "30ml",
      imagen: "./Assets/Imagenes/serum_verde.png",
      descripcion: "Este sérum capilar orgánico está formulado con ingredientes naturales que revitalizan tu melena desde la raíz hasta las puntas. Aporta hidratación profunda, fortalece la fibra capilar y combate el encrespamiento sin dejar residuos grasos. Ideal para todo tipo de cabello, incluso el más sensible. Notarás un cabello más suave, brillante y saludable desde la primera aplicación.",
      ingredientes: "Aceite de argán orgánico: rico en vitamina E, aceite de jojoba, extracto de aloe vera, vitamina E natural (tocoferol), aceite esencial de romero y aceite de coco fraccionado.",
      uso: "Aplica 2–3 gotas sobre la palma de la mano y frótalas ligeramente, distribuye el sérum de medios a puntas, sobre el cabello limpio y húmedo o seco, no enjuagar, peina como de costumbre, úsalo diariamente o según necesidad, especialmente después del lavado o antes del peinado con calor."
    },
    {
      id: "3",
      nombre: "Champú orgánico BellaVita",
      precio: 17.09,
      precioOriginal: 18.99,
      enPromocion: true,
      descuento: "-10%",
      volumen: "250ml",
      imagen: "./Assets/Imagenes/Champú.png",
      descripcion: "Formulado con ingredientes de origen vegetal, este champú limpia suavemente el cuero cabelludo sin sulfatos ni parabenos. Su combinación de extractos botánicos fortalece el cabello desde la raíz, aporta brillo natural y mantiene el equilibrio del pH. Ideal para uso diario y apto para todo tipo de cabello, incluso los más sensibles",
      ingredientes: "Aloe vera orgánico, aceite de coco virgen, extracto de romero, manzanilla, proteína de trigo y aceite esencial de lavanda.",
      uso: "Aplicar sobre el cabello mojado, masajear suavemente el cuero cabelludo con la yema de los dedos hasta formar una espuma ligera. Aclarar con abundante agua. Repetir si es necesario. Para mejores resultados, combinar con un acondicionador orgánico de la misma línea."
    },
    {
      id: "2",
      nombre: "Acondicionador orgánico BellaVita",
      precio: 16.99,
      precioOriginal: 19.99,
      enPromocion: true,
      descuento: "-15%",
      volumen: "250ml",
      imagen: "./Assets/Imagenes/Crema 1.png",
      descripcion: "Hidrata, suaviza y repara tu cabello con ingredientes 100% naturales. Su fórmula orgánica, libre de sulfatos y siliconas, desenreda fácilmente y deja el cabello sedoso, brillante y protegido. Ideal para todo tipo de cabello, incluso el más sensible.",
      ingredientes: "Aceite de coco orgánico, manteca de karité, aloe vera, extracto de avena, aceites esenciales (lavanda y romero), conservantes naturales como sorbato de potasio y benzoato de sodio.",
      uso: "Después del lavado, aplica una cantidad moderada de medios a puntas sobre el cabello húmedo. Deja actuar de 2 a 5 minutos y aclara con abundante agua. Para un extra de nutrición, déjalo actuar más tiempo como mascarilla."
    },
    {
      id: "8",
      nombre: "Crema selladora orgánica BellaVita",
      precio: 24.00,
      volumen: "50ml",
      imagen: "./Assets/Imagenes/producto-mano.jpeg",
      descripcion: "Repara, protege y sella las puntas abiertas con nuestra crema orgánica elaborada con aceites vegetales y extractos naturales. Su fórmula ligera nutre en profundidad sin apelmazar, aportando suavidad, brillo y un acabado sedoso. Ideal para cabellos secos, dañados o con tendencia al encrespamiento. Sin siliconas, sin sulfatos, 100% vegana.",
      ingredientes: "Aceite de argán orgánico, aceite de jojoba: hidrata y regula el sebo, manteca de karité, extracto de aloe vera y agua de flor de manzanilla.",
      uso: "Aplicar una pequeña cantidad sobre las puntas secas o húmedas, después del lavado y antes de peinar. Repartir uniformemente con las yemas de los dedos para sellar y proteger las puntas abiertas. Se puede usar diariamente o según necesidad."
    }
  ];

  // Buscar el producto por su ID
  function encontrarProducto() {
    return productos.find(p => p.id === productId) || productos[0]; // Por defecto mostrar el primer producto si no se encuentra
  }

  // Cargar los detalles del producto en la página
  function cargarDetallesProducto() {
    window.productoActual = encontrarProducto();
    
    // Actualizar elementos de la página
    document.title = `${window.productoActual.nombre} | BellaVita`;
    productoImagen.src = window.productoActual.imagen;
    productoImagen.alt = window.productoActual.nombre;
    productoNombre.textContent = window.productoActual.nombre;
    
    // Comprobar si es un producto en promoción para mostrar el precio correctamente
    if (window.productoActual.enPromocion) {
      productoPrecio.innerHTML = `
        <span class="precio-antiguo">${window.productoActual.precioOriginal.toFixed(2)}€</span>
        <span>${window.productoActual.precio.toFixed(2)}€</span>
        <span class="badge-descuento">${window.productoActual.descuento}</span>
      `;
    } else {
      productoPrecio.textContent = `${window.productoActual.precio.toFixed(2)}€`;
    }
    
    productoVolumen.textContent = window.productoActual.volumen;
    productoDescripcion.textContent = window.productoActual.descripcion;
    productoIngredientes.textContent = window.productoActual.ingredientes;
    productoUso.textContent = window.productoActual.uso;

    aplicarEstilosTipoProducto();
  }

  // Aplicar estilos según el tipo de producto (POR ELLAS, promoción, etc.)
  function aplicarEstilosTipoProducto() {
    const body = document.getElementById('producto-detalle-body');
    
    // Limpiar clases previas
    body.classList.remove('por-ellas-producto', 'promo-producto');
    
    // Verificar si es un producto POR ELLAS
    if (window.productoActual.nombre.includes('POR ELLAS')) {
      body.classList.add('por-ellas-producto');
    }
    
    // Verificar si es un producto en promoción
    if (window.productoActual.enPromocion) {
      body.classList.add('promo-producto');
    }
  }

  // Funcionalidad para compartir
  const compartirBtn = document.querySelector('.compartir-btn');
  if (compartirBtn) {
    compartirBtn.addEventListener('click', function() {
      if (navigator.share) {
        // Web Share API está disponible
        navigator.share({
          title: document.title,
          url: window.location.href
        })
        .catch(error => console.error('Error al compartir:', error));
      } else {
        // Fallback si Web Share API no está disponible
        alert('Enlace copiado: ' + window.location.href);
        // Copiar al portapapeles
        const dummy = document.createElement('input');
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand('copy');
        document.body.removeChild(dummy);
      }
    });
  }

  // Inicializar la página de detalle
  cargarDetallesProducto();
});