let products = [];

async function loadProducts() {
  const res = await fetch('/api/products');
  products = await res.json();
  renderProducts();
}

let products = [];
 
loadProducts();