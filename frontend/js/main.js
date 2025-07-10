// Sample product data (in real app, this will come from backend)
const products = [
  { id: 1, name: "Product A", price: 100, description: "Awesome A" },
  { id: 2, name: "Product B", price: 200, description: "Better B" },
];

// 🟢 Render product listing on index.html
const productList = document.getElementById("product-list");

if (productList) {
  products.forEach((p) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p>Price: ₹${p.price}</p>
      <a href="product.html?id=${p.id}">View Details</a>
    `;
    productList.appendChild(div);
  });
}

// 🟢 Render individual product on product.html
const productDetails = document.getElementById("product-details");

if (productDetails) {
  const urlParams = new URLSearchParams(window.location.search);
  const id = parseInt(urlParams.get("id"));
  const product = products.find((p) => p.id === id);

  if (product) {
    productDetails.innerHTML = `
      <h2>${product.name}</h2>
      <p>${product.description}</p>
      <p>Price: ₹${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
  } else {
    productDetails.innerHTML = "<p>Product not found.</p>";
  }
}

// 🟢 Add product to cart (stored in localStorage)
function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find((p) => p.id === productId);

  if (product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Added to cart!");
  }
}

// 🟢 Render cart items on cart.html
const cartItemsContainer = document.getElementById("cart-items");

if (cartItemsContainer) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const div = document.createElement("div");
      div.innerHTML = `
        <h4>${item.name}</h4>
        <p>₹${item.price}</p>
        <button onclick="removeFromCart(${index})">Remove</button>
      `;
      cartItemsContainer.appendChild(div);
    });

    const totalDiv = document.createElement("div");
    totalDiv.innerHTML = `<h3>Total: ₹${total}</h3>`;
    cartItemsContainer.appendChild(totalDiv);
  }
}

// 🟢 Remove item from cart
function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  location.reload();
}

// 🟢 Checkout button
function checkout() {
  localStorage.removeItem("cart");
  alert("Order placed! Cart cleared.");
  location.href = "index.html";
}
