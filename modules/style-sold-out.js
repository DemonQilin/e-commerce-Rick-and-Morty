const d = document;

export default function soludOut(article) {
    const $soldOut = article.querySelector('.sold-out'),
        $btnAdd = article.querySelector('.btn-add-cart');

    article.dataset.soldOut = "";
    $soldOut.classList.remove('none');
    $btnAdd.disabled = true;
}

export function deleteSoldOut(article) {
    const $soldOut = article.querySelector('.sold-out'),
        $btnAdd = article.querySelector('.btn-add-cart');

    article.removeAttribute('data-sold-out');
    $soldOut.classList.add('none');
    $btnAdd.disabled = false;
}