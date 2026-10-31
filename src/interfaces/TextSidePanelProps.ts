import type { Dispatch, SetStateAction } from "react";

export default interface TextSidePanelProps {
    textTools: boolean
    text: string
    setText: Dispatch<SetStateAction<string>>
    textIndex: number | null
    insertText: any
    updateText: any
    deleteText: any
};