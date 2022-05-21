export default function errorAnimation(error, control, msg) {
    error.textContent = msg;

    control.classList.add('control-stock-animation');

    error.classList.add('error-quanty-animation');

    setTimeout(() => {
        control.classList.remove('control-stock-animation');
        error.classList.remove('error-quanty-animation');
    }, 1000)
}