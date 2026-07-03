import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/About.module.css";
import deckStyles from "../styles/Deck.module.css";

type CardDef     = { front: string; back: string | null; isDemo?: boolean; };
type GifItem     = { id: string; url: string; x: number; y: number; width: number; height: number; };
type TextItem    = { input: string; x: number; y: number; fontSize: number; color: string; };
type DragRef  = { type: "gif" | "text"; index: number; startMouseX: number; startMouseY: number; startItemX: number; startItemY: number; };

const cards: CardDef[] = [
    {
        front: "What is FlashierCards?",
        back: "Index cards that you record definitions on and flip through endlessly are great for memorization and quick recall. But what if your cards were digital with animated backgrounds, gifs, and shapes? With FlashierCards you can do just that."
    },
    {
        front: "Our Story",
        back: "Established in 2026, with busy, bored students in mind, the FlashierCards team came together to make studying, notes, and general learning material, a bit more flashy."
    },
    {
        front: "What's Next",
        back: "Try FlashierCards where you can edit, study, and read in a new way. We plan on adding more features and quality of life updates as time moves on."
    },
    { front: "Get in Touch", back: null },
    { front: "Try it for yourself!", back: null, isDemo: true }
];

const INIT_GIFS: GifItem[] = [
    { id: "1", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOWR4dmdmNmg3ZDBsbXE4YjhhZ2V2aGF5Y2sycmIxa2hieXo5bDQ1NCZlcD12MV9naWZzX3RyZW5kaW5nJmN0PWc/qNj0irbjMDRgeBXNlG/giphy.gif", x: 20,  y: 20,  width: 120, height: 120 },
    { id: "2", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTVweTJsYW94azdjYXJocnlheGUxczNjYXM4N3pqa284b3ozN2pzOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/111ebonMs90YLu/giphy.gif", x: 640, y: 20,  width: 120, height: 120 },
    { id: "3", url: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcG9iODEwY3p0ZW04bWV5NGZjdTI5aXF1aXlnZzdsM2l4MjZ4N2l4NiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7TKLC8zBUd7eEteE/giphy.gif",  x: 330, y: 270, width: 120, height: 120 }
];

const INIT_BACK_TEXTS: TextItem[] = [
    { input: "Making",   x: 40,  y: 40,  fontSize: 38, color: "#FF2511" },
    { input: "studying", x: 230, y: 130, fontSize: 28, color: "#016236" },
    { input: "fun",      x: 490, y: 200, fontSize: 48, color: "#621590" },
    { input: "😎",       x: 100, y: 250, fontSize: 60, color: "#FED43F" }
];

function About() {
    const navigate = useNavigate();
    const cardRef  = useRef<HTMLDivElement>(null);
    const dragRef  = useRef<DragRef | null>(null);

    const [cardNum,   setCardNum]   = useState(1);
    const [flipped,   setFlipped]   = useState(false);
    const [frontGifs, setFrontGifs] = useState<GifItem[]>(INIT_GIFS);
    const [backTexts, setBackTexts] = useState<TextItem[]>(INIT_BACK_TEXTS);

    const total = cards.length;
    const card  = cards[cardNum - 1];

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(deckStyles.flip);
            setFlipped(prev => !prev);
        }
    }

    function goToCard(num: number) {
        if (flipped) flipCard();
        setCardNum(num);
    }

    function onItemMouseDown(e: React.MouseEvent, type: "gif" | "text", index: number, itemX: number, itemY: number) {
        e.preventDefault();
        dragRef.current = { type, index, startMouseX: e.clientX, startMouseY: e.clientY, startItemX: itemX, startItemY: itemY };
    }

    function onMouseMove(e: React.MouseEvent) {
        if (!dragRef.current) return;
        const { type, index, startMouseX, startMouseY, startItemX, startItemY } = dragRef.current;
        const x = startItemX + (e.clientX - startMouseX);
        const y = startItemY + (e.clientY - startMouseY);
        if (type === "gif")  setFrontGifs(prev => prev.map((g, i) => i === index ? { ...g, x, y } : g));
        if (type === "text") setBackTexts(prev => prev.map((t, i) => i === index ? { ...t, x, y } : t));
    }

    function onMouseUp() { dragRef.current = null; }


    return (
        <motion.div
            className={styles.main}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 500, damping: 40, mass: 0.5 }}
        >
            <div className={deckStyles.deck}>
                <div
                    className={deckStyles.card}
                    onClick={card.isDemo ? undefined : flipCard}
                    style={{ cursor: card.isDemo ? "default" : "pointer" }}
                    ref={cardRef}
                >
                    <div className={deckStyles.cardInner}>

                        {/* front */}
                        <div className={deckStyles.cardFront}>
                            {card.isDemo ? (
                                <div
                                    style={{ position: "relative", width: 800, height: 400, overflow: "hidden" }}
                                    onMouseMove={onMouseMove}
                                    onMouseUp={onMouseUp}
                                    onMouseLeave={onMouseUp}
                                >
                                    <span className={styles.demoTitle}>Try it for yourself!</span>
                                    {frontGifs.map((gif, i) => (
                                        <img
                                            key={gif.id}
                                            src={gif.url}
                                            alt="gif"
                                            draggable={false}
                                            style={{ position: "absolute", left: gif.x, top: gif.y, width: gif.width, height: gif.height, cursor: "grab", userSelect: "none" }}
                                            onMouseDown={(e) => onItemMouseDown(e, "gif", i, gif.x, gif.y)}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.cardContent}>
                                    <span className={styles.cardTitle}>{card.front}</span>
                                    <span className={styles.cardHint}>click to flip</span>
                                </div>
                            )}
                        </div>

                        {/* back */}
                        <div className={deckStyles.cardBack}>
                            {card.isDemo ? (
                                <div
                                    style={{ position: "relative", width: 800, height: 400, overflow: "hidden" }}
                                    onMouseMove={onMouseMove}
                                    onMouseUp={onMouseUp}
                                    onMouseLeave={onMouseUp}
                                >
                                    {backTexts.map((t, i) => (
                                        <span
                                            key={i}
                                            style={{ position: "absolute", left: t.x, top: t.y, fontFamily: "Imprima, sans-serif", fontSize: t.fontSize, color: t.color, cursor: "grab", userSelect: "none", whiteSpace: "nowrap" }}
                                            onMouseDown={(e) => onItemMouseDown(e, "text", i, t.x, t.y)}
                                        >
                                            {t.input}
                                        </span>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.cardContent}>
                                    {card.back ? (
                                        <span className={styles.cardBody}>{card.back}</span>
                                    ) : (
                                        <span className={styles.cardBody}>
                                            If you need support, feedback, comments, or concerns please{" "}
                                            <a
                                                className={styles.link}
                                                href="https://forms.gle/nWyB69visGQJQEcUA"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                onClick={e => e.stopPropagation()}
                                            >
                                                fill out our form
                                            </a>
                                            .
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                </div>

                <div className={deckStyles.deckNav}>
                    <button disabled={cardNum === 1} onClick={() => goToCard(cardNum - 1)}>
                        <FontAwesomeIcon icon={faChevronLeft} />
                    </button>
                    <span>{cardNum}/{total}</span>
                    <button disabled={cardNum === total} onClick={() => goToCard(cardNum + 1)}>
                        <FontAwesomeIcon icon={faChevronRight} />
                    </button>
                </div>

                {card.isDemo && (
                    <div className={styles.demoHint}>
                        drag items freely •{" "}
                        <button className={styles.flipLink} onClick={flipCard}>flip card ↺</button>
                    </div>
                )}


                <div className={styles.dots}>
                    {cards.map((_, i) => (
                        <button
                            key={i}
                            className={`${styles.dot} ${cardNum === i + 1 ? styles.dotActive : ""}`}
                            onClick={() => goToCard(i + 1)}
                        />
                    ))}
                </div>
            </div>

            <button className={styles.homeBtn} onClick={() => navigate("/")}>
                Back to Home
            </button>
        </motion.div>
    );
}

export default About;
