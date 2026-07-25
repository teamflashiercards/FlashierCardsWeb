import styles from "../styles/Deck.module.css";
import BlueTooltip from "./BlueTooltip";
import { faPlus, faT, faHeart, faTrash, faFloppyDisk, faCircleXmark, faRightLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditNavbar ( {createCard, showSidePanel, deleteCard, flipCard, saveDeckContent, closeSidePanel}: any) {
    return (
        <div className={styles.toolbar}>
        <BlueTooltip title="Add Card">
            <button
                type="button"
                className={styles.toolOption}
                onClick={createCard}
            >
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                    <FontAwesomeIcon icon={faPlus} />
                </span>
            </button>
        </BlueTooltip>
        <BlueTooltip title="Add Text">
            <button
                type="button"
                className={styles.toolOption}
                onClick={() => showSidePanel("text")}
            >
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                    <FontAwesomeIcon icon={faT} />
                </span>
            </button>
        </BlueTooltip>
        <BlueTooltip title="Add Gif">
            <button
                type="button"
                className={styles.toolOption}
                onClick={() => showSidePanel("gif")}
            >
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front} style={{fontWeight: "600"}}>
                    GIF
                </span>
            </button>
        </BlueTooltip>
        <BlueTooltip title="Add Sticker">
            <button
                type="button"
                className={styles.toolOption}
                onClick={() => showSidePanel("sticker")}
            >
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                    <FontAwesomeIcon icon={faHeart} />
                </span>
            </button>
        </BlueTooltip>
        <BlueTooltip title="Delete Card">
            <button
                type="button"
                className={styles.toolOption}
                onClick={deleteCard}
            >
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                    <FontAwesomeIcon icon={faTrash} />
                </span>
            </button>
        </BlueTooltip>
        <BlueTooltip title="Flip Card">
            <button
                type="button"
                className={styles.toolOption}
                onClick={() => flipCard()}
            >
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                    <FontAwesomeIcon icon={faRightLeft} />
                </span>
            </button>
        </BlueTooltip>
        <BlueTooltip title="Save Content">
            <button
                type="button"
                className={styles.toolOption} 
                onClick={saveDeckContent}                       
            >
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                    <FontAwesomeIcon icon={faFloppyDisk} />
                </span>
            </button>
        </BlueTooltip>
        <BlueTooltip title="Close Side Panel">
            <button
                type="button"
                className={styles.toolOption}
                onClick={closeSidePanel}
            >
                <span className={styles.shadow}></span>
                <span className={styles.edge}></span>
                <span className={styles.front}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </span>
            </button>
        </BlueTooltip>
    </div>
    )
}
export default EditNavbar;