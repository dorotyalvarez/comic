// datos.js

// Arreglo de cómics simulados con cantidad disponible y precio
var comics = [{
        id: 'twd1',
        titulo: "The Walking Dead",
        temporada: "Temporada 1",
        descripcion: "Un cómic emocionante sobre supervivencia en un apocalipsis zombie.",
        imagen: "img/cover1.png",
        cantidadDisponible: 4, // Inicialmente hay 4 unidades disponibles
        precio: 10.00 // Precio en dólares
    },
    {
        id: 'twd2',
        titulo: "Marvel Zombies",
        temporada: "Temporada 1",
        descripcion: "Los héroes de Marvel enfrentan una plaga de zombis mundo mundial.",
        imagen: "img/cover2.png",
        cantidadDisponible: 4, // Inicialmente hay 4 unidades disponibles
        precio: 12.00 // Precio en dólares
    },
    {
        id: 'twd3',
        titulo: "The Walking Dead Motion Comic",
        temporada: "Temporada 2",
        descripcion: "Los héroes de Marvel enfrentan una plaga de zombis mundo mundial.",
        imagen: "img/large.jpg",
        cantidadDisponible: 4, // Inicialmente hay 4 unidades disponibles
        precio: 15.00 // Precio en dólares
    },
    {
        id: 'twd4',
        titulo: "The Walking Dead Compendium,",
        temporada: "Volumen 1",
        descripcion: "¡Presentamos los primeros ocho volúmenes de la serie Best Seller del New York Times,",
        imagen: "img/630.jpg",
        cantidadDisponible: 4, // Inicialmente hay 4 unidades disponibles
        precio: 20.00 // Precio en dólares
    },
    // Agrega más cómics si lo deseas
];

// Guarda los datos iniciales en localStorage si no existen
if (!localStorage.getItem("comics")) {
    localStorage.setItem("comics", JSON.stringify(comics));
} else {
    comics = JSON.parse(localStorage.getItem("comics"));
}

function generarTarjetas() {
    var container = document.getElementById('comics-container');
    var html = '';

    comics.forEach(function(comic) {
        html += `
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
        <div class="card h-100" id="${comic.id}">
            <img class="card-img-top" src="${comic.imagen}" alt="${comic.titulo}">
            <div class="card-body d-flex flex-column">
                <h5 class="card-title">${comic.titulo}</h5>
                <h6 class="card-subtitle mb-2 text-muted">${comic.temporada}</h6>
                <p class="card-text">${comic.descripcion}</p>
                <p class="precio mt-auto">Precio: $${comic.precio.toFixed(2)}</p>
                <p class="cantidad-disponible">Disponibles: ${comic.cantidadDisponible}</p>
                <button class="btn btn-success btn-sm mt-2" onclick="addCart('${comic.id}')">
                    <i class="fa-solid fa-shop"></i> Comprar
                </button>
            </div>
        </div>
    </div>`;
    });

    container.innerHTML = html;
}

var cadena = localStorage.getItem("item");
var cart = JSON.parse(cadena || '[]');

function addCart(id) {
    var comic = comics.find(c => c.id === id);
    if (comic.cantidadDisponible > 0) {
        comic.cantidadDisponible--;
        cart.push(id);
        localStorage.setItem("item", JSON.stringify(cart));
        localStorage.setItem("comics", JSON.stringify(comics));
        generarTarjetas();
        actualizarCarrito();
        const toastLiveExample = document.getElementById('liveToast');
        const toastBootstrap = new bootstrap.Toast(toastLiveExample);
        toastBootstrap.show();
    } else {
        alert("No hay más unidades disponibles de este cómic.");
    }
}

function actualizarCarrito() {
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
    var cartIndex = cart.indexOf(id);
    if (cartIndex !== -1) {
        cart.splice(cartIndex, 1);
        comic.cantidadDisponible++;
        localStorage.setItem("item", JSON.stringify(cart));
        localStorage.setItem("comics", JSON.stringify(comics));
        generarTarjetas();
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

window.onload = function() {
    generarTarjetas();
    actualizarCarrito();
};