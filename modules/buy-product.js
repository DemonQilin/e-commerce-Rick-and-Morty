import { deleteCart } from "./delete-product-cart.js";
import soludOut from "./style-sold-out.js";
import updateCart from "./update-cart.js";

const d = document,
    storage = window.localStorage;

export default function buyProduct() {
    const $containerMsg = d.querySelector('.msg-buy'),
        $containMsg = $containerMsg.querySelector('.msg-buy-contain'),
        $containerCart = d.querySelector('.container-cart'),
        $products = $containerCart.querySelectorAll('.article--cart');

    d.addEventListener('click', e => {
        if (e.target.matches('.btn-buy-cart') || e.target.matches('.btn-buy-cart *')) {
            let $products = $containerCart.querySelectorAll('.article--cart');

            // Se hace visible el fondo negro del mensaje
            $containerMsg.classList.remove('none');

            // Si el carrito no está vacío
            if ($products.length) {
                // Se muestra una ventana que pregunta al usuario si desea confirmar el pago
                $containMsg.querySelector('.buy-msg').textContent = `Confirma tu pago por un valor total de $ ${$containerCart.dataset.total} USD`;
                $containMsg.classList.add('msg-buy-contain--question');
                $containMsg.querySelector('.btn-confirm-buy').classList.add('visible');
                $containMsg.querySelector('.btn-cancel-buy').classList.add('visible');
                $containMsg.classList.add('visible');

            } else {
                // Si el carrito está vacío
                $containMsg.querySelector('.buy-msg').textContent = '¡Tu carrito está vacío!';
                $containMsg.querySelector('.btn-close-buy').classList.add('visible');
                $containMsg.classList.add('visible');
            }
        }


        if (e.target.matches('.btn-close-buy') || e.target.matches('.btn-close-buy *')) {
            $containerMsg.classList.add('none');
            $containMsg.classList.remove('visible');
            $containMsg.classList.remove('msg-buy-contain--question');
            $containMsg.querySelector('.btn-close-buy').classList.remove('visible');
        }

        // Si se confirma la compra
        if (e.target.matches('.btn-confirm-buy') || e.target.matches('.btn-confirm-buy *')) {
            const products = $containerCart.querySelectorAll('.article--cart');
            products.forEach(product => {
                const article = d.getElementById(product.dataset.idCart);
                let { stock, price } = JSON.parse(storage.getItem(`${product.dataset.idCart}`));

                stock -= +product.dataset.quanty;
                storage.setItem(`${product.dataset.idCart}`, `{"stock": ${stock}, "price": ${price}}`);

                if (article) {
                    article.dataset.stock = stock;
                    article.querySelector('.stock').textContent = `${article.dataset.stock} unidades`;
                    if (+article.dataset.stock === 0) soludOut(article);
                }
                
                deleteCart(product);
            });

            updateCart();

            // Muestra mensaje de confirmación de compra
            $containMsg.classList.remove('visible');
            setTimeout(() => {
                $containMsg.querySelector('.buy-msg').textContent = '¡Compra realizada con exito! Gracias por tu compra';
                $containMsg.querySelector('.btn-confirm-buy').classList.remove('visible');
                $containMsg.querySelector('.btn-cancel-buy').classList.remove('visible');
                $containMsg.querySelector('.btn-close-buy').classList.add('visible');
                $containMsg.classList.add('visible');
            }, 300);
        }


        // Si se cancela la compra
        if (e.target.matches('.btn-cancel-buy') || e.target.matches('.btn-cancel-buy *')) {
            $containMsg.classList.remove('visible');

            setTimeout(() => {
                $containMsg.classList.remove('msg-buy-contain--question');
                $containMsg.querySelector('.buy-msg').textContent = 'Pago Cancelado';
                $containMsg.querySelector('.btn-confirm-buy').classList.remove('visible');
                $containMsg.querySelector('.btn-cancel-buy').classList.remove('visible')
                $containMsg.querySelector('.btn-close-buy').classList.add('visible');
                $containMsg.classList.add('visible');
            }, 300)
        }
    })
}