import type Text from "./Text";
import type Gif from "./Gif";
import type Sticker from "./Sticker";

export default interface Card {
    id: number | null,
    deck_id: number,
    card_num: number,
    card_side: string,
    text: Text[],
    gif: Gif[],
    sticker: Sticker[]
};