import type { Dispatch, SetStateAction } from "react";

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