const d = document;

export default function validarFormulario(form) {
    const $inputs = document.querySelectorAll(`#${form} [data-validar]`),
        $submit = d.querySelector(`#${form} [data-submit]`);
    
    $inputs.forEach(input => {
        let aviso = document.createElement('div');
        aviso.id = input.name;
        aviso.classList.add('aviso', 'none');
        aviso.textContent = input.title;
        input.insertAdjacentElement('afterend', aviso);
    });

    const validarRegExp = (input) => {
        let pattern = input.pattern || input.dataset.pattern;

        if (pattern && input.value !== '') {
            let regex = new RegExp(pattern);
            if (!regex.test(input.value)) {
                d.getElementById(input.name).classList.remove('none');
                $submit.disabled = true
            } else {
                d.getElementById(input.name).classList.add('none');
                $submit.disabled = false;
            }
        }

        if (input.value === '') {
            d.getElementById(input.name).classList.add('none');
        }
        
    };

    d.addEventListener('input', e => {
        if (e.target.matches(`#${form} [data-validar]`)) {
            validarRegExp(e.target)
        }
    })
}