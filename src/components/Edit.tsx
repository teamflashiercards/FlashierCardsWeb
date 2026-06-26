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
import Tooltip from "@mui/material/Tooltip";
import type Card from "../interfaces/Card";

type Giphy = {
    id: string;
    title: string;
    url: string;
};

function Giphy({newImage, onDblClick, onDragEnd}: any) {
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
    const [deckName, setDeckName] = useState();
    const { deckId } = useParams();
    const { session } = UserAuth();

    // text side panel related variables
    const [textPanel, setTextPanel] = useState(false);
    const [textArea, setTextArea] = useState(false);
    const [text, setText] = useState("");
    const [textIndex, setTextIndex] = useState(0);

    // card related variables
    const cardRef = useRef<HTMLDivElement>(null);
    const [cardSide, setCardSide] = useState("Front");
    const [cardNum, setCardNum] = useState(1);
    const [total, setTotal] = useState(1);
    const [frontCards, setFrontCards] = useState<Card[]>([]);   // initialize with initial card content
    const [backCards, setBackCards] = useState<Card[]>([]);     // initialize with initial card content


    // giphs and stickers related variables
    const [query, setQuery] = useState("");
    const [gifResults, setGifsResults] = useState<Giphy[]>([]);
    const [stickerResults, setStickerResults] = useState<Giphy[]>([]);
    const [giphSelected, setGiphSelected] = useState(false);
    const [stickerSelected, setStickerSelected] = useState(false);
    const [gifPanel, setGifPanel] = useState(false);
    const [stickerPanel, setStickerPanel] = useState(false);
    const [gifIndex, setGifIndex] = useState(0);
    const [stickerIndex, setStickerIndex] = useState(0);

    const fetchGiphs = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setQuery("");

        try {
            /*
            const response = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${query.trim()}&limit=12&rating=g`);

            // get gifs related data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Sorry, we could not get the gifs.");
            }

            // get the urls
            const gifs = data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                url: item.images.original.url
            }));

            setGifsResults(gifs);*/

        } catch(error: any) {
            setError({ status: true, message: error.message || "Sorry, we could not get the gifs." });
        
        } finally {
            setLoading(false);
        }
    }

    const fetchStickers = async (e: any) =>  {
        console.log("hello world");
        e.preventDefault();
        setLoading(true);
        setQuery("");

        try {
            /*
            const response = await fetch(`https://api.giphy.com/v1/stickers/search?api_key=${import.meta.env.VITE_GIPHY_API_KEY}&q=${query.trim()}&limit=12&rating=g`);

            // get stickers related data
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Sorry, we could not get the stickers.");
            }

            // get the urls
            const stickers = data.data.map((item: any) => ({
                id: item.id,
                title: item.title,
                url: item.images.original_still.url
            }));

            setStickerResults(stickers);*/

        } catch(error: any) {
            setError({ status: true, message: error.message || "Sorry, we could not get the stickers." });
        } finally {
            setLoading(false);
        }
    }

    /*
    function createSticker(stickerUrl: string) {
        let stickerTmp = { id: null, card_id: null, url: stickerUrl, width: 100, height: 100, x: 20, y: 20 };
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, sticker: [...card.sticker, stickerTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, sticker: [...card.sticker, stickerTmp]} : card
                )
            );
        }
    }*/

    /*
    function createGif(gifUrl: string) {
        let gifTmp = { id: null, card_id: null, url: gifUrl, width: 150, height: 150, x: 50, y: 50 };
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: [...card.gif, gifTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, gif: [...card.gif, gifTmp]} : card
                )
            );
        }
    }*/

    function changeTextColor(color: string) {
        if (cardSide === "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, color: color} : cardText
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, color: color} : cardText
                    )} : card
                )
            );
        }
    }

    /*
    function createSmallText() {
        let textTmp = {input: "Double click to edit text", width: 300, x: 30, y: 30, fontSize: 18, color: "#201002"};
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        }
    }*/

    /*
    function createMediumText() {
        let textTmp = {input: "Double click to edit text", width: 400, x: 30, y: 30, fontSize: 28, color: "#201002"};
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        }
    }*/

        /*
    function createLargeText() {
        let textTmp = { id: null, card_id: null, input: "Double click to edit text", width: 600, x: 30, y: 30, fontSize: 38, color: "#201002"};
        if (cardSide == "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        } else if (cardSide === "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: [...card.text, textTmp]} : card
                )
            );
        }
    }*/

    function deleteText() {
        if (cardSide === "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.filter((_, index) =>
                        index != textIndex
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.filter((_, index) =>
                        index != textIndex
                    )} : card
                )
            );
        }
        setTextArea(false);
    }

    function deleteGiphy(giphyType: string) {
        if (giphyType == "gif") {
            if (cardSide === "Front") {
                setFrontCards(prev =>
                    prev.map((card, index) =>
                        index === (cardNum - 1) ? {...card, gif: card.gif.filter((_, index) =>
                            index != gifIndex
                        )} : card
                    )
                );
            } else if (cardSide == "Back") {
                setBackCards(prev =>
                    prev.map((card, index) =>
                        index === (cardNum - 1) ? {...card, gif: card.gif.filter((_, index) =>
                            index != gifIndex
                        )} : card
                    )
                );
            }
            showGiphArea(false, 0);
        } else if (giphyType == "sticker") {
            if (cardSide === "Front") {
                setFrontCards(prev =>
                    prev.map((card, index) =>
                        index === (cardNum - 1) ? {...card, sticker: card.sticker.filter((_, index) =>
                            index != stickerIndex
                        )} : card
                    )
                );
            } else if (cardSide == "Back") {
                setBackCards(prev =>
                    prev.map((card, index) =>
                        index === (cardNum - 1) ? {...card, sticker: card.sticker.filter((_, index) =>
                            index != stickerIndex
                        )} : card
                    )
                );
            }
            showStickerArea(false, 0);
        }
    }

    function showTextArea(request: boolean, textIndex: number, input: string) {
        setText(input);
        setTextIndex(textIndex);
        setTextArea(request);
    }

    function changeTextInput(e: any) {
        setText(e.target.value);
        if (cardSide === "Front") {
            setFrontCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, input: e.target.value} : cardText
                    )} : card
                )
            );
        } else if (cardSide == "Back") {
            setBackCards(prev =>
                prev.map((card, index) =>
                    index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                        i === textIndex ? {...cardText, input: e.target.value} : cardText
                    )} : card
                )
            );
        }
    }

    /*
    function addCard() {
        if ((total + 1) <= 20) {
            setTotal(total + 1);
            setFrontCards([...frontCards, { id: null, deck_id: deckId, text: [], gif: [], sticker: []}]);
            setBackCards([...backCards, {text: [], gif: [], sticker: []}]);
        }
    }*/

    function deleteCard() {
        if ((total - 1) >= 1) {
            setTotal(total - 1);
            setFrontCards(prev => prev.filter((_, index) => index != (cardNum - 1)));
            setBackCards(prev => prev.filter((_, index) => index != (cardNum - 1)));
            if (cardNum > 1) {
                setCardNum(cardNum - 1);
            } else {
                setCardNum(1);
            }
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
            showTextArea(false, 0, "");
            setCardNum(cardNum + 1);
            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    function showPrevCard() {
        if ((cardNum - 1) >= 1) {
            showTextArea(false, 0, "");
            setCardNum(cardNum - 1);
            if (cardSide === "Back") {
                flipCard();
            }
        }
    }

    function showTextPanel() {
        if (stickerPanel) {
            setStickerPanel(false);
            showStickerArea(false, 0);
        } else if (gifPanel) {
            setGifPanel(false);
            showGiphArea(false, 0);
        }
        setTextPanel(true);
    }

    function showGifPanel() {
        if (textPanel) {
            setTextArea(false);
            setTextPanel(false);
        } else if (stickerPanel) {
            setStickerPanel(false);
            showStickerArea(false, 0);
        }
        setGifPanel(true);
    }

    function showStickerPanel() {
        if (textPanel) {
            setTextArea(false);
            setTextPanel(false);
        } else if (gifPanel) {
            setGifPanel(false);
            showGiphArea(false, 0);
        }
        setStickerPanel(true);
    }

    function showGiphArea(request: boolean, giphIndex: number) {
        setGiphSelected(request);
        setGifIndex(giphIndex);
    }

    function showStickerArea(request: boolean, stickerIndex: number) {
        setStickerSelected(request);
        setStickerIndex(stickerIndex);
    }

    function hideSidePanel() {
        if (textPanel) {
            setTextPanel(false);
            showTextArea(false, 0, "");
        } else if (stickerPanel) {
            setStickerPanel(false);
            showStickerArea(false, 0);
        } else if (gifPanel) {
            setGifPanel(false);
            showGiphArea(false, 0);
        }
    }
    
    const updateDeckContent  = async () => {
        setLoading(true);

        try {
            /*
            // update card content in mongodb
            const docResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/deck/${deckId}/saveCards`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    "userId": userId,
                    "deckId": deckId,
                    "frontCards": frontCards,
                    "backCards": backCards
                })
            });

            // get message and card content
            const docData = await docResponse.json();

            if (!docResponse.ok) {
                throw new Error(docData.message);
            }*/

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
        
    }

    const fetchDeckName = async () => {
        setLoading(true);

        try {
            // get specific deck from Supabase
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}`, {
            
            // get deck data from supabase
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}/content`, {
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

    console.log(session.access_token);

    const fetchDeckContent = async () => {
        setLoading(true);

        try {
            setFrontCards([{}])
            /*
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
            
           
            // get card content from mongodb
           /* const docResponse = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck/${deckId}/content`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // get message and card content
            const docData = await docResponse.json();

            if (!docResponse.ok) {
                throw new Error(docData.message);
            }
            setFrontCards(docData.frontCards);
            setBackCards(docData.backCards);
            setTotal(docData.frontCards.length);*/
            */
            // set deck name content to display
            // setDeckName(data.name);
            setFrontCards(data.front_cards);
            setBackCards(data.back_cards);
            setTotal(data.front_cards.length);
            console.log(data);

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };
    
    useEffect(() => {
        fetchDeckName();
        fetchDeckContent();
    }, []);

    return (
        <div className={styles.dashboardContent}>
            <Navbar />
            <div>
                <div className={styles.title}>{deckName || "Flashier Cards"}</div>
                { (loading) ?
                    <div className={styles.invalidRequest}>
                        Loading request...
                    </div>
                :
                    (error.status) ?
                        <div className={styles.invalidRequest}>{error.message}</div>
                    :
                        <div></div>
                }
                <div className={styles.toolbar}>
                    <Tooltip title="Add Card">
                        <button
                            type="button"
                            className={styles.toolOption}
                            //onClick={addCard}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faPlus} />
                            </span>
                        </button>
                    </Tooltip>
                    <Tooltip title="Add Text">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={showTextPanel}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faT} />
                            </span>
                        </button>
                    </Tooltip>
                    <Tooltip title="Add Gif">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={showGifPanel}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front} style={{fontWeight: "600"}}>
                                GIF
                            </span>
                        </button>
                    </Tooltip>
                    <Tooltip title="Add Sticker">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={showStickerPanel}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faHeart} />
                            </span>
                        </button>
                    </Tooltip>
                    <Tooltip title="Delete Card">
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
                    </Tooltip>
                    <Tooltip title="Flip Card">
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
                    </Tooltip>
                    <Tooltip title="Save Content">
                        <button
                            type="button"
                            className={styles.toolOption} 
                            onClick={() => updateDeckContent()}                       
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faFloppyDisk} />
                            </span>
                        </button>
                    </Tooltip>
                    <Tooltip title="Close Side Panel">
                        <button
                            type="button"
                            className={styles.toolOption}
                            onClick={hideSidePanel}
                        >
                            <span className={styles.shadow}></span>
                            <span className={styles.edge}></span>
                            <span className={styles.front}>
                                <FontAwesomeIcon icon={faCircleXmark} />
                            </span>
                        </button>
                    </Tooltip>
                </div>
                <div className={styles.panel}>
                    <div className={styles.deck}>
                        <div className={styles.card} ref={cardRef}>
                            <div className={styles.cardInner}>
                                <div className={styles.cardFront}>
                                    {/*
                                    <Stage
                                        width={800}
                                        height={400}
                                        onClick={(e) => {
                                            if (e.target === e.target.getStage()) {
                                                showTextArea(false, 0, "");
                                            }
                                        }}
                                    >
                                        <Layer>
                                            {frontCards[cardNum - 1].text.map((text, textIndex) =>
                                                <Text
                                                    key={textIndex}
                                                    x={text.x}
                                                    y={text.y}
                                                    width={text.width}
                                                    text={text.input}
                                                    fontFamily="Imprima"
                                                    //fontSize={text.fontSize}
                                                    fill={text.color}
                                                    draggable
                                                    onDblClick={() => {
                                                        showTextPanel();
                                                        showTextArea(true, textIndex, text.input);
                                                    }}
                                                    onDragEnd={(e) => {
                                                        const { x, y } = e.target.position();
                                                        setFrontCards(prev =>
                                                            prev.map((card, cardIndex) =>
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
                                            {frontCards[cardNum - 1].sticker.map((sticker, stickerIndex) =>
                                                <Giphy
                                                    key={stickerIndex}
                                                    newImage={sticker}
                                                    onDblClick={() => {
                                                        showStickerPanel();
                                                        showStickerArea(true, stickerIndex);
                                                    }}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setFrontCards(prev =>
                                                            prev.map((card, cardIndex) =>
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
                                            {frontCards[cardNum - 1].gif.map((gif, gifIndex) =>
                                                <Giphy
                                                    key={gifIndex}
                                                    newImage={gif}
                                                    onDblClick={() => {
                                                        showGifPanel();
                                                        showGiphArea(true, gifIndex);
                                                    }}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setFrontCards(prev =>
                                                            prev.map((card, cardIndex) =>
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
                                        </Layer>
                                        
                                    </Stage>    */}                                 
                                </div>
                                <div className={styles.cardBack}>
                                     {/*
                                    <Stage
                                        width={800}
                                        height={400}
                                        onClick={(e) => {
                                            if (e.target === e.target.getStage()) {
                                                showTextArea(false, 0, "");
                                            }
                                        }}
                                    >
                                        <Layer>
                                            {backCards[cardNum - 1].text.map((text, textIndex) =>
                                                <Text
                                                    key={textIndex}
                                                    x={text.x}
                                                    y={text.y}
                                                    width={text.width}
                                                    text={text.input}
                                                    fontFamily="Imprima"
                                                    //fontSize={text.fontSize}
                                                    fill={text.color}
                                                    draggable
                                                    onDblClick={() => {
                                                        showTextPanel();
                                                        showTextArea(true, textIndex, text.input);
                                                    }}
                                                    onDragEnd={(e) => {
                                                        const { x, y } = e.target.position();
                                                        setBackCards(prev =>
                                                            prev.map((card, cardIndex) =>
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
                                            {backCards[cardNum - 1].sticker.map((sticker, stickerIndex) =>
                                                <Giphy
                                                    key={stickerIndex}
                                                    newImage={sticker}
                                                    onDblClick={() => {
                                                        showStickerPanel();
                                                        showStickerArea(true, stickerIndex);
                                                    }}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setBackCards(prev =>
                                                            prev.map((card, cardIndex) =>
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
                                            {backCards[cardNum - 1].gif.map((gif, gifIndex) =>
                                                <Giphy
                                                    key={gifIndex}
                                                    newImage={gif}
                                                    onDblClick={() => {
                                                        showStickerPanel();
                                                        showStickerArea(true, gifIndex);
                                                    }}
                                                    onDragEnd={(e: any) => {
                                                        const { x, y } = e.target.position();
                                                        setBackCards(prev =>
                                                            prev.map((card, cardIndex) =>
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
                                        </Layer>
                                    </Stage>      */}                       
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
                    <div className={styles.sidePanel} style={{display: textPanel ? "flex" : "none"}}>
                        <div style={{display: (textArea) ? "flex" : "none"}}>
                            <div className={styles.sidePanelTitle}>Text Input</div>
                            <div className={styles.textInput}>
                                <textarea placeholder="Enter text here" value={text} onChange={changeTextInput} />
                            </div>
                        </div>
                        <div style={{display: (textArea) ? "flex" : "none"}}>
                            <div className={styles.sidePanelTitle}>Text Deletion</div>
                            <div className={styles.textOptions}>
                                <button onClick={deleteText}>Delete</button>
                            </div>
                        </div>
                        <div style={{display: (textArea) ? "flex" : "none"}}>
                            <div className={styles.sidePanelTitle}>Text Color</div>
                            <div className={styles.textOptions}>
                                <div style={{backgroundColor: "#201002"}} onClick={() => changeTextColor("#201002")}></div>
                                <div style={{backgroundColor: "#FF2511"}} onClick={() => changeTextColor("#FF2511")}></div>
                                <div style={{backgroundColor: "#FED43F"}} onClick={() => changeTextColor("#FED43F")}></div>
                                <div style={{backgroundColor: "#016236"}} onClick={() => changeTextColor("#016236")}></div>
                                <div style={{backgroundColor: "#E43480"}} onClick={() => changeTextColor("#E43480")}></div>
                                <div style={{backgroundColor: "#621590"}} onClick={() => changeTextColor("#621590")}></div>
                                <div style={{backgroundColor: "#1F6CB0"}} onClick={() => changeTextColor("#1F6CB0")}></div>
                            </div>
                        </div>
                        <div>
                            <div className={styles.sidePanelTitle}>Text Size</div>
                            {/* 
                            <div className={styles.textOptions}>
                                <button onClick={createSmallText}>Small</button>
                                <button onClick={createMediumText}>Medium</button>
                                <button onClick={createLargeText}>Large</button>
                            </div>*/}
                        </div>
                    </div>
                    <div className={styles.sidePanel} style={{display: gifPanel ? "flex" : "none"}}>
                        <div style={{display: (giphSelected) ? "flex" : "none"}}>
                            <div className={styles.sidePanelTitle}>Giph Deletion</div>
                            <div className={styles.textOptions}>
                                <button onClick={() => deleteGiphy("gif")}>Delete</button>
                            </div>
                        </div>
                        <div>
                            <div className={styles.sidePanelTitle}>Gifs</div>
                            <form onSubmit={fetchGiphs} className={styles.mediaForm}>
                                <input
                                    type="text"
                                    placeholder="Search for gifs"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button type="submit" className={styles.mediaFormBtn}>Search</button>
                            </form>
                            <div className={styles.mediaGrid}>
                                {gifResults.map((gif) => (
                                    <img
                                        key={gif.id}
                                        src={gif.url}
                                        alt={gif.title}
                                        //onClick={() => createGif(gif.url)}
                                    />
                                ))}
                            </div>
                            <div className={styles.giphyLogo}>
                                <img src={GiphyLogo} alt="Powered by GIPHY" />
                            </div>
                        </div>
                    </div>
                    <div className={styles.sidePanel} style={{display: stickerPanel ? "flex" : "none"}}>
                        <div style={{display: (stickerSelected) ? "flex" : "none"}}>
                            <div className={styles.sidePanelTitle}>Sticker Deletion</div>
                            <div className={styles.textOptions}>
                                <button onClick={() => deleteGiphy("sticker")}>Delete</button>
                            </div>
                        </div>
                        <div>
                            <div className={styles.sidePanelTitle}>Stickers</div>
                            <form onSubmit={fetchStickers} className={styles.mediaForm}>
                                <input
                                    type="text"
                                    placeholder="Search for stickers"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                />
                                <button type="submit" className={styles.mediaFormBtn}>Search</button>
                            </form>
                            <div className={styles.mediaGrid}>
                                {stickerResults.map((sticker) => (
                                    <img
                                        key={sticker.id}
                                        src={sticker.url}
                                        alt={sticker.title}
                                        //onClick={() => createSticker(sticker.url)}
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
        </div>
    );
}

export default Edit;