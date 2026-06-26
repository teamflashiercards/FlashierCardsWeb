import { useEffect } from "react";
import styles from "../styles/HomeAnimation.module.css";

/*
    Description: This is an animation used on the Home, Signup, and Login components.
    Last updated: 6/6/2026
*/

// TODO: Use framer motion to create this animation

function HomeAnimation() {
    useEffect(() => {
        
        // update square position when window size changes
        const updateAnimation = () => {
            const position = window.innerWidth - 210;
            document.documentElement.style.setProperty("--move-square", `${position}px`);
        }

        // run and add event listener on mount
        updateAnimation();
        window.addEventListener("resize", updateAnimation);

        // remove event listener on umount
        return () => window.removeEventListener("resize", updateAnimation);
    }, []);

    return (
        <div className={styles.homeAnimation}>
            <div className={`${styles.shape} ${styles.square}`}></div>
            <div className={`${styles.shape} ${styles.circle}`}></div>
            <div className={`${styles.shape} ${styles.square}`}></div>
            <div className={`${styles.shape} ${styles.circle}`}></div>
        </div>
    );
}

export default HomeAnimation;