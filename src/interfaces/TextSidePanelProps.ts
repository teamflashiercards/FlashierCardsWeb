import type { Dispatch, SetStateAction } from "react";

export default interface TextSidePanelProps {
    textTools: boolean
    text: string
    setText: Dispatch<SetStateAction<string>>
    textIndex: number | null
    createText: any
    updateText: any
    deleteText: any
};