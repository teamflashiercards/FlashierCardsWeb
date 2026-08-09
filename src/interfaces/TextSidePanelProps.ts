import type { Dispatch, SetStateAction } from "react";
import type Card from "./Card";

type TextTools= (
    request: boolean,
    textIndex: number | null,
    input: string
) => void;


export default interface TextSidePanelProps {
    textTools: boolean,
    showTextTools: TextTools, 
    cardSide: string,
    cardNum: number,
    text: string,
    setText: Dispatch<SetStateAction<string>>, 
    textIndex: number | null | undefined,
    frontCards: Card[], 
    setFrontCards: any, 
    backCards: Card[], 
    setBackCards: any
};