import type { Dispatch, SetStateAction } from "react"
import type Card from "./Card"

interface Error {
    status: boolean, 
    message: string
};

export default interface GifSidePanelProps {
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<Error>>,
    gifTools: boolean,
    showGifTools: any, 
    cardSide: string, 
    cardNum: number, 
    gifIndex: number | null, 
    frontCards: Card[], 
    setFrontCards: Dispatch<SetStateAction<Card[]>>, 
    backCards: Card[], 
    setBackCards: Dispatch<SetStateAction<Card[]>>
};