// Call API for All products 
const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
  // .then((data) => console.log(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    // Show All Products 
    const image = product.image;
    const rating = product.rating;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product shadow-sm m-1 my-3">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p class="text-success">Rating : ${rating.rate} / 5 & ${rating.count} Reviews</p>
      <h2>Price: $ ${product.price}</h2>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button onclick="loadProduct(${product.id})" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"> Details </button>
      </div>
      `;
    document.getElementById("all-products").appendChild(div);

  }
};

// Call API for Single products 
const loadProduct = (pId) => {
  // console.log(pId);
  fetch(`https://fakestoreapi.com/products/${pId}`)
    .then(res => res.json())
    .then(json => showSingleProduct(json));
  document.getElementById("modal-body").textContent = '';
}
// show Single product in Modal
const showSingleProduct = (product) => {
  const image = product.image;
  const rating = product.rating;
  const div = document.createElement("div");
  div.textContent = '';
  div.classList.add("product");
  div.innerHTML = `<div class="single-product text-center">
      <div>
    <img class="product-image" src=${image}></img>
      </div>
      <h4>${product.title}</h4>
      <p>Category: ${product.category}</p>
      <p class="text-success">Rating : ${rating.rate} / 5 & ${rating.count} Reviews</p>
      <h2>Price: $ ${product.price}</h2>      
      <p><span class="fw-bold text-info">Description:</span><br> ${product.description}</p>
      `;
  document.getElementById("modal-body").appendChild(div);
}


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
  updateTotal();
};
const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = convertedOldPrice + convertPrice;
  document.getElementById(id).innerText = total.toFixed(2);
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = value.toFixed(2);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", priceConverted * 0.2);
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", priceConverted * 0.3);
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", priceConverted * 0.4);
  }
};

//grandTotal update function
const updateTotal = () => {
  const grandTotal = getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  document.getElementById("total").innerText = grandTotal.toFixed(2);
};