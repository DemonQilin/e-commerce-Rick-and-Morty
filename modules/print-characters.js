import soludOut, { deleteSoldOut } from "./style-sold-out.js";

const d = document,
    storage = window.localStorage;

const $loader = d.querySelector('.products-loader-container'),
    $containerProducts = d.querySelector('.container-products'),
    $templateProduct = d.getElementById('template-product').content,
    $article = $templateProduct.querySelector('article'),
    $btnMore = d.querySelector('.btn-load');

let arrayResidents = [],
    $fragment = d.createDocumentFragment();

export default async function printCharacter(url, noNext, NoResetResidents) {
    // $loader.classList.add('visible-loader');

    // Verficiación del parametro que reseta el array de residentes, se pasa solo en caso de seleccionar un menu distinto al de ubicación, para que si existia un valor de residentes no se lea en la propiedad del boton para cargar más productos.
    if (!NoResetResidents) {
        arrayResidents = [];
        $btnMore.classList.remove('none');
    };

    // Petición de los recursos de la url pasada en el parametro
    let obj = await fetch(url);
    let response = await obj.json();

    // Se ejecuta si se indica que la respuesta no tendra un next (link de próxima pagina) asociado, y en este caso, solo con el primer click en los filtros de tipo ubicación.
    if (noNext) {
        // Sea crea un array para almacenar los id de cada residente de la ubicación
        let subnext = [];
        // Se reseta el array resident

        response.residents.forEach(resident => {
            subnext.push(resident.slice(42))
            if (subnext.length === 20) {
                arrayResidents.push(`https://rickandmortyapi.com/api/character/${subnext.join(',')}`);
                subnext = []
            }
        });
        
        arrayResidents.push(`https://rickandmortyapi.com/api/character/${subnext.join(',')}`);

        console.log(arrayResidents);

        obj = await fetch(arrayResidents.shift());
        response = await obj.json();
    }
    
    // Asignando url al botón para la próxima pagina
    if (response.info) {
        if (response.info.next) $btnMore.dataset.url = response.info.next;
    } else if (arrayResidents !== 0) {
        $btnMore.dataset.url = arrayResidents.shift() || '';
    }
    
    if (!$btnMore.dataset.url) {
        $btnMore.removeAttribute('data-url');
        $btnMore.classList.add('none');
    }

    // Obtención datos del producto
    const leerObjeto = el => {
        // Cargando datos del local storage
        const { stock: storageStock, price: storagePrice } = JSON.parse(storage.getItem(`${el.id}`)) || {};

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
        if (+$article.dataset.stock === 0) soludOut($article);

        // Clonar Template
        let $clone = d.importNode($templateProduct, true);
        $fragment.appendChild($clone);
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
    // $loader.classList.remove('visible-loader');
}