const d = document,
    $body = d.body,
    storage = window.localStorage;

export default function darkModeBtn() {
    const $btnDark = d.querySelector('.btn-dark--mode');



    if (+storage.getItem('darkMode')) {
        d.body.classList.add('ligth-mode');
        $btnDark.innerHTML = '<i class="fa-solid fa-moon"></i>';
    } else {
        d.body.classList.remove('ligth-mode');
        $btnDark.innerHTML = '<i class="fa-regular fa-sun"></i>';
    }

    d.addEventListener('click', e => {
        if (e.target.matches('.btn-dark--mode') || e.target.matches('.btn-dark--mode *')) {
            d.body.classList.toggle('ligth-mode');
            storage.setItem('darkMode', `${getComputedStyle($body).getPropertyValue('--theme-dark')}`);

            $btnDark.innerHTML = +getComputedStyle($body).getPropertyValue('--theme-dark') ? '<i class="fa-solid fa-moon"></i>' : '<i class="fa-regular fa-sun"></i>';
        };
    })
    
}