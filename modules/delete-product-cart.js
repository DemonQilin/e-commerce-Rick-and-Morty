import updateCart from "./update-cart.js";

const d = document;

export function deleteCart(articleCart) {
    const containerCart = d.querySelector('.container-products-cart'),
        $articleBody = d.getElementById(articleCart.dataset.idCart);
        
        if ($articleBody) {
            const $btn = $articleBody.querySelector('.btn-add-cart'),
                    $control = $articleBody.querySelector('.control-stock');
                
            $articleBody.dataset.quanty = 1;
            $articleBody.querySelector('.quanty').textContent = $articleBody.dataset.quanty;
            $control.classList.remove('visible');
            $control.classList.add('none');
            $btn.classList.remove('none');
            $btn.classList.add('visible');
        }
    containerCart.removeChild(articleCart);
}

export default function deleteProductCart() {
    d.addEventListener('click', e => {
        if (e.target.matches('.btn-remove-cart') || e.target.matches('.btn-remove-cart *')) {
            const $articleCart = e.target.closest('.article--cart');

            deleteCart($articleCart);
            updateCart();
        }
    })
}