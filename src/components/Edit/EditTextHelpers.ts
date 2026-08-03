import type Card from "../../interfaces/Card";

export function createText(fontSize: number, width: number, cardSide: string, cardNum: number, frontCards: Card[], setFrontCards: any, backCards: Card[], setBackCards: any) {
    if (cardSide === "Front") {
        let tmp = {id: null, card_id: frontCards[cardNum - 1].id, input: "Double click to edit text", width: width, x: 30, y: 30, font_size: fontSize, color: "#201002"};
        setFrontCards((prevCards: Card[]) =>
            prevCards.map((card, index) =>
                index === (cardNum - 1) ? {...card, text: [...card.text, tmp]} : card
            )
        );
    } else if (cardSide === "Back") {
        let tmp = {id: null, card_id: backCards[cardNum - 1].id, input: "Double click to edit text", width: width, x: 30, y: 30, font_size: fontSize, color: "#201002"};
        setBackCards((prevCards: Card[]) =>
            prevCards.map((card, index) =>
                index === (cardNum - 1) ? {...card, text: [...card.text, tmp]} : card
            )
        );
    }
};

export function changeTextColor(newColor: string, cardSide: string, cardNum: number, setFrontCards: any, setBackCards: any, textIndex: number) {
    if (cardSide === "Front") {
        setFrontCards((prevCards: Card[]) =>
            prevCards.map((card, index) =>
                index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                    i === textIndex ? {...cardText, color: newColor} : cardText
                )} : card
            )
        );
    } else if (cardSide == "Back") {
        setBackCards((prevCards: Card[]) =>
            prevCards.map((card, index) =>
                index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                    i === textIndex ? {...cardText, color: newColor} : cardText
                )} : card
            )
        );
    }
};

export function changeTextInput(e: any, cardSide: string, cardNum: number, setText: any, setFrontCards: any, setBackCards: any, textIndex: number) {
    setText(e.target.value);
    if (cardSide === "Front") {
        setFrontCards((prevCards: Card[]) =>
            prevCards.map((card, index) =>
                index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                    i === textIndex ? {...cardText, input: e.target.value} : cardText
                )} : card
            )
        );
    } else if (cardSide == "Back") {
        setBackCards((prevCards: Card[]) =>
            prevCards.map((card, index) =>
                index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) =>
                    i === textIndex ? {...cardText, input: e.target.value} : cardText
                )} : card
            )
        );
    }
};

export function deleteText(cardSide: string, cardNum: number, setFrontCards: any, setBackCards: any, textIndex: number, showTextTools: any) {
    if (cardSide === "Front") {
        setFrontCards((prevCards: Card[]) =>
            prevCards.map((card, index) =>
                index === (cardNum - 1) ? {...card, text: card.text.filter((_, index) =>
                    index != textIndex
                )} : card
            )
        );
    } else if (cardSide == "Back") {
        setBackCards((prevCards: Card[]) =>
            prevCards.map((card, index) =>
                index === (cardNum - 1) ? {...card, text: card.text.filter((_, index) =>
                    index != textIndex
                )} : card
            )
        );
    }
    showTextTools(false, null, "");
};