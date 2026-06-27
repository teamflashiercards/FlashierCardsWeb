import Navbar from "./Navbar";
import ProfileNavbar from "./ProfileNavbar";
import { useState, type ChangeEvent } from 'react';
import styles from "../styles/Profile.module.css";
import UserAuth from "../AuthContext";
import Tooltip from "@mui/material/Tooltip";

/*
    Description: This component allows user to change their password.
    Last updated: 6/10/2026
*/

function ChangePassword() {
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { session } = UserAuth();

    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: ""
    });

    function handleFormData(e: ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev, [name]: value
        }));
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        // TODO: update user password with user auth

        try {
            /*
            const response = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/changePassword`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    currentPassword: formData.currentPassword,
                    newPassword: formData.newPassword,
                    confirmNewPassword: formData.confirmNewPassword
                })
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message);
            }

            
            setSuccess(true);
            // throw an exception show success with message
          */

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.mainContainer}>
            <Navbar />
            <div className={styles.subContainer}>
                <div className={"app-title"}>
                    Flashier Cards
                </div>
                <div className={styles.profileTable}>
                    <ProfileNavbar currentView={"changePassword"} />
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
                            Complete the form below to change your password.
                        </div>
                        <form className={styles.form} onSubmit={submitForm}>
                            <div>
                                <div className={styles.formText}>
                                    Current password
                                </div>
                                <input 
                                    type="password"
                                    name="currentPassword"
                                    value={formData.currentPassword}
                                    onChange={handleFormData}
                                />
                            </div>
                            <Tooltip title="Password should have 8 characters with at least one uppercase letter, lowercase letter, number, and symbol.">
                                <div>
                                    <div className={styles.formText}>
                                        New password
                                    </div>
                                    <input 
                                        type="password"
                                        name="newPassword"
                                        value={formData.newPassword}
                                        onChange={handleFormData}
                                    />
                                </div>
                            </Tooltip>
                            <div>
                                <div className={styles.formText}>
                                    Confirm new password
                                </div>
                                <input 
                                    type="password"
                                    name="confirmNewPassword"
                                    value={formData.confirmNewPassword}
                                    onChange={handleFormData}
                                />
                            </div>
                            <button
                                type="submit"
                                className={"fancy-btn"}
                                style={{ marginTop: "0.5rem" }}
                            >
                                <span className={"dark-blue-btn-shadow"}></span>
                                <span className={"dark-blue-btn-edge"}></span>
                                <span className={"dark-blue-btn-front"}>Change password</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChangePassword;