import type Card from "./Card"

export default interface Content {
    card_num: number
    front_card: Card
    back_card: Card
};