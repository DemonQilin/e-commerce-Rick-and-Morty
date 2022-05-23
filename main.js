import addProductCart from "./modules/add-cart.js";
import scrollTopButton from "./modules/boton-scroll.js";
import { toDoVisibleCart } from "./modules/btn-cart-visible.js";
import buyProduct from "./modules/buy-product.js";
import darkModeBtn from "./modules/dark-mode.js";
import deleteProductCart from "./modules/delete-product-cart.js";
import emptyCart from "./modules/empty-cart.js";
import { hamburguerMenu } from "./modules/hamburguer-menu.js";
import loadInicio from "./modules/load-inicio.js";
import loadMoreProducts from "./modules/load-more.js";
import modifyQuantyProduct from "./modules/modify-quanty.js";
import { mouseEnterBtnsVisibles, RemoveMouseEnterBtnsVisibles } from "./modules/mouse-enter-btn-lateral.js";
import { mouseEnterVisible, removeMouseEnterVisible } from "./modules/mouse-enter-filters.js";
import { observer } from "./modules/observer-slides.js";
import printCharacter from "./modules/print-characters.js";
import mediaResponsiveFunction from "./modules/set-function-responsive.js";
import slideBtnLateral from "./modules/slides-lateral-btns.js";
import slidesBtnPoint from "./modules/slides-point-btn.js";
import submitSearch from "./modules/submit-search.js";
import validarFormulario from "./modules/validar-formulario.js";

const d = document,
    w = window;

d.addEventListener('DOMContentLoaded', e => {
    darkModeBtn();
    printCharacter('https://rickandmortyapi.com/api/character');
    hamburguerMenu('.btn--menu', '.nav', '.nav-link', '.item-link');
    toDoVisibleCart('.btn-cart', '.btn-cart-hidden', '.section--cart');
    loadMoreProducts();
    scrollTopButton();
    loadInicio();
    mediaResponsiveFunction(1024, mouseEnterVisible, removeMouseEnterVisible);
    mediaResponsiveFunction(1024, mouseEnterBtnsVisibles, RemoveMouseEnterBtnsVisibles);
    observer('data-slide', 'active-carrusel-btn', 'data-btn');
    slideBtnLateral();
    slidesBtnPoint('data-btn', 'data-slide', 'data-slices-container');
    addProductCart();
    modifyQuantyProduct();
    deleteProductCart();
    emptyCart();
    buyProduct();
    validarFormulario('form-search');
    submitSearch();
})