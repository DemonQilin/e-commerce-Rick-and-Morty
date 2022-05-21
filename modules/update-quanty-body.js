import errorAnimation from "./animation-error-quanty.js";

const d = document;

export default function updateQuantyBody(articleEvent, num) {
    const $article = d.getElementById(articleEvent.id) || d.getElementById(articleEvent.dataset.idCart);

    const $quanty = $article.querySelector('.quanty'),
        $control = $article.querySelector('.control-stock'),
        $error = $article.querySelector('.error-quanty');
    
    if (num === 1) {
        if ((+$article.dataset.quanty + 1) > +$article.dataset.stock) {
            errorAnimation($error, $control, 'La cantidad supera las unidades en stock');
        } else {
            $article.dataset.quanty = +$article.dataset.quanty + 1;
            $quanty.textContent = $article.dataset.quanty;
        }
    } else if (num === -1) {
        if (+$article.dataset.quanty === 1) {
            errorAnimation($error, $control, 'La cantidad mínima es 1 unidad');
        } else {
            $article.dataset.quanty = +$article.dataset.quanty - 1;
            $quanty.textContent = $article.dataset.quanty;
        }
    }
    
}