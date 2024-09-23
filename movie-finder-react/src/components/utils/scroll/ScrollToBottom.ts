const ScrollToBottom = () => {
    window.scrollTo({
        top : document.documentElement.scrollHeight,
        behavior: "smooth",
    });
}

export default ScrollToBottom;