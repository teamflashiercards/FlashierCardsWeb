import type { Dispatch, SetStateAction } from "react";

interface Error {
    status: boolean 
    message: string
};

export default interface GifSidePanelProps {
    setLoading: Dispatch<SetStateAction<boolean>>
    setError: Dispatch<SetStateAction<Error>>
    gifTools: boolean
    gifIndex: number | null
    createGif: any
    deleteGif: any
};