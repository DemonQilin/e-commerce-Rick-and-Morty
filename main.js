import { hamburguerMenu } from "./modules/hamburguer-menu.js";
import { mouseEnterVisible, removeMouseEnterVisible } from "./modules/mouse-enter-filters.js";
import printCharacter from "./modules/print-characters.js";
import mediaResponsiveFunction from "./modules/set-function-responsive.js";

const d = document,
    w = window;

d.addEventListener('DOMContentLoaded', e => {
    printCharacter();
    hamburguerMenu('.btn--menu', '.nav', '.nav-link', '.item-link');
    mediaResponsiveFunction(1024, mouseEnterVisible, removeMouseEnterVisible)
})