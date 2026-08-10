import type Card from "../../interfaces/Card";
import type { Dispatch, SetStateAction } from "react";

/*
    Description: These are card related helper functions for Edit component used by the the toolbar.
    Last updated: 8/9/2026
*/

type Error = {
    status: boolean,
    message: string
};

export function createCard(deckId: string | undefined, total: number, setTotal: Dispatch<SetStateAction<number>>, frontCards: Card[], 
    setFrontCards: Dispatch<SetStateAction<Card[]>>, backCards: Card[], setBackCards: Dispatch<SetStateAction<Card[]>>, setError: Dispatch<SetStateAction<Error>>) 
{
    if ((total + 1) <= 20) {
        setTotal(total + 1);
        setFrontCards([...frontCards, {id: null, deck_id: Number(deckId), card_num: (total + 1), card_side: "front", text: [], gif: [], sticker: []}]);
        setBackCards([...backCards, {id: null, deck_id: Number(deckId), card_num: (total + 1), card_side: "back", text: [], gif: [], sticker: []}]);
    
    } else {
        setError({ status: true, message: "You can only create up to 20 cards in a deck." });
    }
};

export function deleteCard(total: number, setTotal: Dispatch<SetStateAction<number>>, cardNum: number, setCardNum: Dispatch<SetStateAction<number>>,
    setFrontCards: Dispatch<SetStateAction<Card[]>>, setBackCards: Dispatch<SetStateAction<Card[]>>)
{
    if ((total - 1) >= 1) {
        setTotal(total - 1);
        setFrontCards(prev => prev.filter((_, index) => index != (cardNum - 1)));
        setBackCards(prev => prev.filter((_, index) => index != (cardNum - 1)));

        // updates number of all existing cards after any card is deleted
        updateCardNumbers(setFrontCards, setBackCards);

        // set current card number
        (cardNum > 1) ? setCardNum(cardNum - 1) : setCardNum(1);
    }
}

function updateCardNumbers(setFrontCards: Dispatch<SetStateAction<Card[]>>, setBackCards: Dispatch<SetStateAction<Card[]>>) {
    setFrontCards(prevCards => prevCards.map((card, index) => ({...card, card_num: (index + 1)})));
    setBackCards(prevCards => prevCards.map((card, index) => ({...card, card_num: (index + 1)})));
}