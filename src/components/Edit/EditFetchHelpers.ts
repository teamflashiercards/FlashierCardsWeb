/*
    Description: These functions fetch data from database for the Edit component.
    Last updated: 8/9/2026
*/

export const fetchDeckName = async (session: any, setLoading: any, setError: any, deckId: string | undefined, setDeckName: any) => {
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

export const fetchDeckContent = async (session: any, setLoading: any, setError: any, deckId: string | undefined, setFrontCards: any, setBackCards: any, setTotal: any) => {
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