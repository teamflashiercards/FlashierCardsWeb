import { useState } from "react";
import UserAuth from "../../util/AuthContext";
import styles from "../../styles/Home.module.css";
import Alert from "@mui/material/Alert";

/*
    Description: This component is used to handle forgot password from login route.
    Last updated: 11/5/2026
*/

function ForgotPassword() {
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { resetPassword } = UserAuth();
    const [email, setEmail] = useState("");

    function handleFormData(e: any) {
        setEmail(e.target.value);
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // verify user input
            if (email === "") {
                throw new Error("Please enter your email.");
            }

            // make request to allow user to reset password
            const result = await resetPassword(email);

            if (!result.success) {
                throw new Error(result.error.message);
            }

            throw new Error("Check your email to reset password.");

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.subContainer}>
            <div className={"app-title"}>
                Flashier Cards
            </div>
            { (loading) ?
                <Alert severity="info" style={{marginBottom: "0.5rem"}}>
                    Loading request...
                </Alert>
            :
                (error.status) ?
                    <Alert severity="error" style={{marginBottom: "0.5rem"}}>
                        {error.message}
                    </Alert>
                :
                    <></>
            }
            <form className={styles.form} onSubmit={submitForm}>
                <div>
                    <div className={styles.formText}>Email</div>
                    <input
                        type="email"
                        name="email"
                        value={email}
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
                    <span className={"dark-blue-btn-front"}>Continue</span>
                </button>
            </form>
        </div>
    );
}

export default ForgotPassword;