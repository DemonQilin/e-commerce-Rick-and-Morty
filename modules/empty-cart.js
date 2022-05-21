import { deleteCart } from "./delete-product-cart.js";
import updateCart from "./update-cart.js";

const d = document;

export default function emptyCart() {
    d.addEventListener('click', e => {
        if (e.target.matches('.btn-empty-cart') || e.target.matches('.btn-empty-cart *')) {
            d.querySelectorAll('.article--cart').forEach(article => deleteCart(article));
            updateCart();
        }
    })
}