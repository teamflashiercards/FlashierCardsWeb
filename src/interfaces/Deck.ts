import type Content from "./Content"

export default interface Deck {
    id: number
    name: string
    content: Content[]
};