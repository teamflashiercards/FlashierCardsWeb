import type { Dispatch, SetStateAction } from "react";
import type Card from "./Card";

interface Error {
    status: boolean, 
    message: string
};

export default interface StickerSidePanelProps {
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<Error>>,
    stickerTools: boolean,
    cardSide: string, 
    cardNum: number,
    frontCards: Card[], 
    setFrontCards: Dispatch<SetStateAction<Card[]>>, 
    backCards: Card[], 
    setBackCards: Dispatch<SetStateAction<Card[]>>,
    deleteSticker: any
};