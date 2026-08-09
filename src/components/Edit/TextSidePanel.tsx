import type Card from "../../interfaces/Card";
import styles from "../../styles/Deck.module.css";
import { setFrontCard, setBackCard, deleteFrontCard, deleteBackCard } from "./EditHelpers";

/*
    Description: This is a sub-component that contains code for the text side panel in Edit component.
    Last updated: 8/9/2026
*/

function TextSidePanel(props: any) {
    const { textTools, showTextTools, cardSide, cardNum, text, setText, textIndex, frontCards, setFrontCards, backCards, setBackCards } = props;
    
    // function create text with helpers in util
    function createText(fontSize: number, width: number) {
        if (cardSide === "Front") {
            let content = {id: null, card_id: frontCards[cardNum - 1].id, input: "Double click to edit text", width: width, x: 30, y: 30, font_size: fontSize, color: "#201002"};
            setFrontCard("text", content, setFrontCards, cardNum);
        } else {
            let content = {id: null, card_id: backCards[cardNum - 1].id, input: "Double click to edit text", width: width, x: 30, y: 30, font_size: fontSize, color: "#201002"};
            setBackCard("text", content, setBackCards, cardNum);
        }
    }

    // function to update text color or input with helper function below
    function updateText(updateType: string, updateValue: string) {
        if (cardSide === "Front") {
            setFrontCards((prevCards: Card[]) =>
                updateTextHelper(prevCards, updateType, updateValue)
            );
        } else {
            setBackCards((prevCards: Card[]) =>
                updateTextHelper(prevCards, updateType, updateValue)
            );
        }
    }

    // helper function to update text color or input on front or back of cards
    function updateTextHelper(prevCards: Card[], updateType: string, updateValue: string) {
        return prevCards.map((card, index) =>
            index === (cardNum - 1) ? {...card, text: card.text.map((cardText, i) => {
                if (i === textIndex) {
                    if (updateType === "changeColor") {
                        return {...cardText, color: updateValue};
                    } else if (updateType === "changeInput") {
                        setText(updateValue);
                        return {...cardText, input: updateValue};
                    }
                } else {
                    return cardText;
                }
            })} : card
        );
    }

    // function to delete text with helpers in util
    function deleteText() {
        if (cardSide === "Front") {
            deleteFrontCard("text", textIndex, setFrontCards, cardNum);
        } else {
            deleteBackCard("text", textIndex, setBackCards, cardNum);
        }
        showTextTools(false, null, "");
    }

    return (
        <div className={styles.sidePanel}>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Input</div>
                <div className={styles.textInput}>
                    <textarea placeholder="Enter text here" value={text} onChange={ (e) => updateText("changeInput", e.target.value) } />
                </div>
            </div>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Deletion</div>
                <div className={styles.sidePanelOptions}>
                    <button className={styles.sidePanelBtn} onClick={deleteText}>Delete</button>
                </div>
            </div>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Color</div>
                <div className={styles.sidePanelOptions}>
                    <div style={{ backgroundColor: "#201002" }} onClick={() => updateText("changeColor", "#201002")}></div>
                    <div style={{ backgroundColor: "#FF2511" }} onClick={() => updateText("changeColor", "#FF2511")}></div>
                    <div style={{ backgroundColor: "#FED43F" }} onClick={() => updateText("changeColor", "#FED43F")}></div>
                    <div style={{ backgroundColor: "#016236" }} onClick={() => updateText("changeColor", "#016236")}></div>
                    <div style={{ backgroundColor: "#E43480" }} onClick={() => updateText("changeColor", "#E43480")}></div>
                    <div style={{ backgroundColor: "#621590" }} onClick={() => updateText("changeColor", "#621590")}></div>
                    <div style={{ backgroundColor: "#1F6CB0" }} onClick={() => updateText("changeColor", "#1F6CB0")}></div>
                </div>
            </div>
            <div>
                <div className={styles.sidePanelTitle}>Text Size</div>
                <div className={styles.sidePanelOptions} style={{ marginBottom: "0rem" }}>
                    <button className={styles.sidePanelBtn} onClick={() => createText(18, 300)}>Small</button>
                    <button className={styles.sidePanelBtn} onClick={() => createText(28, 400)}>Medium</button>
                    <button className={styles.sidePanelBtn} onClick={() => createText(38, 600)}>Large</button>
                </div>
            </div>
        </div>
    );
}

export default TextSidePanel;