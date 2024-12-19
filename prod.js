
  // Función para obtener los parámetros de la URL
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Función para obtener detalles de un producto
  async function fetchProductDetails(productId) {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/${productId}`);
      const product = await response.json();

      displayProductDetails(product);
    } catch (error) {
      console.error('Error al obtener los detalles del producto:', error);
    }
  }

  // Función para mostrar los detalles del producto
  function displayProductDetails(product) {
    const productImage = document.querySelector('.producto_central img');
    const productTitle = document.querySelector('.producto_datos h2');
    const productPrice = document.querySelector('.producto_datos h1');
    const productDescription = document.querySelector('.producto_datos p');

    productImage.src = product.image;
    productImage.alt = product.title;
    productTitle.textContent = product.title;
    productPrice.textContent = `$${product.price.toFixed(2)}`;
    productDescription.textContent = product.description;
  }

  // Obtener ID del producto y cargar detalles
  const productId = getQueryParam('id');
  if (productId) {
    fetchProductDetails(productId);
  } else {
    console.error('No se encontró el ID del producto en la URL.');
  }