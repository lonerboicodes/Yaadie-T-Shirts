// Author: Devany Walker
// ID#: 2300064
// Occurence: UM2 
    


document.addEventListener('DOMContentLoaded', function() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            const productItem = {
                id: productId,
                name: this.previousElementSibling.previousElementSibling.previousElementSibling.innerText,
                price: parseFloat(this.previousElementSibling.previousElementSibling.innerText.replace('Estimated Cost: $', '')),
                quantity: 1,
                image: this.parentNode.querySelector('img').src
            };
            addToCart(productItem);
        });
    });
});

function addToCart(item) {
    const cartItems = loadCartItems();
    const existingItem = cartItems.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
        existingItem.quantity += item.quantity;
    } else {
        cartItems.push(item);
    }

    saveCartItems(cartItems);
    alert('Item added to cart!');
}

function loadCartItems() {
    const items = localStorage.getItem('cartItems');
    return items ? JSON.parse(items) : [];
}

function saveCartItems(items) {
    localStorage.setItem('cartItems', JSON.stringify(items));
}
