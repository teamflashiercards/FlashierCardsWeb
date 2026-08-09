import type { Dispatch, SetStateAction } from "react"
import type Card from "./Card"
import type Giphy from "./Giphy";

interface Error {
    status: boolean, 
    message: string
};

type GifTools= (
    request: boolean,
    gifIndex: number | null,
    gifResults: Giphy[] | null
) => void;

export default interface GifSidePanelProps {
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<Error>>,
    gifTools: boolean,
    showGifTools: GifTools, 
    cardSide: string, 
    cardNum: number, 
    gifIndex: number | null, 
    frontCards: Card[], 
    setFrontCards: Dispatch<SetStateAction<Card[]>>, 
    backCards: Card[], 
    setBackCards: Dispatch<SetStateAction<Card[]>>
};