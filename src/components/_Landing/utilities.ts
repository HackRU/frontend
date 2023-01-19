
export function randomizeAnimationDurations(className: string, min: number, max: number) {
    const floatingComponents = document.getElementsByClassName(className);
    for (let i = 0; i < floatingComponents.length; i++) {
        const randomDuration = Math.random() * (max - min) + min;
        floatingComponents[i].setAttribute(
            "style",
            `animation-duration: ${randomDuration}s`
        );
    }
}
