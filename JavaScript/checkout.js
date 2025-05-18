 document.addEventListener('DOMContentLoaded', function() {
      // Efecto de scroll para el header
      const header = document.querySelector(".header_container");
      
      window.addEventListener("scroll", function() {
        if (window.scrollY > 10) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      });
      
      // Generar un número de pedido aleatorio
      function generarNumeroPedido() {
        const randomNumber = Math.floor(Math.random() * 900000) + 100000; // 6 dígitos
        return `${randomNumber}`;
      }
      
      // Actualizar la fecha actual
      function obtenerFechaActual() {
        const fecha = new Date();
        const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
        return fecha.toLocaleDateString('es-ES', opciones);
      }
      
      // Calcular fecha estimada de entrega (3-5 días desde hoy)
      function obtenerFechaEntrega() {
        const fecha = new Date();
        const entregaMin = new Date(fecha);
        const entregaMax = new Date(fecha);
        
        entregaMin.setDate(fecha.getDate() + 3);
        entregaMax.setDate(fecha.getDate() + 5);
        
        const opcionesDia = { day: 'numeric' };
        const opcionesMes = { month: 'long' };
        
        // Si es el mismo mes
        if (entregaMin.getMonth() === entregaMax.getMonth()) {
          return `${entregaMin.toLocaleDateString('es-ES', opcionesDia)}-${entregaMax.toLocaleDateString('es-ES', opcionesDia)} de ${entregaMin.toLocaleDateString('es-ES', opcionesMes)} de ${entregaMin.getFullYear()}`;
        } else {
          return `${entregaMin.toLocaleDateString('es-ES', opcionesDia)} de ${entregaMin.toLocaleDateString('es-ES', opcionesMes)} - ${entregaMax.toLocaleDateString('es-ES', opcionesDia)} de ${entregaMax.toLocaleDateString('es-ES', opcionesMes)} de ${entregaMin.getFullYear()}`;
        }
      }
      
      // Métodos de pago posibles
      const metodosPago = ['Tarjeta de crédito', 'PayPal', 'Transferencia bancaria'];
      
      // Obtener método de pago aleatorio (o se podría obtener de sessionStorage si fuera necesario)
      function obtenerMetodoPago() {
        const randomIndex = Math.floor(Math.random() * metodosPago.length);
        return metodosPago[randomIndex];
      }
      
      // Actualizar la información del pedido con datos dinámicos
      document.getElementById('order-number').textContent = generarNumeroPedido();
      document.getElementById('order-date').textContent = obtenerFechaActual();
      document.getElementById('payment-method').textContent = obtenerMetodoPago();
      document.getElementById('estimated-delivery').textContent = obtenerFechaEntrega();
    });