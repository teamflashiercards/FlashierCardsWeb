import type Card from "../../interfaces/Card";
import type { Dispatch, SetStateAction } from "react";

type StickerToolHelper = (
    request: boolean,
    stickerIndex: number | null,
    stickerResults: any
) => void;

export function createSticker(
    stickerUrl: string,
    cardSide: string,
    cardNum: number,
    frontCards: Card[],
    backCards: Card[],
    setFrontCards: Dispatch<SetStateAction<Card[]>>,
    setBackCards:  Dispatch<SetStateAction<Card[]>>
){
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

export function deleteSticker(
    stickerIndex: number | null,
    stickerResults: any,
    showStickerTools: StickerToolHelper,
    cardSide: string,
    cardNum: number,
    setFrontCards: Dispatch<SetStateAction<Card[]>>,
    setBackCards:  Dispatch<SetStateAction<Card[]>>
) {
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