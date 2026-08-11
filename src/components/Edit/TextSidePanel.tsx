import styles from "../../styles/Deck.module.css";
import type TextSidePanelProps from "../../interfaces/TextSidePanelProps";

/*
    Description: This is a sub-component that contains code for the text side panel in Edit component.
    Last updated: 8/9/2026
*/

function TextSidePanel(props: TextSidePanelProps) {
    const { textTools, text, setText, textIndex, createText, updateText, deleteText } = props;

    return (
        <div className={styles.sidePanel}>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Input</div>
                <div className={styles.textInput}>
                    <textarea 
                        placeholder="Enter text here" 
                        value={text} 
                        onChange={ (e) => {
                            updateText("text", "input", e.target.value, textIndex);
                            setText(e.target.value);
                        }} 
                    />
                </div>
            </div>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Deletion</div>
                <div className={styles.sidePanelOptions}>
                    <button className={styles.sidePanelBtn} onClick={() => deleteText("text", textIndex)}>Delete</button>
                </div>
            </div>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Color</div>
                <div className={styles.sidePanelOptions}>
                    <div style={{ backgroundColor: "#201002" }} onClick={() => updateText("text", "color", "#201002", textIndex)}></div>
                    <div style={{ backgroundColor: "#FF2511" }} onClick={() => updateText("text", "color", "#FF2511", textIndex)}></div>
                    <div style={{ backgroundColor: "#FED43F" }} onClick={() => updateText("text", "color", "#FED43F", textIndex)}></div>
                    <div style={{ backgroundColor: "#016236" }} onClick={() => updateText("text", "color", "#016236", textIndex)}></div>
                    <div style={{ backgroundColor: "#E43480" }} onClick={() => updateText("text", "color", "#E43480", textIndex)}></div>
                    <div style={{ backgroundColor: "#621590" }} onClick={() => updateText("text", "color", "#621590", textIndex)}></div>
                    <div style={{ backgroundColor: "#1F6CB0" }} onClick={() => updateText("text", "color", "#1F6CB0", textIndex)}></div>
                </div>
            </div>
            <div>
                <div className={styles.sidePanelTitle}>Text Size</div>
                <div className={styles.sidePanelOptions} style={{ marginBottom: "0rem" }}>
                    <button className={styles.sidePanelBtn} onClick={() => createText("text", {input: "Double click to edit text", width: 300, x: 30, y: 30, font_size: 18, color: "#201002"})}>Small</button>
                    <button className={styles.sidePanelBtn} onClick={() => createText("text", {input: "Double click to edit text", width: 400, x: 30, y: 30, font_size: 28, color: "#201002"})}>Medium</button>
                    <button className={styles.sidePanelBtn} onClick={() => createText("text", {input: "Double click to edit text", width: 600, x: 30, y: 30, font_size: 38, color: "#201002"})}>Large</button>
                </div>
            </div>
        </div>
    );
}

export default TextSidePanel;