// checkout.js

window.onload = function() {
    mostrarCarrito();
};

function mostrarCarrito() {
    var cart = JSON.parse(localStorage.getItem("item") || '[]');
    var comics = JSON.parse(localStorage.getItem("comics"));
    var cartItemsContainer = document.getElementById('checkout-items');
    var totalContainer = document.getElementById('checkout-total');
    var total = 0;

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
            `;
            cartItemsContainer.appendChild(listItem);
            total += comic.precio;
        }
    });

    totalContainer.innerText = `Total: $${total.toFixed(2)}`;
}

function finalizarCompra() {
    alert('Compra finalizada');
    localStorage.removeItem("item");
    window.location.href = 'index.html';
}