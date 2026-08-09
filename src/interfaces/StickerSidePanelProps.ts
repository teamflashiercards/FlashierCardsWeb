import type { Dispatch, SetStateAction } from "react"
import type Card from "./Card"
import type Giphy from "./Giphy";

interface Error {
    status: boolean, 
    message: string
};

type StickerTools= (
    request: boolean,
    gifIndex: number | null,
    gifResults: Giphy[] | null
) => void;

export default interface StickerSidePanelProps {
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<Error>>,
    stickerTools: boolean,
    showStickerTools: StickerTools, 
    cardSide: string, 
    cardNum: number, 
    stickerIndex: number | null, 
    frontCards: Card[], 
    setFrontCards: Dispatch<SetStateAction<Card[]>>, 
    backCards: Card[], 
    setBackCards: Dispatch<SetStateAction<Card[]>>
};