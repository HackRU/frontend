import { useEffect, useState } from "react";

export function userScrolled(scroll_y_threshold: number = 0) {
    const [userScrolled, setUserScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > scroll_y_threshold) {
                setUserScrolled(true);
            } else {
                setUserScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return userScrolled;
}

export default { userScrolled };