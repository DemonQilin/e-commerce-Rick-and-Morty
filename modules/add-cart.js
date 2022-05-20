import updateCart from "./update-cart.js";

const d = document;

export default function addProductCart() {
    const $containerCart = d.querySelector('.container-products-cart'),
        $templateCartProduct = d.getElementById('template-product-cart').content;

    d.addEventListener('click', e => {
        if (e.target.matches('.btn-add-cart') || e.target.matches('.btn-add-cart *')) {
            const $article = e.target.closest('.article');

            let $articleProduct = $containerCart.querySelector(`[data-id-cart="${$article.id}"]`);

            if ($articleProduct) {
                $articleProduct.dataset.quanty = $article.dataset.quanty;
                $articleProduct.dataset.total = $articleProduct.dataset.price * $articleProduct.dataset.quanty;
                $articleProduct.querySelector('.article-cart-total').textContent = `$ ${$articleProduct.dataset.total} USD`;
                $articleProduct.querySelector('.quanty--cart').textContent = $articleProduct.dataset.quanty;
            } else {
                $articleProduct = $templateCartProduct.querySelector('article');
                const $fragmentCart = d.createDocumentFragment();
                    
                $articleProduct.dataset.idCart = $article.id;
                $articleProduct.dataset.name = $article.dataset.name;
                $articleProduct.dataset.photo = $article.dataset.photo;
                $articleProduct.dataset.price = $article.dataset.price;
                $articleProduct.dataset.quanty = $article.dataset.quanty;
                $articleProduct.dataset.specie = $article.dataset.specie;
                $articleProduct.dataset.stock = $article.dataset.stock;
                $articleProduct.dataset.total = $articleProduct.dataset.price * $articleProduct.dataset.quanty;
    
                $articleProduct.querySelector('.img-cart').src = $articleProduct.dataset.photo;
                $articleProduct.querySelector('.img-cart').title = $articleProduct.dataset.name;
                $articleProduct.querySelector('.article-cart-total').textContent = `$ ${$articleProduct.dataset.total} USD`;
                $articleProduct.querySelector('.article-cart-title').textContent = $articleProduct.dataset.name;
                $articleProduct.querySelector('.especie--cart').textContent = $articleProduct.dataset.specie;
                $articleProduct.querySelector('.quanty--cart').textContent = $articleProduct.dataset.quanty;
    
                let $clone = d.importNode($templateCartProduct, true);
                $fragmentCart.appendChild($clone);
    
                // Insertando en la section del cart
                $containerCart.appendChild($fragmentCart);
            }

            updateCart();
        }
    })
}