import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import styles from "../../styles/Deck.module.css";
import { useParams } from "react-router-dom";
import UserAuth from "../../util/AuthContext";
import type Card from "../../interfaces/Card";
import FeedbackButton from "../FeedbackButton";
import StickerSidePanel from "./StickerSidePanel";
import TextSidePanel from "./TextSidePanel";
import GifSidePanel from "./GifSidePanel";
import EditToolbar from "./EditToolbar";
import { motion } from "motion/react";
import { createCard, deleteCard } from "./EditCardHelpers";
import { setFrontCard, setBackCard } from "./EditContentHelpers";
import { updateFrontCard, updateBackCard } from "./EditContentHelpers";
import { deleteFrontCard, deleteBackCard } from "./EditContentHelpers";

/*
    Description: This component allows the user create, update, or delete deck content.
    Last updated: 8/10/2026
*/

function Edit() {
    // fetch related variables
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
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

    // side panel related variables
    const [textPanel, setTextPanel] = useState(false);
    const [gifPanel, setGifPanel] = useState(false);
    const [stickerPanel, setStickerPanel] = useState(false);

    // text related variables
    const [text, setText] = useState("");
    const [textTools, setTextTools] = useState(false);
    const [textIndex, setTextIndex] = useState<number | null>(null);
    
    // gif related variables
    const [gifTools, setGifTools] = useState(false);
    const [gifIndex, setGifIndex] = useState<number | null>(null);

    // sticker realted tools
    const [stickerTools, setStickerTools] = useState(false);
    const [stickerIndex, setStickerIndex] = useState<number | null>(null);

    // function to fetch deck name from Supabase
    const fetchDeckName = async () => {
        setLoading(true);

        try {
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

    // function to fetch all the deck content from Supabase
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

    // function to save deck content in Supabase
    const saveDeckContent = async () => {
        setLoading(true);
    
        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}/save`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    front_cards: frontCards,
                    back_cards: backCards
                })
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
    
        } catch(error: any) {
            setError({ status: true, message: error.message });
    
        } finally {
            setLoading(false);
        }
    };

    // function to create text, gifs, and stickers with helpers in EditHelpers
    function createContent(contentType: string, initialContent: any) {
        if (cardSide === "Front") {
            let content = {id: null, card_id: frontCards[cardNum - 1].id, ...initialContent};
            setFrontCard(contentType, content, setFrontCards, cardNum);
        } else {
            let content = {id: null, card_id: backCards[cardNum - 1].id, ...initialContent};
            setBackCard(contentType, content, setBackCards, cardNum);
        }
    }

    // function to update text, gifs, and stickers with helpers in EditHelpers
    function updateContent(contentType: string, contentKey: string, contentValue: string, contentIndex: number,) {
        if (cardSide === "Front") {
            updateFrontCard(contentType, contentKey, contentValue, contentIndex, setFrontCards, cardNum);
        } else {
            updateBackCard(contentType, contentKey, contentValue, contentIndex, setBackCards, cardNum);
        }
    }

    // function to delete text, gifs, and stickers with helpers in EditHelpers
    function deleteContent(contentType: string, contentIndex: number) {
        if (cardSide === "Front") {
            deleteFrontCard(contentType, contentIndex, setFrontCards, cardNum);
        } else {
            deleteBackCard(contentType, contentIndex, setBackCards, cardNum);
        }
        hideSidePanelTools();
    }

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(styles.flip);
            setCardSide(prev => (prev === "Front") ? "Back" : "Front");
        }
    }

    function showNextCard() {
        if ((cardNum + 1) <= total) {
            hideSidePanelTools();
            setCardNum(cardNum + 1);

            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    function showPrevCard() {
        if ((cardNum - 1) >= 1) {
            hideSidePanelTools();
            setCardNum(cardNum - 1);

            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    function openSidePanel(panel: string) {
        // close any open side panel first
        closeSidePanel();

        if (panel === "text") {
            setTextPanel(true);

        } else if (panel === "gif") {
            setGifPanel(true);
            
        } else if (panel === "sticker") {
            setStickerPanel(true);
        }
    }

    function closeSidePanel() {
        // hide any tools open in side panels first
        hideSidePanelTools();

        if (textPanel) {
            setTextPanel(false);

        } else if (gifPanel) {
            setGifPanel(false);

        } else if (stickerPanel) {
            setStickerPanel(false);
        }
    }

    function hideSidePanelTools() {
        if (textPanel) {
            setTextIndex(null);
            setTextTools(false); 
            setText("");

        } else if (gifPanel) {
            setGifIndex(null);
            setGifTools(false);

        } else if (stickerPanel) {
            setStickerIndex(null);
            setStickerTools(false);
        }
    }

    useEffect(() => {
        fetchDeckName();
        fetchDeckContent();
    }, []);

    return (
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
                <EditToolbar
                    createCard={() => createCard(deckId, total, setTotal, frontCards, setFrontCards, backCards, setBackCards, setError)}
                    openSidePanel={openSidePanel}
                    deleteCard={() => deleteCard(total, setTotal, cardNum, setCardNum, setFrontCards, setBackCards)}
                    flipCard={flipCard}
                    saveDeckContent={saveDeckContent}
                    closeSidePanel={closeSidePanel}
                />
                <div className={styles.mainPanel}>
                    <div className={styles.deck}>
                        <div className={styles.card} ref={cardRef}>
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    {frontCards[cardNum - 1]?.text?.map((text, textIndex) =>
                                        <motion.p
                                            key={textIndex}
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                position: "fixed",
                                                width: text.width,
                                                fontFamily: "Imprima",
                                                fontSize: text.font_size,
                                                color: text.color,
                                                x: text.x,
                                                y: text.y
                                            }}
                                            whileHover={{
                                                cursor: "grab",
                                            }}
                                            whileDrag={{
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                openSidePanel("text");
                                                setText(text.input);
                                                setTextIndex(textIndex);
                                                setTextTools(true);                                                
                                            }}
                                            onDragEnd={(_event, info) => {
                                                setFrontCards(prevCards =>
                                                    prevCards.map((card, cardIndex) =>
                                                        cardIndex === (cardNum - 1) ? {
                                                            ...card,
                                                            text: card.text.map((tmp, i) =>
                                                                i === textIndex ? {...tmp, x: Math.round(tmp.x + info.offset.x), y: Math.round(tmp.y + info.offset.y)} : tmp
                                                            )
                                                        } : card
                                                    )
                                                );
                                            }}
                                        >
                                            {text.input}
                                        </motion.p>
                                    )}
                                    {frontCards[cardNum - 1]?.gif?.map((gif, gifIndex) =>
                                        <motion.img
                                            key={gifIndex}
                                            src={gif.url}
                                            alt="gif"
                                            drag
                                            dragMomentum={false}
                                            // dragElastic={0}
                                            style={{
                                                position: "fixed",
                                                width: gif.width,
                                                height: gif.height,
                                                objectFit: "contain",
                                                x: gif.x,
                                                y: gif.y
                                            }}
                                            whileHover={{
                                                cursor: "grab",
                                                boxShadow: "0px 0px 20px 5px rgba(78, 119, 162, 0.33)",
                                                scale: 1.05
                                            }}
                                            whileDrag={{
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                openSidePanel("gif");
                                                setGifIndex(gifIndex);
                                                setGifTools(true);
                                            }}
                                            onDragEnd={(_event, info) => {
                                                setFrontCards(prevCards =>
                                                    prevCards.map((card, cardIndex) =>
                                                        cardIndex === (cardNum - 1) ? {
                                                            ...card,
                                                            gif: card.gif.map((tmp, i) =>
                                                                i === gifIndex ? {...tmp, x: Math.round(tmp.x + info.offset.x), y: Math.round(tmp.y + info.offset.y)} : tmp
                                                            )
                                                        } : card
                                                    )
                                                );
                                            }}
                                        />
                                    )}
                                    {frontCards[cardNum - 1]?.sticker?.map((sticker, stickerIndex) =>
                                        <motion.img
                                            key={stickerIndex}
                                            src={sticker.url}
                                            alt="sticker"
                                            drag
                                            dragMomentum={false}
                                            // dragElastic={0}
                                            style={{
                                                position: "fixed",
                                                width: sticker.width,
                                                height: sticker.height,
                                                objectFit: "contain",
                                                x: sticker.x,
                                                y: sticker.y
                                            }}
                                            whileHover={{
                                                cursor: "grab",
                                                boxShadow: "0px 0px 20px 5px rgba(78, 119, 162, 0.33)",
                                                scale: 1.05
                                            }}
                                            whileDrag={{
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                openSidePanel("sticker");
                                                setStickerIndex(stickerIndex);
                                                setStickerTools(true);
                                            }}
                                            onDragEnd={(_event, info) => {
                                                setFrontCards(prevCards =>
                                                    prevCards.map((card, cardIndex) =>
                                                        cardIndex === (cardNum - 1) ? {
                                                            ...card,
                                                            sticker: card.sticker.map((tmp, i) =>
                                                                i === stickerIndex ? {...tmp, x: Math.round(tmp.x + info.offset.x), y: Math.round(tmp.y + info.offset.y)} : tmp
                                                            )
                                                        } : card
                                                    )
                                                );
                                            }}
                                        />
                                    )}
                                </div>
                                <div className={styles.cardBack}>
                                    {backCards[cardNum - 1]?.text?.map((text, textIndex) =>
                                        <motion.p
                                            key={textIndex}
                                            drag
                                            dragMomentum={false}
                                            style={{
                                                position: "fixed",
                                                width: text.width,
                                                fontFamily: "Imprima",
                                                fontSize: text.font_size,
                                                color: text.color,
                                                x: text.x,
                                                y: text.y
                                            }}
                                            whileHover={{
                                                cursor: "grab",
                                            }}
                                            whileDrag={{
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                openSidePanel("text");
                                                setText(text.input);
                                                setTextIndex(textIndex);
                                                setTextTools(true);
                                            }}
                                            onDragEnd={(_event, info) => {
                                                setBackCards(prevCards =>
                                                    prevCards.map((card, cardIndex) =>
                                                        cardIndex === (cardNum - 1) ? {
                                                            ...card,
                                                            text: card.text.map((tmp, i) =>
                                                                i === textIndex ? {...tmp, x: Math.round(tmp.x + info.offset.x), y: Math.round(tmp.y + info.offset.y)} : tmp
                                                            )
                                                        } : card
                                                    )
                                                );
                                            }}
                                        >
                                            {text.input}
                                        </motion.p>
                                    )}
                                    {backCards[cardNum - 1]?.gif?.map((gif, gifIndex) =>
                                        <motion.img
                                            key={gifIndex}
                                            src={gif.url}
                                            alt="gif"
                                            drag
                                            dragMomentum={false}
                                            // dragElastic={0}
                                            style={{
                                                position: "fixed",
                                                width: gif.width,
                                                height: gif.height,
                                                objectFit: "contain",
                                                x: gif.x,
                                                y: gif.y
                                            }}
                                            whileHover={{
                                                cursor: "grab",
                                                boxShadow: "0px 0px 20px 5px rgba(78, 119, 162, 0.33)",
                                                scale: 1.05
                                            }}
                                            whileDrag={{
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                openSidePanel("gif");
                                                setGifIndex(gifIndex);
                                                setGifTools(true);
                                            }}
                                            onDragEnd={(_event, info) => {
                                                setBackCards(prevCards =>
                                                    prevCards.map((card, cardIndex) =>
                                                        cardIndex === (cardNum - 1) ? {
                                                            ...card,
                                                            gif: card.gif.map((tmp, i) =>
                                                                i === gifIndex ? {...tmp, x: Math.round(tmp.x + info.offset.x), y: Math.round(tmp.y + info.offset.y)} : tmp
                                                            )
                                                        } : card
                                                    )
                                                );
                                            }}
                                        />
                                    )}
                                    {backCards[cardNum - 1]?.sticker?.map((sticker, stickerIndex) =>
                                        <motion.img
                                            key={stickerIndex}
                                            src={sticker.url}
                                            alt="sticker"
                                            drag
                                            dragMomentum={false}
                                            // dragElastic={0}
                                            style={{
                                                position: "fixed",
                                                width: sticker.width,
                                                height: sticker.height,
                                                objectFit: "contain",
                                                x: sticker.x,
                                                y: sticker.y
                                            }}
                                            whileHover={{
                                                cursor: "grab",
                                                boxShadow: "0px 0px 20px 5px rgba(78, 119, 162, 0.33)",
                                                scale: 1.05
                                            }}
                                            whileDrag={{
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                openSidePanel("sticker");
                                                setStickerIndex(stickerIndex);
                                                setStickerTools(true);
                                            }}
                                            onDragEnd={(_event, info) => {
                                                setBackCards(prevCards =>
                                                    prevCards.map((card, cardIndex) =>
                                                        cardIndex === (cardNum - 1) ? {
                                                            ...card,
                                                            sticker: card.sticker.map((tmp, i) =>
                                                                i === stickerIndex ? {...tmp, x: Math.round(tmp.x + info.offset.x), y: Math.round(tmp.y + info.offset.y)} : tmp
                                                            )
                                                        } : card
                                                    )
                                                );
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
                            <span>{cardSide} of Card {cardNum}/{total}</span>
                            <button disabled={cardNum === total} onClick={showNextCard}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                    { textPanel &&
                        <TextSidePanel
                            textTools={textTools}
                            text={text}
                            setText={setText}
                            textIndex={textIndex}
                            createText={createContent}
                            updateText={updateContent}
                            deleteText={deleteContent}
                        />
                    }
                    { gifPanel &&
                        <GifSidePanel
                            setLoading={setLoading}
                            setError={setError}
                            gifTools={gifTools}
                            gifIndex={gifIndex}
                            createGif={createContent}
                            deleteGif={deleteContent}
                        />
                    }
                    { stickerPanel &&
                        <StickerSidePanel
                            setLoading={setLoading}
                            setError={setError}
                            stickerTools={stickerTools}
                            stickerIndex={stickerIndex}
                            createSticker={createContent}
                            deleteSticker={deleteContent}
                        />
                    }
                </div>
            </div>
            <FeedbackButton />
        </div>
    );
}

export default Edit;