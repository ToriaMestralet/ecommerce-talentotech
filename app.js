
 
  // obtener productos de la API
  async function fetchProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const products = await response.json();

      renderProducts(products);
    } catch (error) {
      console.error('Error al obtener los productos:', error);
    }
  }

  //renderizar productos en la sección de cards
function renderProducts(products) {
  const slider = document.querySelector('.slider'); // Contenedor de las cards
  slider.innerHTML = ''; // Limpiar

  products.forEach((product) => {
    const card = document.createElement('div');
    card.classList.add('card_producto');

    card.innerHTML = `
      <a href="producto.html?id=${product.id}">
        <img src="${product.image}" alt="${product.title}">
      </a>
      <p>${product.title}</p>
      <p>$${product.price.toFixed(2)}</p>
    `;

    slider.appendChild(card);
  });
}

  //cargar productos
  fetchProducts();