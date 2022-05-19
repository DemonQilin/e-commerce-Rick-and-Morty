const d = document;

export default async function printCharacter() {
    const $loader = d.querySelector('.products-loader-container'),
        $containerProducts = d.querySelector('.container-products'),
        $templateProduct = d.getElementById('template-product').content,
        $fragment = d.createDocumentFragment();
    
    // $loader.classList.add('visible-loader');

    let obj = await fetch('https://rickandmortyapi.com/api/character');
    console.log(obj);
    let response = await obj.json();

    // Por cada producto
    response.results.forEach(el => {
        // id
        $templateProduct.querySelector('.article').setAttribute('id', el.id);

        // Photo
        $templateProduct.querySelector('img').src = el.image;
        $templateProduct.querySelector('img').alt = el.name;

        // Details
        $templateProduct.querySelector('.article-title').textContent = el.name;
        $templateProduct.querySelector('.status').textContent = el.status === "Alive" ? "Vivo" : el.status === "Dead" ? "Muerto" : "Desconocido";
        $templateProduct.querySelector('.especie').textContent = el.species === "Human" ? "Humano" : el.species;
        $templateProduct.querySelector('.genero').textContent = el.gender === "Male" ? "Masculino" : el.gender === "Female" ? "Femenino" : el.gender === "Genderless" ? "No Binario" : "Desconocido";
        $templateProduct.querySelector('.ubicacion').textContent = el.location.name === "Citadel of Ricks" ? "Ciudadela de los Ricks" : el.location.name === "Earth (C-137)" ? "Tierra C-137" : el.location.name === "Interdimensional Cable" ? "Cable Interdimensional" : el.location.name === "Story Train" ? "Tren de Historias" : el.location.name;

        // Invent
        $templateProduct.querySelector('.article-precio').textContent = `$ ${Math.round(Math.random() * 100)} USD`;
        $templateProduct.querySelector('.stock').textContent = `${Math.round(Math.random() * 5)} unidades`;

        // Clonar Template
        let $clone = d.importNode($templateProduct, true);
        $fragment.appendChild($clone);
    });

    // Inserción en el DOM
    $containerProducts.appendChild($fragment);
    // $loader.classList.remove('visible-loader');
}