import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import styles from "../styles/About.module.css";
import Navbar from "./Navbar";
import UserAuth from "../AuthContext";
import { useNavigate } from "react-router-dom";
import GiphyLogo from "../assets/giphyLogo.png";
import { motion } from "motion/react";

/*
    Description: This about component shares information about Flashier Cards web app.
    Last updated: 7/6/2026
*/

function About() {
    const frontCards = [
        "What is Flashier Cards?",
        "Our Story",
        "Try it for yourself!",
        "What's next?",
        "Get in Touch",
        "Attributions"
    ];

    const { session } = UserAuth();
    const navigate = useNavigate();
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardSide, setCardSide] = useState("Front");
    const [cardNum, setCardNum] = useState(1);
    const total = frontCards.length;

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(styles.flip);
            setCardSide(prev => (prev === "Front") ? "Back" : "Front");
        }
    }
    
    function showNextCard() {
        if ((cardNum + 1) <= total) {
            setCardNum(cardNum + 1);
            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    function showPrevCard() {
        if ((cardNum - 1) >= 1) {
            setCardNum(cardNum - 1);
            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    return (
        <div className={styles.mainContainer}>
            {session && <Navbar />}
            <motion.div 
                className={styles.subContainer}
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.5 }}
            >
                <div className={styles.deck}>
                    <div className={styles.card} ref={cardRef}>
                        <div className={styles.cardInner}>
                            <div className={styles.cardFront}>
                                <div className={styles.frontCardText}>
                                    {frontCards[cardNum - 1]}
                                </div>
                            </div>
                            <div className={styles.cardBack}>
                                {cardNum === 1 && 
                                    <div className={styles.backCardText}>
                                        <p>Index cards that you record definitions on and flip through endlessly are great 
                                            for memorization and quick recall. <b>But what if your index cards were digital with 
                                            animated backgrounds, gifs, and stickers?</b> With Flashier Cards, you can do just that.
                                        </p>
                                    </div>
                                }
                                {cardNum === 2 && 
                                    <div className={styles.backCardText}>
                                        <p>
                                            Established in 2026, with busy high school and university students in mind, the
                                            Flashier Cards team, composed of three university students themselves, came together 
                                            to make studying, notes, and general learning material a bit more flashy and fun.
                                        </p>
                                    </div>
                                }
                                {cardNum === 3 && 
                                    <div className={styles.backCardText}>
                                        <p className={styles.backCardHint}>drag items freely</p>
                                        <motion.img
                                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWR4dmdmNmg3ZDBsbXE4YjhhZ2V2aGF5Y2sycmIxa2hieXo5bDQ1NCZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/qNj0irbjMDRgeBXNlG/giphy.gif"
                                            alt="gif"
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                objectFit: "contain",
                                                cursor: "grab",
                                                position: "absolute",
                                                left: 20,
                                                top: 10
                                            }}
                                        />
                                        <motion.img
                                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTVweTJsYW94azdjYXJocnlheGUxczNjYXM4N3pqa284b3ozN2pzOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/111ebonMs90YLu/giphy.gif"
                                            alt="gif"
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                objectFit: "contain",
                                                cursor: "grab",
                                                position: "absolute",
                                                left: 600,
                                                top: 20
                                            }}
                                        />
                                        <motion.img
                                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG9iODEwY3p0ZW04bWV5NGZjdTI5aXF1aXlnZzdsM2l4MjZ4N2l4NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7TKLC8zBUd7eEteE/giphy.gif"
                                            alt="gif"
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                objectFit: "contain",
                                                cursor: "grab",
                                                position: "absolute",
                                                left: 320,
                                                top: 240
                                            }}
                                        />
                                        <motion.img
                                            src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmZ5bmx6cTluM2gyZjJuOW00MnFxZGU3bzl5YnVjNDJvN2VxdHdybCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/3oKIPlTwWYVUTFuCd2/giphy.gif"
                                            alt="gif"
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                width: "150px",
                                                height: "150px",
                                                objectFit: "contain",
                                                cursor: "grab",
                                                position: "absolute",
                                                left: 10,
                                                top: 250
                                            }}
                                        />
                                        <motion.p
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                fontSize: "38px",
                                                color: "#FF2511",
                                                cursor: "grab",
                                                position: "absolute",
                                                left: 200,
                                                top: 40
                                            }}
                                        >
                                            Making
                                        </motion.p>
                                        <motion.p
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                fontSize: "28px",
                                                color: "#016236",
                                                cursor: "grab",
                                                position: "absolute",
                                                left: 400,
                                                top: 125
                                            }}
                                        >
                                            studying
                                        </motion.p>
                                        <motion.p
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                fontSize: "48px",
                                                color: "#621590",
                                                cursor: "grab",
                                                position: "absolute",
                                                left: 600,
                                                top: 200
                                            }}
                                        >
                                            fun!
                                        </motion.p>
                                        <motion.span
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                fontSize: "60px",
                                                cursor: "grab",
                                                position: "absolute",
                                                left: 100,
                                                top: 250
                                            }}
                                        >
                                            😎
                                        </motion.span>
                                    </div>
                                }
                                {cardNum === 4 && 
                                    <div className={styles.backCardText}>
                                        <p>
                                            Try Flashier Cards where you can create and study content in a new way. We plan 
                                            on adding more features and quality of life updates as time moves on.
                                        </p>
                                        { !session &&
                                            <button
                                                type="button"
                                                onClick={() => navigate("/signup")}
                                                className={"fancy-btn"}
                                                style={{marginTop: "1.5rem"}}
                                            >
                                                <span className={"dark-blue-btn-shadow"}></span>
                                                <span className={"dark-blue-btn-edge"}></span>
                                                <span className={"dark-blue-btn-front"}>Sign up</span>
                                            </button>
                                        }
                                    </div>
                                }
                                {cardNum === 5 && 
                                    <div className={styles.backCardText}>
                                        <p>
                                           If you need support or would like to provide feedback, you may email us at <b>flashiercards@gmail.com</b> or&nbsp;
                                           <a
                                                href="https://forms.gle/nReYxNJtiRcLCxKi7"
                                                target="_blank"
                                            >
                                                fill out our feedback form.
                                            </a>
                                        </p>
                                    </div>
                                }
                                {cardNum === 6 && 
                                    <div className={styles.backCardText}>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <p>Gifs and stickers&nbsp;&nbsp;</p>
                                            <img src={GiphyLogo} alt="Powered by GIPHY" />
                                        </div>
                                        <a href="https://www.flaticon.com/free-icons/feedback" title="feedback icons">Feedback icons created by Freepik - Flaticon</a>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                    <div className={styles.navContainer}>
                        <div className={styles.deckNav}>
                            <button disabled={cardNum === 1} onClick={showPrevCard}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span>{cardNum}/{total}</span>
                            <button disabled={cardNum === total} onClick={showNextCard}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={() => flipCard()}
                        >
                            Flip Card
                        </button>
                    </div>
                    <div className={styles.dots}>
                        {frontCards.map((_, i) => (
                            <div
                                key={i}
                                className={`${styles.dot} ${i === (cardNum - 1) ? styles.dotActive : ""}`}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default About;