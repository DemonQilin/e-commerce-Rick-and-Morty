const d = document,
    $listFathers = d.querySelectorAll('.nav-item'),
    fnMouseEnter = e => {
        e.target.querySelector('.item-container').classList.remove('none');
        e.target.querySelector('.item-list').classList.add('visible');
    },
    fnMouseLeave = e => {
        e.target.querySelector('.item-container').classList.add('none');
        e.target.querySelector('.item-list').classList.remove('visible');
    };

export function mouseEnterVisible() {
    $listFathers.forEach(father => {
        father.addEventListener('mouseenter', fnMouseEnter);

        father.addEventListener('mouseleave', fnMouseLeave);
    })
}

export function removeMouseEnterVisible() {
    $listFathers.forEach(father => {
        father.removeEventListener('mouseenter', fnMouseEnter);

        father.removeEventListener('mouseleave', fnMouseLeave);
    })
}