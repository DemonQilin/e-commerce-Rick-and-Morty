import printCharacter from "./print-characters.js";

const d = document;

export default function loadInicio () {
    d.addEventListener('click', e => {
        if (e.target.matches('[data-inicio]') || e.target.matches('[data-inicio] *')) location.reload();
    })
}