 const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.addedNodes) {
        const cartCountElement = document.querySelector('.cart-count');
        if (cartCountElement) {
          const cantidadTotal = carrito.productos.reduce((total, producto) => total + producto.cantidad, 0);
          cartCountElement.textContent = cantidadTotal.toString();
          
          if (cantidadTotal > 0) {
            cartCountElement.style.display = 'flex';
          } else {
            cartCountElement.style.display = 'none';
          }
          
          // Una vez que hemos encontrado y actualizado el contador, podemos desconectar el observador
          observer.disconnect();
        }
      }
    });
  });
  
  // Comenzar a observar las mutaciones del DOM tan pronto como sea posible
  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });
