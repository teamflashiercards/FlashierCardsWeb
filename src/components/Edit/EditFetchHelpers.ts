import UserAuth from "../../AuthContext";
import type Card from "../../interfaces/Card";

/*
    Description: These functions fetch or save data from or to database for the Edit component.
    Last updated: 7/26/2026
*/

const { session } = UserAuth();

export const fetchDeckName = async (setLoading: any, deckId: string | undefined, setDeckName: any, setError: any) => {
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

export const fetchDeckContent = async (setLoading: any, deckId: string | undefined, setFrontCards: any, setBackCards: any, setTotal: any, setError: any) => {
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

export const saveDeckContent = async (setLoading: any, deckId: string | undefined, frontCards: Card[], backCards: Card[], setError: any) => {
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