import updateCart from "./update-cart.js";

const d = document;

export default function deleteProductCart() {
    const $containerCart = d.querySelector('.container-products-cart');

    d.addEventListener('click', e => {
        if (e.target.matches('.btn-remove-cart') || e.target.matches('.btn-remove-cart *')) {
            const $articleCart = e.target.closest('.article--cart'),
                $articleBody = d.getElementById($articleCart.dataset.idCart),
                $btn = $articleBody.querySelector('.btn-add-cart'),
                $control = $articleBody.querySelector('.control-stock');
            
            $articleBody.dataset.quanty = 1;
            $articleBody.querySelector('.quanty').textContent = $articleBody.dataset.quanty;
            $control.classList.remove('visible');
            $control.classList.add('none');
            $btn.classList.remove('none');
            $btn.classList.add('visible');
            $containerCart.removeChild($articleCart);
            updateCart();
        }
    })
}