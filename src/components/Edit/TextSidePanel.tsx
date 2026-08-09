import styles from "../../styles/Deck.module.css";
import { createText, changeTextColor, changeTextInput, deleteText } from "./EditTextHelpers";

/*
    Description: This is a sub-component that contains code for the text side panel in Edit component.
    Last updated: 8/3/2026
*/

function TextSidePanel({ textTools, text, cardSide, cardNum, setText, frontCards, setFrontCards, backCards, setBackCards, textIndex, showTextTools }: any) {
    return (
        <div className={styles.sidePanel}>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Input</div>
                <div className={styles.textInput}>
                    <textarea placeholder="Enter text here" value={text} onChange={(e) => changeTextInput(e, cardSide, cardNum, setText, setFrontCards, setBackCards, textIndex)} />
                </div>
            </div>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Deletion</div>
                <div className={styles.sidePanelOptions}>
                    <button className={styles.sidePanelBtn} onClick={() => deleteText(cardSide, cardNum, setFrontCards, setBackCards, textIndex, showTextTools)}>Delete</button>
                </div>
            </div>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Color</div>
                <div className={styles.sidePanelOptions}>
                    <div style={{ backgroundColor: "#201002" }} onClick={() => changeTextColor("#201002", cardSide, cardNum, setFrontCards, setBackCards, textIndex)}></div>
                    <div style={{ backgroundColor: "#FF2511" }} onClick={() => changeTextColor("#FF2511", cardSide, cardNum, setFrontCards, setBackCards, textIndex)}></div>
                    <div style={{ backgroundColor: "#FED43F" }} onClick={() => changeTextColor("#FED43F", cardSide, cardNum, setFrontCards, setBackCards, textIndex)}></div>
                    <div style={{ backgroundColor: "#016236" }} onClick={() => changeTextColor("#016236", cardSide, cardNum, setFrontCards, setBackCards, textIndex)}></div>
                    <div style={{ backgroundColor: "#E43480" }} onClick={() => changeTextColor("#E43480", cardSide, cardNum, setFrontCards, setBackCards, textIndex)}></div>
                    <div style={{ backgroundColor: "#621590" }} onClick={() => changeTextColor("#621590", cardSide, cardNum, setFrontCards, setBackCards, textIndex)}></div>
                    <div style={{ backgroundColor: "#1F6CB0" }} onClick={() => changeTextColor("#1F6CB0", cardSide, cardNum, setFrontCards, setBackCards, textIndex)}></div>
                </div>
            </div>
            <div>
                <div className={styles.sidePanelTitle}>Text Size</div>
                <div className={styles.sidePanelOptions} style={{ marginBottom: "0rem" }}>
                    <button className={styles.sidePanelBtn} onClick={() => createText(18, 300, cardSide, cardNum, frontCards, setFrontCards, backCards, setBackCards)}>Small</button>
                    <button className={styles.sidePanelBtn} onClick={() => createText(28, 400, cardSide, cardNum, frontCards, setFrontCards, backCards, setBackCards)}>Medium</button>
                    <button className={styles.sidePanelBtn} onClick={() => createText(38, 600, cardSide, cardNum, frontCards, setFrontCards, backCards, setBackCards)}>Large</button>
                </div>
            </div>
        </div>
    );
}

export default TextSidePanel;