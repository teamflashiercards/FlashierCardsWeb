import type { Dispatch, SetStateAction } from "react";
import type Card from "./Card";

export default interface TextSidePanelProps {
    textTools: boolean,
    cardSide: string,
    cardNum: number,
    text: string,
    setText: Dispatch<SetStateAction<string>>, 
    textIndex: number | null | undefined,
    frontCards: Card[], 
    setFrontCards: any, 
    backCards: Card[], 
    setBackCards: any,
    deleteText: any
};