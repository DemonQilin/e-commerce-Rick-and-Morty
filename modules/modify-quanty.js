import updateCart from "./update-cart.js";
import updateQuantyBody from "./update-quanty-body.js";
import updateQuantyCart from "./update-quanty-cart.js";

const d = document;

export default function modifyQuantyProduct() {
    d.addEventListener('click', e => {
        if (e.target.matches('.btn-stock--plus') || e.target.matches('.btn-stock--plus *')) {
            const article = e.target.closest('article');
            updateQuantyBody(article, 1);
            updateQuantyCart(article, 1);
            updateCart()
        }

        if (e.target.matches('.btn-stock--less') || e.target.matches('.btn-stock--less *')) {
            const article = e.target.closest('article');
            updateQuantyBody(article, -1);
            updateQuantyCart(article, -1);
            updateCart()
        }
    })
}