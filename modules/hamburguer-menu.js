const d = document;

export function hamburguerMenu(btn, nav, typeFilter,filter) {
    const $btn = d.querySelector(btn),
        $menu = d.querySelector(nav);

    d.addEventListener('click', e => {

        const $subLists = d.querySelectorAll('.item-container');

        if (e.target.matches(btn) || e.target.matches(`${btn} *`)) {
            $btn.classList.toggle('is-active');
            $menu.classList.toggle('visible-translate');
        }

        if (e.target.matches(typeFilter) || e.target.matches(`${typeFilter} *`)) {
            e.preventDefault();
            const $divContainer = e.target.closest(typeFilter);
            
            $divContainer.nextElementSibling.classList.toggle('none');
            $divContainer.nextElementSibling.firstElementChild.classList.toggle('visible');
        }

        if (e.target.matches(filter)) {
            e.preventDefault();
            $btn.classList.remove('is-active');
            $menu.classList.remove('visible-translate');
            $subLists.forEach(el => {
                el.firstElementChild.classList.remove('visible');
                if (!el.classList.contains('none')) el.classList.add('none');
            })
        }
    })
}