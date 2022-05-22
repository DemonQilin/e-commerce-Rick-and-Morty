const d = document,
    w = window;

export default function scrollTopButton(btn) {
    const $scrollBtn = d.querySelector('.btn--scroll');
    
    let $scrollElement = w;

    const btnVisible = e => {
        let scrollTop = $scrollElement.scrollY;

        if (scrollTop > 600) {
            $scrollBtn.classList.add('visible');
        } else {
            $scrollBtn.classList.remove('visible');
        }
    };

    const scrollTop = e => {
        if (e.target === $scrollBtn) {
            $scrollElement.scrollTo({
                behavior: "smooth",
                top: 0,
            })
        }
    };

    $scrollElement.addEventListener('scroll', btnVisible);
    
    d.addEventListener('click', scrollTop);
}