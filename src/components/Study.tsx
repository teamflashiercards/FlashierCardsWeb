import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Deck.module.css";
import { useParams } from "react-router-dom";
import UserAuth from "../util/AuthContext";
import FeedbackButton from "./FeedbackButton";
import { motion } from "motion/react";
import Alert from "@mui/material/Alert";
import type Content from "../interfaces/Content";

/*
    Description: This component allows the user to study deck content.
    Last updated: 11/5/2026
*/

function Study() {
    // manage user session, error handling, and data loading
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { session } = UserAuth();

    // to set background animation based on user profile
    const [animation, setAnimation] = useState(1);

    // deck conntent related variables
    const [deckName, setDeckName] = useState();  

    // get id to fetch deck content
    const { deckId } = useParams();

    // card related variables
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardSide, setCardSide] = useState("Front");

    // to track current card
    const [cardNum, setCardNum] = useState(1);
    const [totalCards, setTotalCards] = useState(1);

    // stores deck content
    const [content, setContent] = useState<Content[]>([]);

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(styles.flip);
            setCardSide(prev => (prev === "Front") ? "Back" : "Front");
        }
    }

    function showNextCard() {
        if ((cardNum + 1) <= totalCards) {
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

    // function to fetch all the deck content from Supabase
    const fetchDeckContent = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            // returns an array with one object
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setDeckName(data[0].name);
            setContent(data[0].content);
            setTotalCards(data[0].content.length);

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    const fetchProfileAnimation = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setAnimation(data[0].animation);

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchDeckContent();
        fetchProfileAnimation();
    }, []);

    return (
        <>
            {(animation === 1) ?
                <div className={`${styles.animationBackground} ${styles.dotAnimation}`}></div>
            : 
                (animation === 2) ? 
                    <div className={`${styles.animationBackground} ${styles.diamondAnimation}`}></div>
                :
                    <></>
            }
            <div className={styles.mainContainer}>
                <Navbar />
                <div className={styles.subContainer}>
                    <div className={"app-title"}>{deckName || "Flashier Cards"}</div>
                    { (loading) ?
                        <Alert severity="info" style={{marginBottom: "0.5rem"}}>
                            Loading request...
                        </Alert>
                    :
                        (error.status) ?
                            <Alert severity="error" style={{marginBottom: "0.5rem"}}>
                                {error.message}
                            </Alert>
                        :
                            <></>
                    }
                    <div className={styles.deck}>
                        <div className={styles.card} onClick={() => flipCard()} ref={cardRef}>
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    {content[cardNum - 1]?.front_card?.text?.map((text, textIndex) =>
                                        <motion.p
                                            key={textIndex}
                                            style={{
                                                position: "fixed",
                                                width: text.width,
                                                fontFamily: "Imprima",
                                                fontSize: text.font_size,
                                                color: text.color,
                                                x: text.x,
                                                y: text.y
                                            }}
                                        >
                                            {text.value}
                                        </motion.p>
                                    )}
                                    {content[cardNum - 1]?.front_card?.gif?.map((gif, gifIndex) =>
                                        <motion.img
                                            key={gifIndex}
                                            src={gif.url}
                                            alt="gif"
                                            style={{
                                                position: "fixed",
                                                width: gif.width,
                                                height: gif.height,
                                                objectFit: "contain",
                                                x: gif.x,
                                                y: gif.y
                                            }}
                                        />
                                    )}
                                    {content[cardNum - 1]?.front_card?.sticker?.map((sticker, stickerIndex) =>
                                        <motion.img
                                            key={stickerIndex}
                                            src={sticker.url}
                                            alt="sticker"
                                            style={{
                                                position: "fixed",
                                                width: sticker.width,
                                                height: sticker.height,
                                                objectFit: "contain",
                                                x: sticker.x,
                                                y: sticker.y
                                            }}
                                        />
                                    )}
                                </div>
                                <div className={styles.cardBack}>
                                    {content[cardNum - 1]?.back_card?.text?.map((text, textIndex) =>
                                        <motion.p
                                            key={textIndex}
                                            style={{
                                                position: "fixed",
                                                width: text.width,
                                                fontFamily: "Imprima",
                                                fontSize: text.font_size,
                                                color: text.color,
                                                x: text.x,
                                                y: text.y
                                            }}
                                        >
                                            {text.value}
                                        </motion.p>
                                    )}
                                    {content[cardNum - 1]?.back_card?.gif?.map((gif, gifIndex) =>
                                        <motion.img
                                            key={gifIndex}
                                            src={gif.url}
                                            alt="gif"
                                            style={{
                                                position: "fixed",
                                                width: gif.width,
                                                height: gif.height,
                                                objectFit: "contain",
                                                x: gif.x,
                                                y: gif.y
                                            }}
                                        />
                                    )}
                                    {content[cardNum - 1]?.back_card?.sticker?.map((sticker, stickerIndex) =>
                                        <motion.img
                                            key={stickerIndex}
                                            src={sticker.url}
                                            alt="sticker"
                                            style={{
                                                position: "fixed",
                                                width: sticker.width,
                                                height: sticker.height,
                                                objectFit: "contain",
                                                x: sticker.x,
                                                y: sticker.y
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.deckNav}>
                            <button disabled={cardNum === 1} onClick={showPrevCard}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span>{cardNum}/{totalCards}</span>
                            <button disabled={cardNum === totalCards} onClick={showNextCard}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <FeedbackButton />
        </>
    );
}

export default Study;