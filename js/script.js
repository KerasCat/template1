const cartItemsList = document.getElementById('product-holder');
const wishlist = document.getElementById('wishlist-holder');
const totalPriceSpan = document.getElementById('total-price');
const counter1 = document.getElementById('cartitem1');
const counter2 = document.getElementById('cartitem2');
const wish_counter1 = document.getElementById('wishitem1');
const wish_counter2 = document.getElementById('wishitem2');

let cart, wish;

const data = [
    {
        "id": 1,
        "name": "Syltherine",
        "price": 2500
    },
    {
        "id": 2,
        "name": "Leviosa",
        "price": 2500
    },
    {
        "id": 3,
        "name": "Lolito",
        "price": 7000
    },
    {
        "id": 4,
        "name": "Respira",
        "price": 500
    },
    {
        "id": 5,
        "name": "Grifo",
        "price": 1500
    },
    {
        "id": 6,
        "name": "Muggo",
        "price": 150
    },
    {
        "id": 7,
        "name": "Pingky",
        "price": 7000
    },
    {
        "id": 8,
        "name": "Potty",
        "price": 500
    }
];


function toggleNavbar() { document.getElementsByClassName('collapse-navbar').item(0).classList.toggle('top-0'); }
function toggleCart() {
    document.getElementsByClassName('CART').item(0).classList.toggle('cart-active');
}
function toggleWish() {
    document.getElementsByClassName('WISHLIST').item(0).classList.toggle('wish-active');
}
function toggleSearch() {
    document.getElementsByClassName('searchbox').item(0).classList.toggle('d-none');
}


// To initialize the cart and wishlist upon DOM on Load
document.addEventListener("DOMContentLoaded", (event) => {
    event.preventDefault();
    const storedCart = localStorage.getItem('cart');
    const storedWish = localStorage.getItem('wish');

    if (storedCart && storedCart !== '[]') {
        cart = JSON.parse(storedCart);
    } else {
        cart = [];
    }
    if (storedWish && storedWish !== '[]') {
        wish = JSON.parse(storedWish);
    } else {
        wish = [];
    }
    updateCartDisplay();
    updateWishlistDisplay();
});

function removeFromCart(id) {
    const itemIndex = cart.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        cart.splice(itemIndex, 1);
        updateCartDisplay();
    } else {
        console.error("Item not found in cart");
    }
}
function removeFromWishlist(id) {
    const itemIndex = wish.findIndex(item => item.id === id);
    if (itemIndex > -1) {
        wish.splice(itemIndex, 1);
        updateWishlistDisplay();
    } else {
        console.error("Item not found in wishlist");
    }
}

function reduceFromCart(id) {
    const productInCart = cart.find(item => item.id === id);
    if (productInCart) {
        if (productInCart.quantity > 1) {
            productInCart.quantity--;
        } else {
            removeFromCart(id);
        }
        updateWishlistDisplay();
    } else {
        console.error("Product not found in cart");
    }
}

function updateCartDisplay() {
    cartItemsList.innerHTML = '';
    let totalPrice = 0;

    cart.forEach(item => {
        const cartItem = createCartItem(item.name, item.price, item.quantity);
        cartItemsList.appendChild(cartItem);
        totalPrice += item.price * item.quantity;
    });

    totalPriceSpan.textContent = `$${totalPrice.toFixed(2)}`;
    localStorage.setItem('cart', JSON.stringify(cart));
    counter1.innerHTML = cart.length;
    counter2.innerHTML = cart.length;
}
function updateWishlistDisplay() {
    wishlist.innerHTML = '';

    wish.forEach(item => {
        const cartItem = createWishItem(item.name, item.price, item.quantity);
        wishlist.appendChild(cartItem);
    });
    localStorage.setItem('wish', JSON.stringify(wish));
    wish_counter1.innerHTML = wish.length;
    wish_counter2.innerHTML = wish.length;
}

