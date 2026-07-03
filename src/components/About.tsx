import { useNavigate } from "react-router-dom";
import styles from "../styles/About.module.css";

function About() {
    const navigate = useNavigate();

    return (
        <div className={styles.main}>
            <div className={styles.card}>
                <h1 className={styles.title}>About Us</h1>
                <p className={styles.body}>
                    Welcome to FlashierCards. Index cards that you record definitions on and flip through
                    endlessly are great for memorization and quick recall. However, what if your cards were digital
                    with more personalization such as an animated background, gifs, and being easily able to
                    add shapes, colors? With the power of FlashierCards you can do just that.
                </p>
                <p className={styles.body}>
                    Established in 2026, with busy, bored students in mind, the FlashierCards team came
                    together to make studying, notes, and general learning material, a bit more flashy.
                </p>
                <p className={styles.body}>
                    If you generally find social media's infinity scroll aka doomscrolling as your #1 thing to do, try FlashierCards
                    where you can edit, study, and read in a new way. We plan on adding more features and
                    quality of life updates as time moves on.
                </p>
                <p className={styles.body}>
                    If you need support, feedback, comments, or concerns please{" "}
                    <a
                        className={styles.link}
                        href="https://forms.gle/nWyB69visGQJQEcUA"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        fill out our form and click here
                    </a>
                    .
                </p>
                <button className={styles.backBtn} onClick={() => navigate("/")}>
                    <span className={styles.btnShadow}></span>
                    <span className={styles.btnEdge}></span>
                    <span className={styles.btnFront}>Home</span>
                </button>
            </div>
        </div>
    );
}

export default About;
