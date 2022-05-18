const d = document,
    w = window;

export function observer(DataObservado, clase, DataImplicado) {
    const $observados = d.querySelectorAll(`[${DataObservado}]`);

    const resaltarBtn = entries => {
        entries.forEach(entry => {
            let dataBtn = entry.target.dataset.slide;

            if (entry.isIntersecting) {
                d.querySelector(`[${DataImplicado}="${dataBtn}"]`).classList.add(clase)
            } else {
                d.querySelector(`[${DataImplicado}="${dataBtn}"]`).classList.remove(clase)
            }
        })
    }

    const observer = new IntersectionObserver(resaltarBtn, {
        threshold: 1
    })

    $observados.forEach(el => observer.observe(el))
}