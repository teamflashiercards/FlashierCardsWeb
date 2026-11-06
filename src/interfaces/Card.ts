import type Text from "./Text";
import type Gif from "./Gif";
import type Sticker from "./Sticker";

export default interface Card {
    text: Text[]
    gif: Gif[]
    sticker: Sticker[]
};