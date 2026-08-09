import Navbar from "../Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
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
import type Giphy from "../../interfaces/Giphy";
import { motion } from "motion/react";
import { createGif, deleteGif } from "./EditGifHelpers";
import { createSticker, deleteSticker } from "./EditStickerHelpers";

/*
    Description: This component allows the user create, update, or delete deck content.
    Last updated: 8/3/2026
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
    const [textTools, setTextTools] = useState(false);
    const [text, setText] = useState("");
    const [textIndex, setTextIndex] = useState<number | null>();
    
    // gif related variables
    const [gifTools, setGifTools] = useState(false);
    const [gifResults, setGifResults] = useState<Giphy[] | null>([]);
    const [gifIndex, setGifIndex] = useState<number | null>(null);

    // sticker realted tools
    const [stickerTools, setStickerTools] = useState(false);
    const [stickerResults, setStickerResults] = useState<Giphy[] | null>([]);
    const [stickerIndex, setStickerIndex] = useState<number | null>(null);

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
            //fetchDeckContent();

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    // card file
    function createCard() {
        if ((total + 1) <= 20) {
            setTotal(total + 1);
            setFrontCards([...frontCards, {id: null, deck_id: Number(deckId), card_num: (total + 1), card_side: "front", text: [], gif: [], sticker: []}]);
            setBackCards([...backCards, {id: null, deck_id: Number(deckId), card_num: (total + 1), card_side: "back", text: [], gif: [], sticker: []}]);
        } else {
            setError({ status: true, message: "You can only create up to 20 cards in a deck." });
        }
    }

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(styles.flip);
            setCardSide(prev => (prev === "Front") ? "Back" : "Front");
        }
    }

    function showNextCard() {
        if ((cardNum + 1) <= total) {
            showTextTools(false, null, "");
            setCardNum(cardNum + 1);
            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    function showPrevCard() {
        if ((cardNum - 1) >= 1) {
            showTextTools(false, null, "");
            setCardNum(cardNum - 1);
            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    // card file
    function updateCardNumbers() {
        setFrontCards(prevCards =>
            prevCards.map((card, index) => (
                {...card, card_num: (index + 1)}
            ))
        );
        setBackCards(prevCards =>
            prevCards.map((card, index) => (
                {...card, card_num: (index + 1)}
            ))
        );
    }

    // card file
    function deleteCard() {
        if ((total - 1) >= 1) {
            setTotal(total - 1);
            setFrontCards(prev => prev.filter((_, index) => index != (cardNum - 1)));
            setBackCards(prev => prev.filter((_, index) => index != (cardNum - 1)));
            updateCardNumbers();
            if (cardNum > 1) {
                setCardNum(cardNum - 1);
            } else {
                setCardNum(1);
            }
        }
    }

    function showSidePanel(panel: string) {
        // close any open side panels first
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
        if (textPanel) {
            setTextPanel(false);
            showTextTools(false, null, "");
        } else if (gifPanel) {
            setGifPanel(false);
            showGifTools(false, null, null);
        } else if (stickerPanel) {
            setStickerPanel(false);
            showStickerTools(false, null, null);
        }
    }
    
    function showTextTools(request: boolean, textIndex: number | null, input: string) {
        setText(input);
        setTextIndex(textIndex);
        setTextTools(request); 
    }

    function showGifTools(request: boolean, gifIndex: number | null, gifResults: Giphy[] | null) {
        setGifIndex(gifIndex);
        setGifTools(request);
        setGifResults(gifResults);
    } 


    // gif file
    function makeGif(url: string){
        createGif(url, cardSide, cardNum, frontCards, backCards, setFrontCards, setBackCards )
    }
    /* function createGif(gifUrl: string) {
        if (cardSide == "Front") {
            let tmp = {id: null, card_id: frontCards[cardNum - 1].id, url: gifUrl, width: 120, height: 120, x: 50, y: 50};
            setFrontCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: [...card.gif, tmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            let tmp = {id: null, card_id: backCards[cardNum - 1].id, url: gifUrl, width: 120, height: 120, x: 50, y: 50};
            setBackCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: [...card.gif, tmp]} : card
                )
            );
        }
    }*/

    function showStickerTools(request: boolean, stickerIndex: number | null, stickerResults: Giphy[] | null) {
        setStickerIndex(stickerIndex);
        setStickerTools(request);
        setStickerResults(stickerResults);
    }

    // gif file
    /* function deleteGif() {
        if (cardSide === "Front") {
            setFrontCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: card.gif.filter((_, index) =>
                        index != gifIndex
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: card.gif.filter((_, index) =>
                        index != gifIndex
                    )} : card
                )
            );
        }
        showGifTools(false, null, gifResults);
    } */
    function removeGif () {
        deleteGif(gifIndex, gifResults, showGifTools, cardSide, cardNum, setFrontCards, setBackCards)
    }

    // sticker file
    /* function createSticker(stickerUrl: string) {
        if (cardSide == "Front") {
            let tmp = {id: null, card_id: frontCards[cardNum - 1].id, url: stickerUrl, width: 120, height: 120, x: 50, y: 50};
            setFrontCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, sticker: [...card.sticker, tmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            let tmp = {id: null, card_id: backCards[cardNum - 1].id, url: stickerUrl, width: 120, height: 120, x: 50, y: 50};
            setBackCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, sticker: [...card.sticker, tmp]} : card
                )
            );
        }
    } */
   function makeSticker(stickerUrl: string){
        createSticker(stickerUrl, cardSide, cardNum, frontCards, backCards, setFrontCards, setBackCards)
   }

    // sticker file
    /* function deleteSticker() {
        if (cardSide === "Front") {
            setFrontCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, sticker: card.sticker.filter((_, index) =>
                        index != stickerIndex
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, sticker: card.sticker.filter((_, index) =>
                        index != stickerIndex
                    )} : card
                )
            );
        }
        showStickerTools(false, null, stickerResults);
    } */

    function removeSticker(){
        deleteSticker(stickerIndex, stickerResults, showStickerTools, cardSide, cardNum, setFrontCards, setBackCards)
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
                    createCard={createCard}
                    showSidePanel={showSidePanel}
                    deleteCard={deleteCard}
                    flipCard={flipCard}
                    saveDeckContent={saveDeckContent}
                    closeSidePanel={closeSidePanel}
                />
                <div className={styles.mainPanel}>
                    <div className={styles.deck}>
                        <div className={styles.card} ref={cardRef}>
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    {/* <Stage
                                        width={800}
                                        height={400}
                                        onClick={(e) => {
                                            if (e.target === e.target.getStage()) {
                                                showTextTools(false, null, "");
                                            }
                                        }}
                                    ></Stage> */}
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
                                            onDoubleClick={() => {
                                                showSidePanel("text");
                                                showTextTools(true, textIndex, text.input);
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
                                                boxShadow: "0px 0px 20px 5px rgba(78, 119, 162, 0.65)",
                                                scale: 1.05
                                            }}
                                            whileDrag={{
                                                scale: 1.03,
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                showSidePanel("gif");
                                                showGifTools(true, gifIndex, gifResults);
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
                                                boxShadow: "0px 0px 20px 5px rgba(78, 119, 162, 0.65)",
                                                scale: 1.05
                                            }}
                                            whileDrag={{
                                                scale: 1.03,
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                showSidePanel("sticker");
                                                showStickerTools(true, stickerIndex, stickerResults);
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
                                            onDoubleClick={() => {
                                                showSidePanel("text");
                                                showTextTools(true, textIndex, text.input);
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
                                                boxShadow: "0px 0px 20px 5px rgba(78, 119, 162, 0.65)",
                                                scale: 1.05
                                            }}
                                            whileDrag={{
                                                scale: 1.03,
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                showSidePanel("gif");
                                                showGifTools(true, gifIndex, gifResults);
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
                                                boxShadow: "0px 0px 20px 5px rgba(78, 119, 162, 0.65)",
                                                scale: 1.05
                                            }}
                                            whileDrag={{
                                                scale: 1.03,
                                                cursor: "grabbing"
                                            }}
                                            onDoubleClick={() => {
                                                showSidePanel("sticker");
                                                showStickerTools(true, stickerIndex, stickerResults);
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
                            showTextTools={showTextTools}
                            cardSide={cardSide}
                            cardNum={cardNum}
                            text={text}
                            setText={setText}
                            textIndex={textIndex}
                            frontCards={frontCards}
                            setFrontCards={setFrontCards}
                            backCards={backCards}
                            setBackCards={setBackCards}
                        />
                    }
                    { gifPanel &&
                        <GifSidePanel
                            createGif={makeGif}
                            gifTools={gifTools}
                            deleteGif={removeGif}
                            setLoading={setLoading}
                            setError={setError}
                        />
                    }
                    { stickerPanel &&
                        <StickerSidePanel
                            stickerTools={stickerTools}
                            createSticker={makeSticker}
                            deleteSticker={removeSticker}
                            setLoading={setLoading}
                            setError={setError}
                        />
                    }
                </div>
            </div>
            <FeedbackButton />
        </div>
    );
}

export default Edit;