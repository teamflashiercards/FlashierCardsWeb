import type Card from "../../interfaces/Card";

// function to add text, gif, or sticker objects to frontCards array
export function setFrontCard(contentType: string, content: any, setFrontCards: any, cardNum: number) {
    setFrontCards((prevCards: Card[]) =>
        prevCards.map((card, index) => {
            if (index === (cardNum - 1)) {
                if (contentType === "text") {
                    return {...card, text: [...card.text, content]};
                } else if (contentType === "gif") {
                    return {...card, gif: [...card.gif, content]};
                } else if (contentType === "sticker") {
                    return {...card, sticker: [...card.sticker, content]};
                }
            } else {
                return card;
            }
        })
    );
}

// function to add text, gif, or sticker objects to backCards array
export function setBackCard(contentType: string, content: any, setBackCards: any, cardNum: number) {
    setBackCards((prevCards: Card[]) =>
        prevCards.map((card, index) => {
            if (index === (cardNum - 1)) {
                if (contentType === "text") {
                    return {...card, text: [...card.text, content]};
                } else if (contentType === "gif") {
                    return {...card, gif: [...card.gif, content]};
                } else if (contentType === "sticker") {
                    return {...card, sticker: [...card.sticker, content]};
                }
            } else {
                return card;
            }
        })
    );
}

// function to delete text, gif, or sticker objects from frontCards array
export function deleteFrontCard(contentType: string, contentIndex: number, setFrontCards: any, cardNum: number) {
    setFrontCards((prevCards: Card[]) =>
        prevCards.map((card, index) => {
            if (index === (cardNum - 1)) {
                if (contentType === "text") {
                    return {...card, text: card.text.filter((_, index) =>
                        index != contentIndex
                    )};
                } else if (contentType === "gif") {
                    return {...card, gif: card.gif.filter((_, index) =>
                        index != contentIndex
                    )};
                } else if (contentType === "sticker") {
                    return {...card, sticker: card.sticker.filter((_, index) =>
                        index != contentIndex
                    )};
                }
            } else {
                return card;
            }
        })
    );
}

// function to delete text, gif, or sticker objects from backCards array
export function deleteBackCard(contentType: string, contentIndex: number, setBackCards: any, cardNum: number) {
    setBackCards((prevCards: Card[]) =>
        prevCards.map((card, index) => {
            if (index === (cardNum - 1)) {
                if (contentType === "text") {
                    return {...card, text: card.text.filter((_, index) =>
                        index != contentIndex
                    )};
                } else if (contentType === "gif") {
                    return {...card, gif: card.gif.filter((_, index) =>
                        index != contentIndex
                    )};
                } else if (contentType === "sticker") {
                    return {...card, sticker: card.sticker.filter((_, index) =>
                        index != contentIndex
                    )};
                }
            } else {
                return card;
            }
        })
    );
}