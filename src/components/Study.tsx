import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Deck.module.css";
import { useParams } from "react-router-dom";
import type Card from "../interfaces/Card";
import UserAuth from "../AuthContext";
import FeedbackButton from "./FeedbackButton";

/*
    Description: This component allows the user to study deck content.
    Last updated: 6/28/2026
*/

function Study() {
    // fetch related variables
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const [animation, setAnimation] = useState(1);
    const { session } = UserAuth();

    // deck conntent related variables
    const { deckId } = useParams();
    const [deckName, setDeckName] = useState();
    const [frontCards, setFrontCards] = useState<Card[]>([]);
    const [backCards, setBackCards] = useState<Card[]>([]);    

    // card related variables
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardSide, setCardSide] = useState("Front");
    const [cardNum, setCardNum] = useState(1);
    const [total, setTotal] = useState(1);

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

    const fetchDeckName = async () => {
        setLoading(true);

        try {
            // get specific deck from Supabase
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setDeckName(data[0].name);
        
        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    const fetchDeckContent = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}/content`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            setFrontCards(data.front_cards);
            setBackCards(data.back_cards);
            setTotal(data.front_cards.length);

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
        fetchDeckName();
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
                        <div className={"error-message"}>
                            Loading request...
                        </div>
                    :
                        (error.status) ?
                            <div className={"error-message"}>{error.message}</div>
                        :
                            <></>
                    }
                    <div className={styles.deck}>
                        <div className={styles.card} onClick={() => flipCard()} ref={cardRef}>
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    {frontCards[cardNum - 1]?.text?.map((text, textId) =>
                                        <div 
                                            key={textId}
                                            style={{
                                                width: text.width + "px",
                                                color: text.color,
                                                fontSize: text.font_size,
                                                fontFamily: "Imprima, sans-serif",
                                                position: "absolute",
                                                left: text.x + "px",
                                                top: text.y + "px"
                                            }}
                                        >
                                            {text.input}
                                        </div>
                                    )}
                                    {frontCards[cardNum - 1]?.gif?.map((gif, gifId) =>
                                        <img 
                                            key={gifId}
                                            src={gif.url}
                                            alt="gif"
                                            style={{
                                                width: gif.width + "px",
                                                height: gif.height + "px",
                                                position: "absolute",
                                                left: gif.x + "px",
                                                top: gif.y + "px"
                                            }}
                                        />
                                    )}
                                    {frontCards[cardNum - 1]?.sticker?.map((sticker, stickerId) =>
                                        <img 
                                            key={stickerId}
                                            src={sticker.url}
                                            alt="sticker"
                                            style={{
                                                width: sticker.width + "px",
                                                height: sticker.height + "px",
                                                position: "absolute",
                                                left: sticker.x + "px",
                                                top: sticker.y + "px"
                                            }}
                                        />
                                    )}
                                </div>
                                <div className={styles.cardBack}>
                                    {backCards[cardNum - 1]?.text?.map((text, textId) =>
                                        <div 
                                            key={textId}
                                            style={{
                                                width: text.width + "px",
                                                color: text.color,
                                                fontSize: text.font_size,
                                                fontFamily: "Imprima, sans-serif",
                                                position: "absolute",
                                                left: text.x + "px",
                                                top: text.y + "px"
                                            }}
                                        >
                                            {text.input}
                                        </div>
                                    )}
                                    {backCards[cardNum - 1]?.gif?.map((gif, gifId) =>
                                        <img 
                                            key={gifId}
                                            src={gif.url}
                                            alt="gif"
                                            style={{
                                                width: gif.width + "px",
                                                height: gif.height + "px",
                                                position: "absolute",
                                                left: gif.x + "px",
                                                top: gif.y + "px"
                                            }}
                                        />
                                    )}
                                    {backCards[cardNum - 1]?.sticker?.map((sticker, stickerId) =>
                                        <img 
                                            key={stickerId}
                                            src={sticker.url}
                                            alt="sticker"
                                            style={{
                                                width: sticker.width + "px",
                                                height: sticker.height + "px",
                                                position: "absolute",
                                                left: sticker.x + "px",
                                                top: sticker.y + "px"
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
                            <span>{cardNum}/{total}</span>
                            <button disabled={cardNum === total} onClick={showNextCard}>
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