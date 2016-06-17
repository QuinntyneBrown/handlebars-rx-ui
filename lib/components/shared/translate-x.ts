export var translateX = (element: HTMLElement, value: number): HTMLElement => {
    element.style["-moz-transform"] = "translateX(" + value + "px)";
    element.style["-webkit-transform"] = "translateX(" + value + "px)";
    element.style["-ms-transform"] = "translateX(" + value + "px)";
    element.style["transform"] = "translateX(" + value + "px)";
    return element;
}