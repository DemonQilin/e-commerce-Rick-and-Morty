import printCharacter from "./print-characters.js";

const d = document;

export default function loadMoreProducts() {
    d.addEventListener('click', e => {
        if (e.target.matches('.btn-load') || e.target.matches('.btn-load *')) {
            const $btn = e.target.closest('.btn-load');

            if ($btn.hasAttribute('data-url')) {
                printCharacter($btn.dataset.url);
            }
        }
    })
}