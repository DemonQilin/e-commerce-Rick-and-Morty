const d = document;

export default function slideBtnLateral() {
    const $container = d.querySelector('[data-slices-container]'),
        $left = d.querySelector('[data-left]'),
        $right = d.querySelector('[data-right]');
    
    let ind;
    
    const scroll = ind => {
        $container.scroll({
            left: $container.scrollLeft + ind * (($container.clientWidth / 2) + 1),
            behavior: 'smooth'
        })
    };
    
    d.addEventListener('click', e => {
        if (e.target.matches('[data-left]') || e.target.matches('[data-left] *')) {
            scroll(-1)
            ind = 1
        };
            

        if (e.target.matches('[data-right]') || e.target.matches('[data-right] *')) {
            scroll(1)
            ind = 1;
        };
    });

    setInterval(() => {
        if (($container.scrollLeft + (($container.clientWidth / 2) + 1)) > ($container.clientWidth * ($container.childElementCount - 1))) ind = -1;

        if (($container.scrollLeft - (($container.clientWidth / 2) + 1)) < 0) ind = 1;

        scroll(ind);
    }, 5000)
}