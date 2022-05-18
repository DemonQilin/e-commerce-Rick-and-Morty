const d = document,
    w = window;

export default function mediaResponsiveFunction(breakpoint1, checkFn1, noCheckFn, breakpoint2 = undefined, checkFn2 = undefined) {
    const $mediaQuery1 = w.matchMedia(`(min-width: ${breakpoint1}px)`),
        $mediaQuery2 = breakpoint2 === undefined
            ? undefined
            : w.matchMedia(`(min-width: ${breakpoint2}px)`);
    
    let responsive;

    responsive = (media1, media2) => {
        if (media1.matches) {
            checkFn1()
        } else if (media2 !== undefined && media2.matches) {
            checkFn2()
        } else {
            noCheckFn()
        }
    }

    responsive($mediaQuery1, $mediaQuery2);

    $mediaQuery1.addEventListener('change', e => {
        responsive(e, $mediaQuery2);
    });

    if ($mediaQuery2 !== undefined) $mediaQuery2.addEventListener('change', e => {
        responsive($mediaQuery1, e);
    })
}