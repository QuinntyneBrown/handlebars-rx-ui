import { translateX } from "./translate-x";

var translateXAsync: any = (element: HTMLElement, value: number) => new Promise((resolve, reject) => {
    translateX(element, value);
    element.addEventListener('transitionend', onTransitionEnd, false);
    function onTransitionEnd() {
        element.removeEventListener('transitionend', onTransitionEnd);
        resolve();
    }
});