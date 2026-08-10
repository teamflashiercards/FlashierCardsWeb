import type { Dispatch, SetStateAction } from "react";

export default interface TextSidePanelProps {
    textTools: boolean,
    cardSide: string,
    cardNum: number,
    text: string,
    setText: Dispatch<SetStateAction<string>>,
    textIndex: number | null,
    setFrontCards: any,
    setBackCards: any,
    createText: any,
    deleteText: any
};