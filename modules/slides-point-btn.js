const d = document;

export default function slidesBtnPoint(dataBtnPoint, dataSlide, DataSlidesContainer) {
    const $slides = d.querySelectorAll(`[${dataSlide}]`),
        $container = d.querySelector(`[${DataSlidesContainer}]`);

    $slides.forEach(slide => slide.dataset.scroll = $container.clientWidth * (+slide.dataset.slide - 1));

    d.addEventListener('click', e => {
        if (e.target.matches(`[${dataBtnPoint}]`)) $container.scroll({
            left: +$container.querySelector(`[${dataSlide}="${e.target.dataset.btn}"]`).dataset.scroll,
            behavior: 'smooth',
        })
    });
}