import type { Dispatch, SetStateAction } from "react";
import type Card from "./Card";

interface Error {
    status: boolean, 
    message: string
};

export default interface GifSidePanelProps {
    setLoading: Dispatch<SetStateAction<boolean>>,
    setError: Dispatch<SetStateAction<Error>>,
    gifTools: boolean,
    createGif: any,
    deleteGif: any
};