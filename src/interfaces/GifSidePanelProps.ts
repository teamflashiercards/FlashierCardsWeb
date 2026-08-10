import type { Dispatch, SetStateAction } from "react";
import type Card from "./Card";

interface Error {
    status: boolean, 
    message: string
};

export default interface GifSidePanelProps {
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<Error>>,
    gifTools: boolean,
    cardSide: string, 
    cardNum: number,
    frontCards: Card[], 
    setFrontCards: Dispatch<SetStateAction<Card[]>>, 
    backCards: Card[], 
    setBackCards: Dispatch<SetStateAction<Card[]>>,
    deleteGif: any
};