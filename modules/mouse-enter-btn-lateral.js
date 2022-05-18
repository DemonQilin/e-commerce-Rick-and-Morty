const d = document,
    $father = d.querySelector('.carrusel'),
    fnMouseEnter = e => {
        e.target.querySelector('.carrusel-btns--laterals').classList.add('visible');
    },
    fnMouseLeave = e => {
        e.target.querySelector('.carrusel-btns--laterals').classList.remove('visible');
    };

export function mouseEnterBtnsVisibles() {
    $father.addEventListener('mouseenter', fnMouseEnter);

    $father.addEventListener('mouseleave', fnMouseLeave)
}

export function RemoveMouseEnterBtnsVisibles() {
    $father.removeEventListener('mouseenter', fnMouseEnter);

    $father.removeEventListener('mouseleave', fnMouseLeave)
}