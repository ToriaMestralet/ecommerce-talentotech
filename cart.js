 src="https://cdn.jsdelivr.net/npm/sweetalert2@11"
  //cargar el carrito desde localStorage
  function loadCart() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const carritoProductos = document.getElementById('carrito_productos');

    // Verificar que el contenedor exista
    if (!carritoProductos) {
      console.error('Contenedor del carrito no encontrado.');
      return;
    }

    //limpiar contenido
    carritoProductos.innerHTML = '';

    //mostrar productos
    cart.forEach((product, index) => {
      const card = document.createElement('div');
      card.classList.add('minicard_carrito');

      card.innerHTML = `
        <img src="${product.image}" alt="${product.title}" style = "maxWidth:60px">
        <div class="datos_minicard">
          <h4>${product.title}</h4>
        </div>
        <h3>${product.price}</h3>
        <button class="btn_eliminar" data-index="${index}">Eliminar</button>
      `;

      carritoProductos.appendChild(card);
    });

    updateSubtotal(cart);
    updateTotal(cart);
  }

  //calcular el subtotal
  function updateSubtotal(cart) {
    const subtotal = cart.reduce((sum, product) => sum + parseFloat(product.price.replace('$', '')), 0);
    const subtotalElement = document.querySelector('.subtotal_carrito h2');
   printLn("tengo subtotal");

    //verificar que el elemento exista
    if (!subtotalElement) {
      console.error('Elemento de subtotal no encontrado.');
      return;
    }

    subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
  }

  //calcular el total
  function updateTotal(cart) {
    const subtotal = cart.reduce((sum, product) => sum + parseFloat(product.price.replace('$', '')), 0);
    const envio = 50; // Precio fijo del envío
    const total = subtotal + envio;
    const totalElement = document.querySelector('.total_carrito h1');

    //verificar que el elemento exista
    if (!totalElement) {
      console.error('Elemento de total no encontrado.');
      return;
    }

    totalElement.textContent = `$${total.toFixed(2)}`;
  }

  //eliminar un producto del carrito
  function deleteFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.splice(index, 1);

    //actualizar carrito en localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    //recargar el carrito
    loadCart();
  }

  // SweetAlert al finalizar compra -revisar
  function finalizarCompra() {
   alert("Tu compra fue realizada con exito!");
    /*Swal.fire({
      title: '¡Compra realizada!',
      text: 'Gracias por tu compra. Tu pedido está en proceso.',
      icon: 'success',
      confirmButtonText: 'Aceptar'
    }).then(() => {
      //vaciar carrito después de la compra
      localStorage.removeItem('cart');
      loadCart();
    });*/
  }

  //evento al botón de comprar
  const btnFinalizar = document.querySelector('.btn_primario');
  if (btnFinalizar) {
    btnFinalizar.addEventListener('click', finalizarCompra);
  } else {
    console.error('Botón de finalizar compra no encontrado.');
  }

  //evento eliminar producto
  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn_eliminar')) {
      const index = event.target.dataset.index;
      deleteFromCart(index);
    }
  });

  //cargar carrito
  loadCart();
