const productos=[
    //carros
    {
        id:"Medicamento 01",
        titulo:"Ibuprofeno",
        imagen:"assets/img/medicamentos/IBUPROFENO.png",
        categoria:{
            nombre:"medicamentos",
            id:"medicamentos"
        },
        precio:5000
    },
    {
        id:"Medicamento 02",
        titulo:"Bisolvon",
        imagen:"assets/img/medicamentos/bisolvon.jpg",
        categoria:{
            nombre:"medicamentos",
            id:"medicamentos"
        },
        precio:6000
    },
    {
        id:"Medicamento 03",
        titulo:"Next",
        imagen:"assets/img/medicamentos/NEXT_20-TABS.jpg",
        categoria:{
            nombre:"medicamentos",
            id:"medicamentos"
        },
        precio:10000
    },
    {
        id:"Medicamento 04",
        titulo:"Rino",
        imagen:"assets/img/medicamentos/rino.jpg",
        categoria:{
            nombre:"medicamentos",
            id:"medicamentos"
        },
        precio:4000
    },
    {
        id:"Cuidado.p 01",
        titulo:"Crema hidratante",
        imagen:"assets/img/cuidado.p/cetaphil-004514cc_02.webp",
        categoria:{
            nombre:"cuidado.p",
            id:"cuidado.p"
        },
        precio:30000
    },
    {
        id:"Cuidado.p 02",
        titulo:"Crema para hongos",
        imagen:"assets/img/cuidado.p/hon.webp",
        categoria:{
            nombre:"cuidado.p",
            id:"cuidado.p"
        },
        precio:50000
    },
    {
        id:"Cuidado.p 03",
        titulo:"Protector solar",
        imagen:"assets/img/cuidado.p/protec.webp",
        categoria:{
            nombre:"cuidado.p",
            id:"cuidado.p"
        },
        precio:15000
    },
    {
        id:"Cuidado.p 04",
        titulo:"Jabon antiacne",
        imagen:"assets/img/cuidado.p/unnamed.jpg",
        categoria:{
            nombre:"cuidado.p",
            id:"cuidado.p"
        },
        precio:25000
    },
    {
        id:"Primeros.a 01",
        titulo:"Agua oxigenada",
        imagen:"assets/img/primeros.a/agua.jpg",
        categoria:{
            nombre:"primeros.a",
            id:"primeros.a"
        },
        precio:17000
    },
    {
        id:"Primeros.a 02",
        titulo:"Alcohol",
        imagen:"assets/img/primeros.a/alcohol.png",
        categoria:{
            nombre:"primeros.a",
            id:"primeros.a"
        },
        precio:20000
    },
    {
        id:"Primeros.a 03",
        titulo:"Apositos",
        imagen:"assets/img/primeros.a/Aposito.jpg",
        categoria:{
            nombre:"primeros.a",
            id:"primeros.a"
        },
        precio:13000
    },
    {
        id:"Primeros.a 04",
        titulo:"Vendas",
        imagen:"assets/img/primeros.a/vendas.webp",
        categoria:{
            nombre:"primeros.a",
            id:"primeros.a"
        },
        precio:16000
    },
    {
        id:"Vitaminas 01",
        titulo:"Sistema inmunologico",
        imagen:"assets/img/vitaminas/defensas.avif",
        categoria:{
            nombre:"vitaminas",
            id:"vitaminas"
        },
        precio:25000
    },
    {
        id:"Vitaminas 02",
        titulo:"proteina en polvo",
        imagen:"assets/img/vitaminas/depor.webp",
        categoria:{
            nombre:"vitaminas",
            id:"vitaminas"
        },
        precio:50000
    },
    {
        id:"Vitaminas 03",
        titulo:"Suplemento para los huesos",
        imagen:"assets/img/vitaminas/huesos.jpg",
        categoria:{
            nombre:"vitaminas",
            id:"vitaminas"
        },
        precio:30000
    },
    {
        id:"Vitaminas 04",
        titulo:"Complejo vitaminico",
        imagen:"assets/img/vitaminas/vita.jpg",
        categoria:{
            nombre:"vitaminas",
            id:"vitaminas"
        },
        precio:35000
    },
];

const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria");
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos(productosElegidos) {

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {

        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}" width="275px" height="200px">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}">Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    actualizarBotonesAgregar();
};

cargarProductos(productos);

botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;
            const productosBoton = productos.filter(producto => producto.categoria.id === e.currentTarget.id);
            cargarProductos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProductos(productos);
        }

    })
});

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar");

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

let productosEnCarrito;

let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
} else {
    productosEnCarrito = [];
}

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosEnCarrito.some(producto => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(producto => producto.id === idBoton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
}

function actualizarNumerito() {
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}
