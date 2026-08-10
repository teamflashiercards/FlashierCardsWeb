import type Card from "../../interfaces/Card";
import type { Dispatch, SetStateAction } from "react";

export function createCard(
    deckId: string | undefined,
    total: number,
    setTotal: Dispatch<SetStateAction<number>>,
    frontCards: Card[],
    setFrontCards: Dispatch<SetStateAction<Card[]>>,
    backCards: Card[],
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

export function deleteCard(
    total: number,
    setTotal: Dispatch<SetStateAction<number>>,
    cardNum: number,
    setCardNum: Dispatch<SetStateAction<number>>,
    setFrontCards: Dispatch<SetStateAction<Card[]>>,
    setBackCards: Dispatch<SetStateAction<Card[]>>,
) 
{
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

function updateCardNumbers(
    setFrontCards: Dispatch<SetStateAction<Card[]>>,
    setBackCards: Dispatch<SetStateAction<Card[]>>
)
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
};

export const saveDeckContent = async (session: any, setLoading: any, setError: any, deckId: number, frontCards: Card[], backCards: Card[]) => {
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