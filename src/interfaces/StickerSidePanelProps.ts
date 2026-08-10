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
    createSticker: any,
    deleteSticker: any
};