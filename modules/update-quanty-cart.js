import errorAnimation from "./animation-error-quanty.js";

const d = document;

export default function updateQuantyCart(articleEvent, num) {
    const $article = d.querySelector(`[data-id-cart="${articleEvent.id}"]`) || d.querySelector(`[data-id-cart="${articleEvent.dataset.idCart}"]`);

    const $quanty = $article.querySelector('.quanty'),
        $control = $article.querySelector('.control-stock'),
        $error = $article.querySelector('.error-quanty'),
        $total = $article.querySelector('.article-cart-total');
    
    if (num === 1) {
        if ((+$article.dataset.quanty + 1) > +$article.dataset.stock) {
            errorAnimation($error, $control, 'La cantidad supera las unidades en stock');
        } else {
            $article.dataset.quanty = +$article.dataset.quanty + 1;
        }
    } else if (num === -1) {
        if (+$article.dataset.quanty === 1) {
            errorAnimation($error, $control, 'La cantidad mínima es 1 unidad');
        } else {
            $article.dataset.quanty = +$article.dataset.quanty - 1;
        }
    }

    $article.dataset.total = $article.dataset.price * $article.dataset.quanty;
    $quanty.textContent = $article.dataset.quanty;
    $total.textContent = `$ ${$article.dataset.total} USD`;
}