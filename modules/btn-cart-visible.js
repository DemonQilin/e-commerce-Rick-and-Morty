const d = document;

export function toDoVisibleCart(btnVisible, btnHidden, sectionCart) {
    const $sectionCart = d.querySelector(sectionCart);

    d.addEventListener('click', e => {
        if (e.target.matches(btnVisible) || e.target.matches(`${btnVisible} *`)) {
            $sectionCart.classList.toggle('visible-translate');
        }

        if (e.target.matches(btnHidden) || e.target.matches(`${btnHidden} *`)) {
            $sectionCart.classList.remove('visible-translate')
        }
    })
}