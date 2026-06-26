export default interface Card {
    id: number | null,
    deck_id: number | null,
    card_num: number,
    card_side: string,
    text: {
        id: number | null,
        card_id: number,
        input: string,
        width: number,
        font_size: number,
        color: string,
        x: number,
        y: number
    }[],
    gif: {
        id: number | null,
        card_id: number,
        url: string,
        width: number,
        height: number,
        x: number,
        y: number
    }[],
    sticker: {
        id: number | null,
        card_id: number,
        url: string,
        width: number,
        height: number,
        x: number,
        y: number
    }[]
}