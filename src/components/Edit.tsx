import Navbar from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faT } from "@fortawesome/free-solid-svg-icons";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import styles from "../styles/Deck.module.css";
import { useParams } from "react-router-dom";
import { Stage, Layer, Text, Image } from 'react-konva';
import useImage from "use-image";
import UserAuth from "../AuthContext";
import GiphyLogo from "../assets/giphyLogo.png";
import BlueTooltip from "./BlueTooltip";
import type Card from "../interfaces/Card";
import FeedbackButton from "./FeedbackButton";

/*
    Description: This component allows the user create, update, or delete deck content.
    Last updated: 6/28/2026
*/

type Giphy = {
    id: string;
    title: string;
    url: string;
};

function Giphy({ newImage, onDblClick, onDragEnd }: any) {
    const [image] = useImage(newImage.url);
    return (
        <Image
            image={image}
            x={newImage.x}
            y={newImage.y}
            width={newImage.width}
            height={newImage.height}
            draggable
            onDblClick={onDblClick}
            onDragEnd={onDragEnd}
        />
    );
}

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
    const [giphyQuery, setGiphyQuery] = useState("");
    const [gifTools, setGifTools] = useState(false);
    const [gifResults, setGifResults] = useState<Giphy[] | null>([]);
    const [gifIndex, setGifIndex] = useState<number | null>();

    // sticker realted tools
    const [stickerTools, setStickerTools] = useState(false);
    const [stickerResults, setStickerResults] = useState<Giphy[] | null>([]);
    const [stickerIndex, setStickerIndex] = useState<number | null>();

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

    const fetchGiphs = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        
        try {
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${giphyQuery.trim()}&limit=12&rating=g`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            const gifs = data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                url: item.images.original.url
            }));

            setGifResults(gifs);

        } catch(error: any) {
            setError({ status: true, message: error.message });
        
        } finally {
            setGiphyQuery("");
            setLoading(false);
        }
    }

    const fetchStickers = async (e: any) =>  {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${giphyQuery.trim()}&limit=12&rating=g`);
            const data = await response.json();
            if (!response.ok) throw new Error(data.message);

            const stickers = data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                url: item.images.original_still.url
            }));

            setStickerResults(stickers);

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setGiphyQuery("");
            setLoading(false);
        }
    }

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

    function createText(fontSize: number, width: number) {
        if (cardSide === "Front") {
            let tmp = {id: null, card_id: frontCards[cardNum - 1].id, input: "Double click to edit text", width: width, x: 30, y: 30, font_size: fontSize, color: "#201002"};
            setFrontCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, tmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            let tmp = {id: null, card_id: backCards[cardNum - 1].id, input: "Double click to edit text", width: width, x: 30, y: 30, font_size: fontSize, color: "#201002"};
            setBackCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, tmp]} : card
                )
            );
        }
    }

    function showTextTools(request: boolean, textIndex: number | null, input: string) {
        setText(input);
        setTextIndex(textIndex);
        setTextTools(request); 
    }

    function changeTextColor(newColor: string) {
        if (cardSide === "Front") {
            setFrontCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, color: newColor} : cardText
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, color: newColor} : cardText
                    )} : card
                )
            );
        }
    }

    function changeTextInput(e: any) {
        setText(e.target.value);
        if (cardSide === "Front") {
            setFrontCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, input: e.target.value} : cardText
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, input: e.target.value} : cardText
                    )} : card
                )
            );
        }
    }

    function deleteText() {
        if (cardSide === "Front") {
            setFrontCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.filter((_, index) =>
                        index != textIndex
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.filter((_, index) =>
                        index != textIndex
                    )} : card
                )
            );
        }
        showTextTools(false, null, "");
    }

    function showGifTools(request: boolean, gifIndex: number | null, gifResults: Giphy[] | null) {
        setGiphyQuery("");
        setGifIndex(gifIndex);
        setGifTools(request);
        setGifResults(gifResults);
    }

    function createGif(gifUrl: string) {
        if (cardSide == "Front") {
            let tmp = {id: null, card_id: frontCards[cardNum - 1].id, url: gifUrl, width: 120, height: 120, x: 50, y: 50};
            setFrontCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: [...card.gif, tmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            let tmp = {id: null, card_id: frontCards[cardNum - 1].id, url: gifUrl, width: 120, height: 120, x: 50, y: 50};
            setBackCards(prevCards =>
                prevCards.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: [...card.gif, tmp]} : card
                )
            );
        }
    }

    function showStickerTools(request: boolean, stickerIndex: number | null, stickerResults: Giphy[] | null) {
        setGiphyQuery("");
        setStickerIndex(stickerIndex);
        setStickerTools(request);
        setStickerResults(stickerResults);
    }

    function deleteGif() {
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
    }

    function createSticker(stickerUrl: string) {
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
    }

    function deleteSticker() {
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
                <div className={styles.toolbar}>
                    <BlueTooltip title="Add Card">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={createCard}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                        </button>
                    </BlueTooltip>
                    <BlueTooltip title="Add Text">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={() => showSidePanel("text")}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faT} />
                            </span>
                        </button>
                    </BlueTooltip>
                    <BlueTooltip title="Add Gif">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={() => showSidePanel("gif")}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front} style={{fontWeight: "600"}}>
                                GIF
                            </span>
                        </button>
                    </BlueTooltip>
                    <BlueTooltip title="Add Sticker">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={() => showSidePanel("sticker")}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                        </button>
                    </BlueTooltip>
                    <BlueTooltip title="Delete Card">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={deleteCard}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faTrash} />
                            </span>
                        </button>
                    </BlueTooltip>
                    <BlueTooltip title="Flip Card">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={() => flipCard()}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faRightLeft} />
                            </span>
                        </button>
                    </BlueTooltip>
                    <BlueTooltip title="Save Content">
                        <button
                            type="button"
                            className={styles.toolOption} 
                            onClick={saveDeckContent}                       
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                            </span>
                        </button>
                    </BlueTooltip>
                    <BlueTooltip title="Close Side Panel">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={closeSidePanel}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </span>
                        </button>
                    </BlueTooltip>
                </div>
                <div className={styles.mainPanel}>
                    <div className={styles.deck}>
                        <div className={styles.card} ref={cardRef}>
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    <Stage
                                        width={800}
                                        height={400}
                                        onClick={(e) => {
                                            if (e.target === e.target.getStage()) {
                                                showTextTools(false, null, "");
                                            }
                                        }}
                                    >
                                        <Layer>
                                            {frontCards[cardNum - 1]?.text?.map((text, textIndex) =>
                                                <Text
                                                    key={textIndex}
                                                    x={text.x}
                                                    y={text.y}
                                                    width={text.width}
                                                    text={text.input}
                                                    fontFamily="Imprima"
                                                    fontSize={text.font_size}
                                                    fill={text.color}
                                                    draggable
                                                    onDblClick={() => {
                                                        showSidePanel("text");
                                                        showTextTools(true, textIndex, text.input);
                                                    }}
                                                    onDragEnd={(e) => {
                                                        const { x, y } = e.target.position();
                                                        setFrontCards(prevCards =>
                                                            prevCards.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    text: card.text.map((tmp, i) =>
                                                                        i === textIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                            {frontCards[cardNum - 1]?.gif?.map((gif, gifIndex) =>
                                                <Giphy
                                                    key={gifIndex}
                                                    newImage={gif}
                                                    onDblClick={() => {
                                                        showSidePanel("gif");
                                                        showGifTools(true, gifIndex, gifResults);
                                                    }}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setFrontCards(prevCards =>
                                                            prevCards.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    gif: card.gif.map((tmp, i) =>
                                                                        i === gifIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                            {frontCards[cardNum - 1]?.sticker?.map((sticker, stickerIndex) =>
                                                <Giphy
                                                    key={stickerIndex}
                                                    newImage={sticker}
                                                    onDblClick={() => {
                                                        showSidePanel("sticker");
                                                        showStickerTools(true, stickerIndex, stickerResults);
                                                    }}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setFrontCards(prevCards =>
                                                            prevCards.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    sticker: card.sticker.map((tmp, i) =>
                                                                        i === stickerIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                        </Layer>
                                    </Stage>
                                </div>
                                <div className={styles.cardBack}>
                                    <Stage
                                        width={800}
                                        height={400}
                                        onClick={(e) => {
                                            if (e.target === e.target.getStage()) {
                                                showTextTools(false, null, "");
                                            }
                                        }}
                                    >
                                        <Layer>
                                            {backCards[cardNum - 1]?.text?.map((text, textIndex) =>
                                                <Text
                                                    key={textIndex}
                                                    x={text.x}
                                                    y={text.y}
                                                    width={text.width}
                                                    text={text.input}
                                                    fontFamily="Imprima"
                                                    fontSize={text.font_size}
                                                    fill={text.color}
                                                    draggable
                                                    onDblClick={() => {
                                                        showSidePanel("text");
                                                        showTextTools(true, textIndex, text.input);
                                                    }}
                                                    onDragEnd={(e) => {
                                                        const { x, y } = e.target.position();
                                                        setBackCards(prevCards =>
                                                            prevCards.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    text: card.text.map((tmp, i) =>
                                                                        i === textIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                            {backCards[cardNum - 1]?.gif?.map((gif, gifIndex) =>
                                                <Giphy
                                                    key={gifIndex}
                                                    newImage={gif}
                                                    onDblClick={() => {
                                                        showSidePanel("gif");
                                                        showGifTools(true, gifIndex, gifResults);
                                                    }}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setBackCards(prevCards =>
                                                            prevCards.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    gif: card.gif.map((tmp, i) =>
                                                                        i === gifIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                            {backCards[cardNum - 1]?.sticker?.map((sticker, stickerIndex) =>
                                                <Giphy
                                                    key={stickerIndex}
                                                    newImage={sticker}
                                                    onDblClick={() => {
                                                        showSidePanel("sticker");
                                                        showStickerTools(true, stickerIndex, stickerResults);
                                                    }}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setBackCards(prevCards =>
                                                            prevCards.map((card, cardIndex) =>
                                                                cardIndex === (cardNum - 1) ? {
                                                                    ...card,
                                                                    sticker: card.sticker.map((tmp, i) =>
                                                                        i === stickerIndex ? {...tmp, x: x, y: y} : tmp
                                                                    )
                                                                } : card
                                                            )
                                                        );
                                                    }}
                                                />
                                            )}
                                        </Layer>
                                    </Stage>
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
                    <div className={styles.sidePanel} style={{ display: textPanel ? "flex" : "none" }}>
                        <div style={{ display: (textTools) ? "flex" : "none" }}>
                            <div className={styles.sidePanelTitle}>Text Input</div>
                            <div className={styles.textInput}>
                                <textarea placeholder="Enter text here" value={text} onChange={changeTextInput} />
                            </div>
                        </div>
                        <div style={{ display: (textTools) ? "flex" : "none" }}>
                            <div className={styles.sidePanelTitle}>Text Deletion</div>
                            <div className={styles.sidePanelOptions}>
                                <button className={styles.sidePanelBtn} onClick={deleteText}>Delete</button>
                            </div>
                        </div>
                        <div style={{ display: (textTools) ? "flex" : "none" }}>
                            <div className={styles.sidePanelTitle}>Text Color</div>
                            <div className={styles.sidePanelOptions}>
                                <div style={{ backgroundColor: "#201002" }} onClick={() => changeTextColor("#201002")}></div>
                                <div style={{ backgroundColor: "#FF2511" }} onClick={() => changeTextColor("#FF2511")}></div>
                                <div style={{ backgroundColor: "#FED43F" }} onClick={() => changeTextColor("#FED43F")}></div>
                                <div style={{ backgroundColor: "#016236" }} onClick={() => changeTextColor("#016236")}></div>
                                <div style={{ backgroundColor: "#E43480" }} onClick={() => changeTextColor("#E43480")}></div>
                                <div style={{ backgroundColor: "#621590" }} onClick={() => changeTextColor("#621590")}></div>
                                <div style={{ backgroundColor: "#1F6CB0" }} onClick={() => changeTextColor("#1F6CB0")}></div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.sidePanelTitle}>Text Size</div>
                            <div className={styles.sidePanelOptions} style={{ marginBottom: "0rem" }}>
                                <button className={styles.sidePanelBtn} onClick={() => createText(18, 300)}>Small</button>
                                <button className={styles.sidePanelBtn} onClick={() => createText(28, 400)}>Medium</button>
                                <button className={styles.sidePanelBtn} onClick={() => createText(38, 600)}>Large</button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.sidePanel} style={{ display: gifPanel ? "flex" : "none" }}>
                        <div style={{ display: (gifTools) ? "flex" : "none" }}>
                            <div className={styles.sidePanelTitle}>Giph Deletion</div>
                            <div className={styles.sidePanelOptions}>
                                <button className={styles.sidePanelBtn} onClick={deleteGif}>Delete</button>
                            </div>
                        </div>
                        <div>
                            <div className={styles.sidePanelTitle}>Gifs</div>
                            <form onSubmit={fetchGiphs} className={styles.sidePanelOptions}>
                                <input
                                    type="text"
                                    placeholder="Search for gifs"
                                    value={giphyQuery}
                                    onChange={(e) => setGiphyQuery(e.target.value)}
                                />
                                <button type="submit" className={styles.sidePanelFormBtn}>Search</button>
                            </form>
                            <div className={styles.giphyGrid}>
                                {gifResults?.map((gif) => (
                                    <img
                                        key={gif.id}
                                        src={gif.url}
                                        alt={gif.title}
                                        onClick={() => createGif(gif.url)}
                                    />
                                ))}
                            </div>
                            <div className={styles.giphyLogo}>
                                <img src={GiphyLogo} alt="Powered by GIPHY" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.sidePanel} style={{ display: stickerPanel ? "flex" : "none" }}>
                        <div style={{ display: (stickerTools) ? "flex" : "none" }}>
                            <div className={styles.sidePanelTitle}>Sticker Deletion</div>
                            <div className={styles.sidePanelOptions}>
                                <button className={styles.sidePanelBtn} onClick={deleteSticker}>Delete</button>
                            </div>
                        </div>
                        <div>
                            <div className={styles.sidePanelTitle}>Stickers</div>
                            <form onSubmit={fetchStickers} className={styles.sidePanelOptions}>
                                <input
                                    type="text"
                                    placeholder="Search for stickers"
                                    value={giphyQuery}
                                    onChange={(e) => setGiphyQuery(e.target.value)}
                                />
                                <button type="submit" className={styles.sidePanelFormBtn}>Search</button>
                            </form>
                            <div className={styles.giphyGrid}>
                                {stickerResults?.map((sticker) => (
                                    <img
                                        key={sticker.id}
                                        src={sticker.url}
                                        alt={sticker.title}
                                        onClick={() => createSticker(sticker.url)}
                                    />
                                ))}
                            </div>
                            <div className={styles.giphyLogo}>
                                <img src={GiphyLogo} alt="Powered by GIPHY" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FeedbackButton />
        </div>
    );
}

export default Edit;