import soludOut, { deleteSoldOut } from "./style-sold-out.js";

const d = document,
    storage = window.localStorage;

export default async function printCharacter(url) {
    const $loader = d.querySelector('.products-loader-container'),
        $containerProducts = d.querySelector('.container-products'),
        $templateProduct = d.getElementById('template-product').content,
        $fragment = d.createDocumentFragment(),
        $article = $templateProduct.querySelector('article');
    
    // $loader.classList.add('visible-loader');

    let obj = await fetch(url);
    let response = await obj.json();

    // Por cada producto
    response.results.forEach(el => {
        // Cargando data del local stogare
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
    });

    // Inserción en el DOM
    $containerProducts.appendChild($fragment);
    // $loader.classList.remove('visible-loader');
}