// carrito.js

// Funciones para manejar el carrito
window.onload = function() {
    actualizarCarrito();
};

function actualizarCarrito() {
    var cadena = localStorage.getItem("item");
    var cart = JSON.parse(cadena || '[]');
    document.getElementById('cart-count').innerText = cart.length;
    renderCartItems();
    calcularTotal();
}

function renderCartItems() {
    var cart = JSON.parse(localStorage.getItem("item") || '[]');
    var comics = JSON.parse(localStorage.getItem("comics"));
    var cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';
    cart.forEach(function(cartItemId) {
        var comic = comics.find(c => c.id === cartItemId);
        if (comic) {
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item d-flex justify-content-between align-items-center';
            listItem.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${comic.imagen}" alt="${comic.titulo}" class="img-thumbnail me-3" style="max-width: 50px;">
                    <div>
                        <h5>${comic.titulo}</h5>
                        <p>${comic.descripcion}</p>
                        <p>Precio: $${comic.precio.toFixed(2)}</p>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm" onclick="removeFromCart('${comic.id}')">Eliminar</button>
            `;
            cartItemsContainer.appendChild(listItem);
        }
    });
}

function removeFromCart(id) {
    var comic = comics.find(c => c.id === id);
    var cart = JSON.parse(localStorage.getItem("item") || '[]');
    var cartIndex = cart.indexOf(id);
    if (cartIndex !== -1) {
        cart.splice(cartIndex, 1);
        comic.cantidadDisponible++;
        localStorage.setItem("item", JSON.stringify(cart));
        localStorage.setItem("comics", JSON.stringify(comics));
        actualizarCarrito();
    }
}

function calcularTotal() {
    var cart = JSON.parse(localStorage.getItem("item") || '[]');
    var comics = JSON.parse(localStorage.getItem("comics"));
    var total = 0;
    cart.forEach(function(cartItemId) {
        var comic = comics.find(c => c.id === cartItemId);
        if (comic) {
            total += comic.precio;
        }
    });
    document.getElementById('total-price').innerText = `Total: $${total.toFixed(2)}`;
}