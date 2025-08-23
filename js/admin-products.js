import { formatDate } from "./date-utils.js";

const games = [
    {
        id: 1,
        name: "The Legend of Zelda: Breath of the Wild",
        image:
        "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
        price: 59.99,
        category: "Action",
        description:
        "An open-world action-adventure game set in a vast, post-apocalyptic world where players control Link to defeat Calamity Ganon and save Princess Zelda.",
        createdAt: "2023-10-01T12:00:00Z",
    }, // 0
    {
        id: 2,
        name: "Super Mario Odyssey",
        image:
        "https://assets.nintendo.com/image/upload/f_auto/q_auto/dpr_1.5/c_scale,w_400/ncom/software/switch/70010000001130/c42553b4fd0312c31e70ec7468c6c9bccd739f340152925b9600631f2d29f8b5",
        price: 49.99,
        category: "Adventure",
        description:
        "A 3D platformer where Mario travels across various kingdoms to rescue Princess Peach from Bowser.",
        createdAt: "2023-10-02T12:00:00Z",
    }, // 1
    {
        id: 3,
        name: "God of War Ragnarok",
        image:
        "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2322010/capsule_616x353.jpg?t=1750909504",
        price: 99.99,
        category: "Action",
        description:
        "An action-adventure game that follows Kratos and his son Atreus as they journey through the world of Norse mythology.",
        createdAt: "2023-10-03T12:00:00Z",
    }, // 2
    {
        id: 4,
        name: "The Witcher 3: Wild Hunt",
        image:
        "https://juegosdigitalesargentina.com/files/images/productos/1618591872-the-witcher-3-wild-hunt-complete-edition-ps5.jpg",
        price: 49.99,
        category: "Role-Playing",
        description:
        "An open-world RPG that follows Geralt of Rivia as he searches for his adopted daughter while battling monsters and engaging in political intrigue.",
        createdAt: "2023-10-04T12:00:00Z",
    }, // 3
    {
        id: 5,
        name: "Spider Man 2",
        image:
        "https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/2651280/cb8da9b3e99cf7362cd88c10a0544b7fe892ccad/capsule_616x353.jpg?t=1750954033",
        price: 39.99,
        category: "Adventure",
        description:
        "An action-adventure game where players control both Peter Parker and Miles Morales as they fight against various villains in New York City.",
        createdAt: "2023-10-05T12:00:00Z",
    },
    
];

// Obtenemos elementos del DOM
const gamesForm = document.getElementById("gamesForm");
const tableBody = document.getElementById("tableBody");
//obtenemos el input de busqueda y la categoria, usamos querySelector
const searchInput = document.querySelector("#searchInput");
const categorySelect = document.querySelector("#categoryFilter");

const sortBtns = document.querySelectorAll("[data-order]");

gamesForm.addEventListener("submit", (evento) => {

    evento.preventDefault();

  // console.log("Formulario enviado", evento)

    const el = evento.target.elements;

    const newGame = {
        id: Date.now(), // timestamp
        name: el.name.value, // input text
        price: el.price.value, // input number
        description: el.description.value,  // textarea
        category: el.category.value, // select
        image: el.image.value, // input url
        createdAt: new Date().toISOString(), // fecha actual en formato ISO
    }

    console.log(newGame);

    // Agregar el nuevo juego al array de juegos
    games.push(newGame);

    //funcion para mandar mensajes al usuario
    Swal.fire({
    icon: "success",
    title: "Carga correcta!",
    text: "El juego se ha cargado correctamente.",
    // // position: "top-end",
    // // toast: true,
    // showConfirmButton: false,
    theme: "dark"
    })

  // Vuelvo a iterar el array de juegos para actualizar la tabla
    buildTable(games);
})

function buildTable(arrayJuegos) {
  // Limpiar el contenido previo del body de la tabla
    tableBody.innerHTML = "";

    if( arrayJuegos.length === 0) {
        tableBody.innerHTML = `<tr>
        <td colspan="6" class="text-center p-4">
            <h3 class="text-secondary">No hay juegos disponibles</h3>
        </td>
        </tr>`;
        return; // Salir de la función si no hay juegos
    }

    arrayJuegos.forEach((juego, posicion) => {

    tableBody.innerHTML += `<tr>
        <td class="cell-image">
            <img src="${juego.image}" alt="Imagen del producto" />
        </td>
        <td class="cell-name">
        
            <span data-id="${juego.id}">  ${juego.name} </span>
        
        </td>

        <td class="cell-category">${juego.category}</td>

        <td class="cell-price">$ ${juego.price}</td>

        <td class="cell-date">${ formatDate(juego.createdAt) }</td>

        <td class="cell-actions">
            <button class="btn btn-primary btn-sm">
            <i class="fa-solid fa-pencil"></i>
            </button>

            <button class="btn btn-danger btn-sm" data-id="${juego.id}">
            <i class="fa-solid fa-trash"></i>
            </button>
        </td>
        </tr>`;
    });

    getSpanDialogBtns();
    getDeleteGameBtns();

}

