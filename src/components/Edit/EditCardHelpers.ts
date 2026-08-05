import type Card from "../../interfaces/Card";
import type { Dispatch, SetStateAction } from "react";

export function createCard(
    total: number,
    deckId: string | undefined,
    frontCards: Card[],
    backCards: Card[],
    setTotal: Dispatch<SetStateAction<number>>,
    setFrontCards: Dispatch<SetStateAction<Card[]>>,
    setBackCards: Dispatch<SetStateAction<Card[]>>,
    setError: Dispatch<SetStateAction<{ status: boolean; message: string }>>
) 
{
        if ((total + 1) <= 20) {
            setTotal(total + 1);
            setFrontCards([...frontCards, {id: null, deck_id: Number(deckId), card_num: (total + 1), card_side: "front", text: [], gif: [], sticker: []}]);
            setBackCards([...backCards, {id: null, deck_id: Number(deckId), card_num: (total + 1), card_side: "back", text: [], gif: [], sticker: []}]);
        } else {
            setError({ status: true, message: "You can only create up to 20 cards in a deck." });
        }
    }
    export function updateCardNumbers(
    setFrontCards: Dispatch<SetStateAction<Card[]>>,
    setBackCards: Dispatch<SetStateAction<Card[]>>)
     {
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
     export function deleteCard(
    total: number,
    cardNum: number,
    setTotal: Dispatch<SetStateAction<number>>,
    setFrontCards: Dispatch<SetStateAction<Card[]>>,
    setBackCards: Dispatch<SetStateAction<Card[]>>,
    setCardNum: Dispatch<SetStateAction<number>>) {
        if ((total - 1) >= 1) {
            setTotal(total - 1);
            setFrontCards(prev => prev.filter((_, index) => index != (cardNum - 1)));
            setBackCards(prev => prev.filter((_, index) => index != (cardNum - 1)));
            updateCardNumbers(setFrontCards, setBackCards);
            if (cardNum > 1) {
                setCardNum(cardNum - 1);
            } else {
                setCardNum(1);
            }
        }
    }