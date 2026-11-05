import styles from "../../styles/Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

/*
    Description: This component allows the user to rename a deck on Dashboard.
    Last updated: 8/8/2026
*/


function RenameDeckForm ({ exitOverlay, deckName, setDeckName, submitRenameForm } :any){
    return (   
        <div className={styles.overlay}>
            <div className={styles.exitBtn}>
                <FontAwesomeIcon 
                    icon={faCircleXmark} 
                    onClick={exitOverlay}
                    style={{cursor: "pointer"}}
                />
            </div>
            <form className={styles.form} onSubmit={submitRenameForm}>
                <div>
                    <div className={styles.formText}>
                        Name
                    </div>
                    <input 
                        type="text"
                        name="deckName"
                        value={deckName}
                        onChange={(e) => setDeckName(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className={"fancy-btn"}
                >
                    <span className={"dark-blue-btn-shadow"}></span>
                    <span className={"dark-blue-btn-edge"}></span>
                    <span className={"dark-blue-btn-front"} style={{ minWidth: "150px"}}>Rename deck</span>
                </button>
            </form>
        </div>
    );
}

export default RenameDeckForm;