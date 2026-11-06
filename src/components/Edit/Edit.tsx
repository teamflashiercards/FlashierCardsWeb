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
import Alert from '@mui/material/Alert';
import type Content from "../../interfaces/Content";
import type Text from "../../interfaces/Text";
import type Gif from "../../interfaces/Gif";
import type Sticker from "../../interfaces/Sticker";
import DisplayText from "./DisplayText";
import DisplayGiphy from "./DisplayGiphy";

// https://mui.com/material-ui/react-alert/

/*
    Description: This component allows the user create, update, or delete deck content.
    Last updated: 10/31/2026
*/

function Edit() {
    // manage user session, error handling, and data loading
    const { session } = UserAuth();
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    
    // card related variables
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardSide, setCardSide] = useState("Front");

    // manage when side panels and their tools are shown
    const [showTextTools, setShowTextTools] = useState(false);
    const [showTextPanel, setShowTextPanel] = useState(false);

    const [showGifTools, setShowGifTools] = useState(false);
    const [showGifPanel, setShowGifPanel] = useState(false);

    const [showStickerTools, setShowStickerTools] = useState(false);
    const [showStickerPanel, setShowStickerPanel] = useState(false);

    // to manage text input
    const [text, setText] = useState("");

    // to alert user if data has been changed but not saved
    const [dataChanged, setDataChanged] = useState(false);

    // get id to fetch deck content
    const { deckId } = useParams();

    // stores deck name to display as title
    const [deckName, setDeckName] = useState<string>("");

    // stores deck content
    const [content, setContent] = useState<Content[]>([]);

    // to track current card
    const [cardNum, setCardNum] = useState(1);
    const [totalCards, setTotalCards] = useState(1);

    // to track text, gif, or sticker selected
    const [contentIndex, setContentIndex] = useState<number | null>(null);

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

    // function to save deck content in Supabase
    const saveDeckContent = async () => {
        setLoading(true);
    
        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}/content`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    content: content
                })
            });
    
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
    
        } catch(error: any) {
            setError({ status: true, message: error.message });
    
        } finally {
            setLoading(false);
            setDataChanged(false);  // modified data has been saved
        }
    };

    function flipCard() {
        if (cardRef.current) {
            cardRef.current.classList.toggle(styles.flip);
            setCardSide(prev => (prev === "Front") ? "Back" : "Front");
        }
    }

    function showNextCard() {
        if ((cardNum + 1) <= totalCards) {
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
            setShowTextPanel(true);
        } else if (panel === "gif") {
            setShowGifPanel(true);
        } else if (panel === "sticker") {
            setShowStickerPanel(true);
        }
    }

    function closeSidePanel() {
        // hide any tools open in side panel first
        hideSidePanelTools();

        if (showTextPanel) {
            setShowTextPanel(false);
        } else if (showGifPanel) {
            setShowGifPanel(false);
        } else if (showStickerPanel) {
            setShowStickerPanel(false);
        }
    }

    function hideSidePanelTools() {
        // set any selected object to null
        setContentIndex(null);

        if (showTextPanel) {
            setShowTextTools(false); 
            setText("");
        } else if (showGifPanel) {
            setShowGifTools(false);
        } else if (showStickerPanel) {
            setShowStickerTools(false);
        }
    }

    // create a new card in the deck
    function addCard() {
        if (totalCards + 1 <= 15) {
            const newCard = {
                "front_card": { "text": [], "gif": [], "sticker": [] },
                "back_card": { "text": [], "gif": [], "sticker": [] }
            };
            setContent(prevContent => [...prevContent, newCard]);
            setTotalCards(prevTotal => prevTotal + 1);
        } else {
            setError({ status: true, message: "You can only create up to 15 cards in a deck." });
        }        
    }

    // deletes current card in the deck
    function deleteCard() {
        if (totalCards - 1 >= 1) {
            setContent(prevContent => prevContent.filter((_, cardIndex) => cardIndex != cardNum - 1));
            (cardNum > 1) ? setCardNum(prevCardNum => prevCardNum - 1) : setCardNum(1);
            setTotalCards(prevTotal => prevTotal - 1);
        }
    }

    // adds text, gifs, or stickers to card
    function insertCardContent(type: string, card: Card, newContent: Text | Gif | Sticker) {
        if (type === "text") {
            return {...card, text: [...card.text, newContent as Text]};
        } else if (type === "gif") {
            return {...card, gif: [...card.gif, newContent as Gif]};
        } else if (type === "sticker") {
            return {...card, sticker: [...card.sticker, newContent as Sticker]};
        }
        return card;
    }

    // adds text, gifs, or stickers to front or back card
    function insertContent(type: string, newContent: Text | Gif | Sticker) {
        setContent(prevContent => prevContent.map((card: Content, cardIndex) =>
            (cardIndex === cardNum - 1) ? (cardSide === "Front") ?
                {...card, front_card: insertCardContent(type, card.front_card, newContent)}
                : {...card, back_card: insertCardContent(type, card.back_card, newContent)}
            : card
        ));
        setDataChanged(true);
    }

    // updates text, gifs, or stickers on card
    function updateCardContent(type: string, card: Card, key: string, value: string | number) {
        if (type === "text") {
            return {...card, text: card.text.map((cardText, textIndex) =>
                (textIndex === contentIndex) ? {...cardText, [key]: value} : cardText
            )};
        } else if (type === "gif") {
            return {...card, gif: card.gif.map((cardGif, gifIndex) =>
                (gifIndex === contentIndex) ? {...cardGif, [key]: value} : cardGif
            )};
        } else if (type === "sticker") {
            return {...card, sticker: card.sticker.map((cardSticker, stickerIndex) =>
                (stickerIndex === contentIndex) ? {...cardSticker, [key]: value} : cardSticker
            )};
        }
        return card;
    }

    // updates text, gifs, or stickers on front or back card
    function updateContent(type: string, key: string, value: string | number) {
        setContent(prevContent => prevContent.map((card: Content, cardIndex) =>
            (cardIndex === cardNum - 1) ? (cardSide === "Front") ?
                {...card, front_card: updateCardContent(type, card.front_card, key, value)}
                : {...card, back_card: updateCardContent(type, card.back_card, key, value)}
            : card
        ));
        setDataChanged(true);
    }

    // deletes text, gifs, or stickers on card
    function deleteCardContent(type: string, card: Card) {
        if (type === "text") {
            return {...card, text: card.text.filter((_, index) => index != contentIndex)};
        } else if (type === "gif") {
            return {...card, gif: card.gif.filter((_, index) => index != contentIndex)};
        } else if (type === "sticker") {
            return {...card, sticker: card.sticker.filter((_, index) => index != contentIndex)};
        }
        return card;
    }

    // deletes text, gifs, or stickers on front or back card
    function deleteContent(type: string) {
        setContent(prevContent => prevContent.map((card: Content, cardIndex) =>
            (cardIndex === cardNum - 1) ? (cardSide === "Front") ?
                {...card, front_card: deleteCardContent(type, card.front_card)}
                : {...card, back_card: deleteCardContent(type, card.back_card)}
            : card
        ));
        setDataChanged(true);
        hideSidePanelTools();
    }

    useEffect(() => {
        fetchDeckContent();
    }, []);

    return (
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
                { dataChanged && 
                    <Alert severity="warning" style={{marginBottom: "0.5rem"}}>
                        Warning: You have not saved your work.
                    </Alert>
                }
                <EditToolbar
                    addCard={addCard}
                    openSidePanel={openSidePanel}
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
                                    {content[cardNum - 1]?.front_card?.text?.map((text, textIndex) =>
                                        <DisplayText 
                                            textIndex={textIndex}
                                            text={text}
                                            openSidePanel={openSidePanel}
                                            setText={setText}
                                            setContentIndex={setContentIndex}
                                            setShowTextTools={setShowTextTools}
                                            updateContent={updateContent}
                                        />
                                    )}
                                    {content[cardNum - 1]?.front_card?.gif?.map((gif, gifIndex) =>
                                        <DisplayGiphy
                                            type={"gif"}
                                            giphyIndex={gifIndex}
                                            giphy={gif}
                                            setContentIndex={setContentIndex}
                                            showGiphyPanel={openSidePanel}
                                            setShowGiphyTools={setShowGifTools}
                                            updateContent={updateContent}
                                        />
                                    )}
                                    {content[cardNum - 1]?.front_card?.sticker?.map((sticker, stickerIndex) =>
                                        <DisplayGiphy
                                            type={"sticker"}
                                            giphyIndex={stickerIndex}
                                            giphy={sticker}
                                            setContentIndex={setContentIndex}
                                            showGiphyPanel={openSidePanel}
                                            setShowGiphyTools={setShowStickerTools}
                                            updateContent={updateContent}
                                        />
                                    )}
                                </div>
                                <div className={styles.cardBack}>
                                    {content[cardNum - 1]?.back_card?.text?.map((text, textIndex) =>
                                        <DisplayText 
                                            textIndex={textIndex}
                                            text={text}
                                            openSidePanel={openSidePanel}
                                            setText={setText}
                                            setContentIndex={setContentIndex}
                                            setShowTextTools={setShowTextTools}
                                            updateContent={updateContent}
                                        />
                                    )}
                                    {content[cardNum - 1]?.back_card?.gif?.map((gif, gifIndex) =>
                                        <DisplayGiphy
                                            type={"gif"}
                                            giphyIndex={gifIndex}
                                            giphy={gif}
                                            setContentIndex={setContentIndex}
                                            showGiphyPanel={openSidePanel}
                                            setShowGiphyTools={setShowGifTools}
                                            updateContent={updateContent}
                                        />
                                    )}
                                    {content[cardNum - 1]?.back_card?.sticker?.map((sticker, stickerIndex) =>
                                        <DisplayGiphy
                                            type={"sticker"}
                                            giphyIndex={stickerIndex}
                                            giphy={sticker}
                                            setContentIndex={setContentIndex}
                                            showGiphyPanel={openSidePanel}
                                            setShowGiphyTools={setShowStickerTools}
                                            updateContent={updateContent}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className={styles.deckNav}>
                            <button disabled={cardNum === 1} onClick={showPrevCard}>
                                <FontAwesomeIcon icon={faChevronLeft} />
                            </button>
                            <span>{cardSide} of Card {cardNum}/{totalCards}</span>
                            <button disabled={cardNum === totalCards} onClick={showNextCard}>
                                <FontAwesomeIcon icon={faChevronRight} />
                            </button>
                        </div>
                    </div>
                   { showTextPanel &&
                        <TextSidePanel
                            text={text}
                            setText={setText}
                            showTextTools={showTextTools}
                            insertText={insertContent}
                            updateText={updateContent}
                            deleteText={deleteContent}
                        />
                    }
                    { showGifPanel &&
                        <GifSidePanel
                            setLoading={setLoading}
                            setError={setError}
                            showGifTools={showGifTools}
                            insertGif={insertContent}
                            deleteGif={deleteContent}
                        />
                    }
                    { showStickerPanel &&
                        <StickerSidePanel
                            setLoading={setLoading}
                            setError={setError}
                            showStickerTools={showStickerTools}
                            insertSticker={insertContent}
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