import printCharacter from "./print-characters.js";

const d = document;

export default function submitSearch() {
    const $search = d.getElementById('form-search'),
        $containerProducts = d.querySelector('.container-products');

    d.addEventListener('submit', e => {
        e.preventDefault();

        if (e.target === $search) {
            const $producstBefore = $containerProducts.querySelectorAll('.article-product');

            $producstBefore.forEach(product => $containerProducts.removeChild(product));

            printCharacter(`https://rickandmortyapi.com/api/character?name=${e.target.search.value.toLowerCase()}`, false, e.target.search.value);

            e.target.reset();
        };
    })
}