import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../../styles/Dashboard.module.css";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

/*
    Description: This component allows the user to create a new deck on Dashboard.
    Last updated: 7/28/2026
*/

function CreateDeckForm({ exitOverlay, deckName, setDeckName, submitCreateForm }: any) {
    return (
        <div className={styles.overlay}>
            <div className={styles.exitBtn}>
                <FontAwesomeIcon 
                    icon={faCircleXmark} 
                    onClick={exitOverlay}
                    style={{cursor: "pointer"}}
                />
            </div>
            <form className={styles.form} onSubmit={submitCreateForm}>
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
                    <span className={"dark-blue-btn-front"} style={{ minWidth: "150px"}}>Create deck</span>
                </button>
            </form>
        </div>
    );
}

export default CreateDeckForm;