function createCartItem(itemName, itemPrice, itemQuantity = 1) {
    const product = data.find((item) => item.name === itemName);
    const cartItem = document.createElement('li');
    cartItem.id = product.id;
    cartItem.className = 'list-unstyled d-flex flex-column p-2 rounded-4 border bg-secondary border-dark-subtle';

    const header = document.createElement('h5');
    header.textContent = ``;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'font-poppins fw-semibold';
    nameSpan.textContent = itemName;
    header.appendChild(nameSpan);

    const headerPrice = document.createElement('h4');
    headerPrice.textContent = `Price: $${itemPrice.toFixed(2)}`;

    const quantityDiv = document.createElement('div');
    quantityDiv.className = 'd-flex gap-2';

    const quantityParagraph = document.createElement('p');
    quantityParagraph.className = 'fw-semibold';
    quantityParagraph.textContent = `Quantity- `;

    const quantitySpan = document.createElement('span');
    quantitySpan.textContent = itemQuantity;
    quantityParagraph.appendChild(quantitySpan);

    const buttonPlus = document.createElement('button');
    buttonPlus.className = 'm-auto btn bg-primary font-secondary';
    buttonPlus.textContent = '+';
    buttonPlus.onclick = () => {
        addToCart(product.id);
    };

    const buttonMinus = document.createElement('button');
    buttonMinus.className = 'm-auto btn bg-primary font-secondary';
    buttonMinus.textContent = '-';
    buttonMinus.onclick = () => {
        reduceFromCart(product.id);
        updateCartDisplay();
    };

    const buttonRemove = document.createElement('button');
    buttonRemove.className = 'm-auto btn btn-danger font-secondary';
    buttonRemove.textContent = 'Remove';
    buttonRemove.onclick = () => {
        removeFromCart(product.id);
        updateCartDisplay();
    };


    quantityDiv.appendChild(quantityParagraph);
    quantityDiv.appendChild(buttonPlus);
    quantityDiv.appendChild(buttonMinus);
    quantityDiv.appendChild(buttonRemove);

    cartItem.appendChild(header);
    cartItem.appendChild(headerPrice);
    cartItem.appendChild(quantityDiv);

    return cartItem;

}
function createWishItem(itemName, itemPrice) {
    const product = data.find((item) => item.name === itemName);
    const wishItem = document.createElement('li');
    wishItem.id = product.id;
    wishItem.className = 'list-unstyled d-flex flex-column p-2 rounded-4 border bg-secondary border-dark-subtle';

    const header = document.createElement('h5');
    header.textContent = `Item Name - `;

    const nameSpan = document.createElement('span');
    nameSpan.className = 'font-poppins fw-semibold';
    nameSpan.textContent = itemName;
    header.appendChild(nameSpan);

    const headerPrice = document.createElement('h4');
    headerPrice.textContent = `Price: $${itemPrice.toFixed(2)}`;



    const buttonRemove = document.createElement('button');
    buttonRemove.className = 'm-auto btn btn-danger font-secondary';
    buttonRemove.textContent = 'Remove';
    buttonRemove.onclick = () => {
        removeFromWishlist(product.id);
        updateWishlistDisplay();
    };

    const quantityDiv = document.createElement('div');
    quantityDiv.className = 'd-flex gap-2';

    quantityDiv.appendChild(buttonRemove);

    wishItem.appendChild(header);
    wishItem.appendChild(headerPrice);
    wishItem.appendChild(quantityDiv);
    
    return wishItem;

}

function isItemInCart(itemId) {
    return cart.some(item => item.id === itemId);
}
function isItemInWishlist(itemId) {
    return wish.some(item => item.id === itemId);
}

function addToCart(id) {
    const cartDiv = document.getElementById('product-holder');
    const product = data.find((item) => item.id === id);
    console.log("Product Added " + product.name)
    if (isItemInCart(id)) {
        const existingCartItem = cart.find(cartItem => cartItem.id === product.id);
        existingCartItem.quantity++;
        updateCartDisplay();
    }
    else {
        const cartItem = createCartItem(product.name, product.price, product.quantity);
        cartDiv.appendChild(cartItem);
        cart.push({ ...product, quantity: 1 });
        updateCartDisplay();
    }
    

}
function addToWishlist(id) {

    const product = data.find((item) => item.id === id);
    console.log("Product Added " + product.name)
    if (isItemInWishlist(id)) {
        alert("Item Already in List")
    }
    else {
        // create createfunction on wishlist
        const wishItem = createWishItem(product.name, product.price, product.quantity);


        wishlist.append(wishItem);
        
        wish.push(product);
        updateWishlistDisplay();
    }
    // addItemsToCart(product);

}