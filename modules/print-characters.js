import soludOut, { deleteSoldOut } from "./style-sold-out.js";

const d = document,
    storage = window.localStorage;

const $loader = d.querySelector('.products-loader-container'),
    $containerProducts = d.querySelector('.container-products'),
    $templateProduct = d.getElementById('template-product').content,
    $article = $templateProduct.querySelector('article'),
    $btnMore = d.querySelector('.btn-load'),
    $errorFetch = d.querySelector('.error-fetch'),
    $containerCart = d.querySelector('.container-products-cart');

let arrayResidents = [],
    $fragment = d.createDocumentFragment();

// Funcion para leer datos de un personaje
const leerObjeto = el => {
    // Cargando datos del local storage
    const { stock: storageStock, price: storagePrice } = JSON.parse(storage.getItem(`${el.id}`)) || {},
        $btnAdd = $article.querySelector('.btn-add-cart'),
        $control = $article.querySelector('.control-stock');

    // data
    $article.setAttribute('id', el.id);
    $article.dataset.name = el.name;
    $article.dataset.photo = el.image;
    $article.dataset.status = el.status === "Alive" ? "Vivo" : el.status === "Dead" ? "Muerto" : "Desconocido";
    $article.dataset.specie = el.species === "Human" ? "Humano" : el.species;
    $article.dataset.gender = el.gender === "Male" ? "Masculino" : el.gender === "Female" ? "Femenino" : el.gender === "Genderless" ? "No Binario" : "Desconocido";
    $article.dataset.location = el.location.name === "Citadel of Ricks" ? "Ciudadela de los Ricks" : el.location.name === "Earth (C-137)" ? "Tierra C-137" : el.location.name === "Interdimensional Cable" ? "Cable Interdimensional" : el.location.name === "Story Train" ? "Tren de Historias" : el.location.name;
    $article.dataset.price = storagePrice || (100 + Math.round(Math.random() * 900));
    $article.dataset.quanty = 1;
    $article.dataset.stock = (storageStock === 0 ? "0" : storageStock) || (1 + Math.round(Math.random() * 9));

    // Verificando si el producto existe en el local storage
    if (!storage.getItem(`${$article.id}`)) storage.setItem(`${$article.id}`, `{"stock": ${$article.dataset.stock}, "price": ${$article.dataset.price}}`);

    // Photo
    $templateProduct.querySelector('img').src = $article.dataset.photo;
    $templateProduct.querySelector('img').alt = $article.dataset.name;

    // Details
    $templateProduct.querySelector('.article-title').textContent = $article.dataset.name;
    $templateProduct.querySelector('.status').textContent = $article.dataset.status;
    $templateProduct.querySelector('.status').classList.remove('status--dead', 'status--unknown');
    $templateProduct.querySelector('.status').classList.add($article.dataset.status === 'Muerto' ? 'status--dead' : $article.dataset.status === 'Desconocido' ? 'status--unknown' : 'status');
    $templateProduct.querySelector('.especie').textContent = $article.dataset.specie;
    $templateProduct.querySelector('.genero').textContent = $article.dataset.gender;
    $templateProduct.querySelector('.ubicacion').textContent = $article.dataset.location;

    // Invent
    $templateProduct.querySelector('.article-precio').textContent = `$ ${$article.dataset.price} c/u`;
    $templateProduct.querySelector('.quanty').textContent = $article.dataset.quanty;
    $templateProduct.querySelector('.stock').textContent = `${$article.dataset.stock} unidades`;
    deleteSoldOut($article);

    // Verificando que este agotado
    if (+$article.dataset.stock === 0) soludOut($article);

    // Verificando si esta en el carrito
    $btnAdd.classList.add('visible');
    $btnAdd.classList.remove('none');
    $control.classList.add('none');
    $control.classList.remove('visible');
    
    if ($containerCart.querySelector(`[data-id-cart="${el.id}"]`)) {
        $btnAdd.classList.remove('visible');
        $btnAdd.classList.add('none');
        $templateProduct.querySelector('.quanty').textContent = $containerCart.querySelector(`[data-id-cart="${el.id}"]`).dataset.quanty;
        $control.classList.remove('none');
        $control.classList.add('visible');
    }

    // Clonar Template
    let $clone = d.importNode($templateProduct, true);
    $fragment.appendChild($clone);
}
    
