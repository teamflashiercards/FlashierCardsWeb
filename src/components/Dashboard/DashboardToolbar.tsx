import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faPlus, faFolderOpen, faPencil, faICursor, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import BlueTooltip from "../BlueTooltip";
import styles from "../../styles/Dashboard.module.css";

/*
    Description: This is a sub-component that contains code for the Dashboard component's toolbar.
    Last updated: 11/5/2026
*/

function DashboardToolbar(props: any) {
    const { deckId, setDeckId, showTools, setShowTools, setCreateOverlay, setRenameOverlay, deleteDeck } = props;
    const navigate = useNavigate();
    
    return (
        <div className={styles.toolbar}>
            <BlueTooltip title="Create New Deck">
                <button
                    type="button"
                    className={styles.toolOption}
                    onClick={() => setCreateOverlay(true)} 
                >
                    <span className={styles.shadow}></span>
                    <span className={styles.edge}></span>
                    <span className={styles.front}>
                        <FontAwesomeIcon icon={faPlus} />
                    </span>
                </button>
            </BlueTooltip>
            <BlueTooltip title="Study Deck">
                <button
                    type="button"
                    style={{ display: showTools ? "inline-block" : "none" }}
                    className={styles.toolOption}
                    onClick={() => navigate(`/dashboard/study/${deckId}`)}
                >
                    <span className={styles.shadow}></span>
                    <span className={styles.edge}></span>
                    <span className={styles.front}>
                        <FontAwesomeIcon icon={faFolderOpen} />
                    </span>
                </button>
            </BlueTooltip>
            <BlueTooltip title="Edit Deck">
                <button
                    type="button"
                    style={{ display: showTools ? "inline-block" : "none" }}
                    className={styles.toolOption}
                    onClick={() => navigate(`/dashboard/edit/${deckId}`)}
                >
                    <span className={styles.shadow}></span>
                    <span className={styles.edge}></span>
                    <span className={styles.front}>
                        <FontAwesomeIcon icon={faPencil} />
                    </span>
                </button>
            </BlueTooltip>
            <BlueTooltip title="Rename Deck">
                <button
                    type="button"
                    style={{ display: showTools ? "inline-block" : "none" }}
                    className={styles.toolOption}
                    onClick={() => setRenameOverlay(true)}
                >
                    <span className={styles.shadow}></span>
                    <span className={styles.edge}></span>
                    <span className={styles.front}>
                        <FontAwesomeIcon icon={faICursor} />
                    </span>
                </button>
            </BlueTooltip>
            <BlueTooltip title="Delete Deck">
                <button
                    type="button"
                    style={{ display: showTools ? "inline-block" : "none" }}
                    className={styles.toolOption}
                    onClick={deleteDeck}
                >
                    <span className={styles.shadow}></span>
                    <span className={styles.edge}></span>
                    <span className={styles.front}>
                        <FontAwesomeIcon icon={faTrash} />
                    </span>
                </button>
            </BlueTooltip>
            <BlueTooltip title="Cancel Selection">
                <button
                    type="button"
                    onClick={() => {
                        setDeckId(null);
                        setShowTools(false);
                    }}
                    style={{ display: showTools ? "inline-block" : "none" }}
                    className={styles.toolOption}
                >
                    <span className={styles.shadow}></span>
                    <span className={styles.edge}></span>
                    <span className={styles.front}>
                        <FontAwesomeIcon icon={faCircleXmark} />
                    </span>
                </button>
            </BlueTooltip>
        </div>
    );
}

export default DashboardToolbar;