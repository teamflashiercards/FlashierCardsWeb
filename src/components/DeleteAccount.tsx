import Navbar from "./Navbar";
import ProfileNavbar from "./ProfileNavbar";
import styles from "../styles/Profile.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";
//import { useNavigate } from "react-router-dom";
import { useState } from 'react';
//import UserAuth from "../AuthContext";

/*
    Description: This component allows user to delete their account.
    Last updated: 6/11/2026
*/

function DeleteAccount() {
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
	const [overlay, setOverlay] = useState(false);
    //const navigate = useNavigate();
    //const { session } = UserAuth();

	const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        // TODO: delete user from database with user auth

        try {
			/*
            // delete user in supabase
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/delete`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            // delete user card content in mongodb
            const docResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/deleteCards`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const docData = await docResponse.json();

            if (!response.ok) {
                throw new Error(docData.message);
            }

			navigate(`/`, {replace: true});*/

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setOverlay(false);
			setLoading(false);
		}
    };
	
    return (
		<div className={styles.mainContainer} style={{pointerEvents: overlay ? "none" : "auto"}}>
            <Navbar />
            <div className={styles.subContainer}>
				<div className={"app-title"}>
                    Flashier Cards
                </div>
                <div className={styles.profileTable}>
                    <ProfileNavbar currentView={"deleteAccount"} />
                    <div>
                        { (loading) ?
                            <div className={"error-message"}>
                                Loading request...
                            </div>
                        :
                            (error.status) ?
                                <div className={"error-message"}>{error.message}</div>
                            :
                                <></>
                        }
                        <div className={styles.subText}>
                            If you no longer wish to use Flashier Cards, you can permanently delete your account.
                        </div>
                        <button
                            type="submit"
                            className={"fancy-btn"}
                            onClick={() => setOverlay(true)}
                        >
                            <span className={"dark-blue-btn-shadow"}></span>
                            <span className={"dark-blue-btn-edge"} style={{backgroundColor: "#ca070e"}}></span>
                            <span className={"dark-blue-btn-front"} style={{backgroundColor: "#F3161E"}}>Delete account</span>
                        </button>
                    </div>
                    <form 
                        onSubmit={submitForm} 
                        className={styles.overlay}
                        style={{display: overlay ? "flex" : "none"}}  
                    >
                        <div className={styles.text}>
                            Delete My Account
                        </div>
                        <div className={styles.subText}>
                            Are you sure you want to delete your account? This action cannot be undone.
                        </div>
                        <div>
                            <button
                                type="submit"
                                className={"fancy-btn"}
                                style={{ marginRight: "1rem" }}
                            >
                                <span className={"light-blue-btn-shadow"}></span>
                                <span className={"light-blue-btn-edge"}></span>
                                <span 
                                    className={"light-blue-btn-front"} 
                                    style={{ minWidth: "40px", minHeight: "40px" }}
                                >
                                    <FontAwesomeIcon icon={faCheck} />
                                </span>
                            </button>
                            <button
                                type="button"
                                className={"fancy-btn"}
                                onClick={() => setOverlay(false)}
                            >
                                <span className={"dark-blue-btn-shadow"}></span>
                                <span className={"dark-blue-btn-edge"}></span>
                                <span 
                                    className={"dark-blue-btn-front"}
                                    style={{ minWidth: "40px", minHeight: "40px" }}
                                >
                                    <FontAwesomeIcon icon={faX} />
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DeleteAccount;