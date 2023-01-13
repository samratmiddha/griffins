const debouncer = (func) => {
    let timer;
    return function(...args) {
        const context = this;
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            timer = null;
            func.apply(context, args);
        }, 500)
    }

}
export default debouncer