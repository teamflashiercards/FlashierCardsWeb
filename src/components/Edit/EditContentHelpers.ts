import type Card from "../../interfaces/Card";

/*
    Description: These functions help create or delete text, gifs, and stickers in Edit side panel components.
    Last updated: 8/10/2026
*/

// adds text, gif, or sticker objects to frontCards array
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
};

// adds text, gif, or sticker objects to backCards array
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
};

// udates text, gif, or sticker objects in frontCards array
export function updateFrontCard(contentType: string, contentKey: string, contentValue: string, contentIndex: number, setFrontCards: any, cardNum: number) {
    setFrontCards((prevCards: Card[]) =>
        prevCards.map((card, index) => {
            if (index === (cardNum - 1)) {
                if (contentType === "text") {
                    return {...card, text: card.text.map((cardText, textIndex) => {
                        if (textIndex === contentIndex) {
                            return {...cardText, [contentKey]: contentValue};
                        } else {
                            return cardText;
                        }
                    })};
                } else if (contentType === "gif") {
                    return null;
                } else if (contentType === "sticker") {
                    return null;
                }
            } else {
                return card;
            }
        })
    );
};

// udates text, gif, or sticker objects in backCards array
export function updateBackCard(contentType: string, contentKey: string, contentValue: string, contentIndex: number, setBackCards: any, cardNum: number) {
    setBackCards((prevCards: Card[]) =>
        prevCards.map((card, index) => {
            if (index === (cardNum - 1)) {
                if (contentType === "text") {
                    return {...card, text: card.text.map((cardText, textIndex) => {
                        if (textIndex === contentIndex) {
                            return {...cardText, [contentKey]: contentValue};
                        } else {
                            return cardText;
                        }
                    })};
                } else if (contentType === "gif") {
                    return null;
                } else if (contentType === "sticker") {
                    return null;
                }
            } else {
                return card;
            }
        })
    );
};

// deletes text, gif, or sticker objects from frontCards array
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
};

// deletes text, gif, or sticker objects from backCards array
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
};