function deleteGame(id) {

    const isConfirmed = confirm("¿Estás seguro de eliminar el juego?");

    if (isConfirmed) {
        // Debería conocer el id del juego a eliminar
        // Vamos a obtener el índice del juego en el array
        const indice = games.findIndex((juego) => {
            return juego.id === id;
        });
        // Eliminar el juego del array
        games.splice(indice, 1); //el 1 indica que solo quiero eliminar un elemento

        buildTable(games);
    }
}

// Inicializo la tabla con los juegos existentes
buildTable(games);


// #Filtros
// #Cuando el user escriba en el searchInput
searchInput.addEventListener("keyup", (evento)=> {
    const inputValue = evento.target.value.toLowerCase();

    // Deberiamos empezar a buscar en mi array games aquellos juegos que coincidan en su nombre con el valor que la persona ingreso en el input
    const gamesFiltrados = games.filter((juego) => {
        // Busqueda parcial en base al nombre
        const isMatch = juego.name.toLowerCase().includes(inputValue);
        // Condición: return true
        return isMatch;
    })
    console.log(gamesFiltrados);
    // Pintamos la tabla con los juegos filtrados
    buildTable(gamesFiltrados);
})

categorySelect.addEventListener("change", (evento) => {
    const selectedCategory = evento.target.value; // ""

    // Si la categoría seleccionada es "" (todas las categoría), no filtramos
    if(selectedCategory === "all") { // //  !selectedCategory

    buildTable(games);
    return; // Salimos de la función
    }
    const filteredGames = games.filter((juego) => {
        if(juego.category.toLowerCase() === selectedCategory) {
        return true; // Coincide con la categoría seleccionada
        }
    return false;
    })

    console.log(filteredGames);

    buildTable(filteredGames);
})

//ordenamos los precios
sortBtns.forEach((btn) => {

    btn.addEventListener("click", (event) => {

        
        const dataOrder = event.currentTarget.dataset.order;

        if(dataOrder === "reset") {
        // Si el botón es de resetear, volvemos a mostrar todos los juegos
        buildTable(games);
        return; // Salimos de la función
        }

        console.log("Ordenar por:", dataOrder);

        const sortedGames = games.toSorted((a, b) => {
            if (dataOrder === "asc") {
                return a.price - b.price; // Orden ascendente por precio
            }
            return b.price - a.price; // Orden descendente por precio
        })
    buildTable(sortedGames);
    })
})


function showDialog(id) {
    // Buscar el juego por su id
    const juego = games.find((jueguito) => {

        return jueguito.id === id;

    })

    // Mostrar un modal de bootstrap con la información del juego
    Swal.fire({
        title: juego.name,
        html: `<div class="product-dialog">
        <div class="image-container">
            <img src="${juego.image}" alt="${juego.name}" />
        </div>

        <div class="details-container">

            <div class="category">${juego.category}</div>
            <p>${juego.description}</p>

            <div class="price">$ ${juego.price}</div>

            <div class="footer-wrapper">
            <div class="date">
                ${juego.createdAt}
            </div>
            <button class="btn btn-primary">Editar</button>
            </div>
        </div>
        </div>`,
        theme: "dark",
        showConfirmButton: false,
        width: "800px",
    });
}

function getSpanDialogBtns() {
    // Obtener todos los span dentro de la clase cell-name
    const spanDialogBtns = document.querySelectorAll(".cell-name span");

    // Agregar un evento click a cada span para mostrar el dialogo
    // console.log(spanDialogBtns);

    console.log(spanDialogBtns);
    spanDialogBtns.forEach((span) => {
        span.addEventListener("click", (event) => {

        event.stopPropagation(); // Evitar que el click se propague al padre
        const id = parseInt(span.dataset.id); // Obtener el id del dataset
        showDialog(id);
        });
    })
}

function getDeleteGameBtns() {
    const deleteGameBtns = document.querySelectorAll(".cell-actions .btn-danger");

    deleteGameBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {

        event.stopPropagation(); // Evitar que el click se propague al padre
        const id = parseInt(btn.dataset.id); // Obtener el id del dataset
        deleteGame(id);
        });
    })
}