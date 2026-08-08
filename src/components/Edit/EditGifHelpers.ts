import type Card from "../../interfaces/Card";
import type { Dispatch, SetStateAction } from "react";

type GifToolhelper = (
    request: boolean,
    gifIndex: number | null,
    gifResults: any
) => void;

export function createGif(
    gifUrl: string,
    cardSide: string,
    cardNum: number,
    frontCards: Card[],
    backCards: Card[],
    setFrontCards: Dispatch<SetStateAction<Card[]>>,
    setBackCards:  Dispatch<SetStateAction<Card[]>>
) {
    if (cardSide === "Front") {
        let tmp = {id: null, card_id: frontCards[cardNum - 1].id, url: gifUrl, width: 120, height: 120, x: 50, y: 50};
        setFrontCards(prev =>
            prev.map((card, index) =>
                index === cardNum - 1
                    ? { ...card, gif: [...card.gif, { ...tmp, card_id: card.id }] }
                    : card
            )
        );
    } else {
        let tmp = {id: null, card_id: backCards[cardNum - 1].id, url: gifUrl, width: 120, height: 120, x: 50, y: 50};
        setBackCards(prev =>
            prev.map((card, index) =>
                index === cardNum - 1
                    ? { ...card, gif: [...card.gif, { ...tmp, card_id: card.id }] }
                    : card
            )
        );
    }
}

export function deleteGif (
        gifIndex: number | null,
        gifResults: any,
        showGifTools: GifToolhelper,
        cardSide: string,
        cardNum: number,
        setFrontCards: Dispatch<SetStateAction<Card[]>>,
        setBackCards:  Dispatch<SetStateAction<Card[]>>) {
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