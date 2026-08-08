import styles from "../../styles/Dashboard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

function RenameDeckForm ({renameOverlay, submitRenameForm, exitOverlay, deckName, handleFormData} :any){
 return (   
<div className={styles.overlay} style={{ display: renameOverlay ? "flex" : "none" }}>
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
                                    onChange={handleFormData}
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
 )
}

export default RenameDeckForm;