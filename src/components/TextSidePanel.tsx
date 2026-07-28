import styles from "../styles/Deck.module.css";

/*
    Description: This is a sub-component that contains code for the text side panel in Edit component.
    Last updated: 7/24/2026
*/

function TextSidePanel({ textPanel, textTools, text, changeTextInput, deleteText, changeTextColor, createText }: any) {
    return (
        <div className={styles.sidePanel} style={{ display: textPanel ? "flex" : "none" }}>
            <div style={{ display: (textTools) ? "flex" : "none" }}>
                <div className={styles.sidePanelTitle}>Text Input</div>
                <div className={styles.textInput}>
                    <textarea placeholder="Enter text here" value={text} onChange={changeTextInput} />
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
                    <div style={{ backgroundColor: "#201002" }} onClick={() => changeTextColor("#201002")}></div>
                    <div style={{ backgroundColor: "#FF2511" }} onClick={() => changeTextColor("#FF2511")}></div>
                    <div style={{ backgroundColor: "#FED43F" }} onClick={() => changeTextColor("#FED43F")}></div>
                    <div style={{ backgroundColor: "#016236" }} onClick={() => changeTextColor("#016236")}></div>
                    <div style={{ backgroundColor: "#E43480" }} onClick={() => changeTextColor("#E43480")}></div>
                    <div style={{ backgroundColor: "#621590" }} onClick={() => changeTextColor("#621590")}></div>
                    <div style={{ backgroundColor: "#1F6CB0" }} onClick={() => changeTextColor("#1F6CB0")}></div>
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
