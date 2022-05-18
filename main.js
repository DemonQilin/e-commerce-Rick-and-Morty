import { hamburguerMenu } from "./modules/hamburguer-menu.js";
import printCharacter from "./modules/print-characters.js";

const d = document,
    w = window;

d.addEventListener('DOMContentLoaded', e => {
    printCharacter();
    hamburguerMenu('.btn--menu', '.nav', '.nav-link','.item-link');
})