// Función para contruir una pagina de personajes a partir de una lista de residentes de una ubicación 
const buildCharacterPage = async response => {
    // Sea crea un array para almacenar los id de cada residente de la ubicación
    let subnext = [];
    // Se reseta el array resident
    arrayResidents = [];

    // A cada residente de la ubicación se le extrae su id, y se almacena en un array con una longitud máxima de 20 posiciones (paginando).
    response.residents.forEach(resident => {
        subnext.push(resident.slice(42))

        // Al alcanzarse las 20 posiciones se agregan en una url que solicitara los 20 personajes en una sola petición, y asi sucesivamente hasta completarse todos los residentes.
        if (subnext.length === 20) {
            arrayResidents.push(`https://rickandmortyapi.com/api/character/${subnext.join(',')}`);
            subnext = []
        }
    });
    
    // Completamos un array de paginas, donde cada posicion tiene una url  que solicita 20 personajes.
    arrayResidents.push(`https://rickandmortyapi.com/api/character/${subnext.join(',')}`);

    // Se solicita y elimina la primera pagina del arreglo de paginas, y la respuesta de la solicitud pasa a ser la respuesta a mostra en pantalla
    let obj = await fetch(arrayResidents.shift());

    // Retorna la nueva respuesta
    return await obj.json();
}

export default async function printCharacter(url, noNext, value) {
    $loader.classList.remove('none');
    $loader.classList.add('visible-loader');

    // Removiendo visualizacion de error de busqueda
    $errorFetch.classList.add('none');
    $errorFetch.classList.remove('visible');

    try {
        // Petición de los recursos de la url pasada en el parametro
        let obj = await fetch(url);
        let response = await obj.json();

        if (!obj.ok) throw `Error ${obj.status}: No se han encontrado resultados para "${value}". Intenta con otro nombre ;)`;

        // Se ejecuta si se indica que la respuesta no tendra un next (link de próxima pagina) asociado, y en este caso, solo con el primer click en los filtros de tipo ubicación. Convierte la respuesta de una ubicación en una pagina de personajes
        if (noNext) response = await buildCharacterPage(response);

        // Asignando url al botón para la próxima pagina

        // Se remueve la clase .none para hace rvisible el boton, debido a que otras solicitudes podrian haberlo ocultado.
        $btnMore.classList.remove('none');

        // Se verifica si la respuesta tiene la estructura de pagina de personajes
        if (response.info) {
            // Si la tiene se lee la propiedad next de la propiedad info y si no tiene se deja vacio
            $btnMore.dataset.url = response.info.next || '';
        } else if (!(response instanceof Array)) {
            // Si sigue siendo un objeto distinto de un array que carece de la propiedad info, se trata una respuesta unica, y no tiene next.
            $btnMore.dataset.url = '';
        } else if (arrayResidents !== 0) {
            // Si es un array, es porque es un pagina artificial generada de una peticion a una ubicación. Entonces verificamos que el array de residentes no este vacio.
            $btnMore.dataset.url = arrayResidents.shift() || '';
        }

        // Si el boton no tiene una url entonces se quita de la vista para no incurrir en errores al usuario.
        if (!$btnMore.dataset.url) {
            $btnMore.removeAttribute('data-url');
            $btnMore.classList.add('none');
        }

        if (response.results) {
            response.results.forEach(el => leerObjeto(el))
        } else if (response instanceof Array) {
            response.forEach(el => leerObjeto(el));
        } else {
            leerObjeto(response);
        }

        // Inserción en el DOM
        $containerProducts.appendChild($fragment);

    } catch (err) {
        $btnMore.removeAttribute('data-url');
        $btnMore.classList.add('none');
        $errorFetch.textContent = err;
        $errorFetch.classList.remove('none');
        $errorFetch.classList.add('visible');
    } finally {
        $loader.classList.add('none');
        $loader.classList.remove('visible-loader');
    }
}