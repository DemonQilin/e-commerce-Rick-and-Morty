const d = document;

export default function updateCart() {
    const $containerCart = d.querySelector('.container-cart'),
        $productsCart = d.querySelectorAll('.article--cart'),
        $totalCart = d.querySelector('.total-cart--value span'),
        $counterTitle = d.querySelector('.title--cart span'),
        $counterBtn = d.querySelector('.btn-cart .cart-counter'),
        $msgCart = d.querySelector('.msg-cart-vacio');


    let tQuanty = 0,
        tPay = 0;

    $productsCart.forEach(product => {
        tQuanty += +product.dataset.quanty;
        tPay += +product.dataset.total;
    })

    $totalCart.textContent = tPay;
    $containerCart.dataset.total = tPay;
    
    if (tQuanty >= 1) {
        $counterBtn.classList.add('visible');
    } else if(tQuanty === 0) {
        $counterBtn.classList.remove('visible');
        $msgCart.classList.remove('none');
    }

    if (tQuanty !== +$counterBtn.dataset.count) {
        $counterBtn.classList.add('add-product');
        setTimeout(() => {
            $counterBtn.classList.remove('add-product');
        }, 400);
    }

    
    $counterBtn.textContent = tQuanty;
    $counterBtn.dataset.count = tQuanty;
    $counterTitle.textContent = tQuanty;
}