import { useNavigate } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";
import UserAuth from "../AuthContext";
import Tooltip from "@mui/material/Tooltip";
import styles from "../styles/Home.module.css";

/*
    Description: This component is used to reset password from login route.
    Last updated: 6/12/2026
*/

function ResetPassword() {
    const navigate = useNavigate();
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { updatePassword, session } = UserAuth();

    const [formData, setFormData] = useState({
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

        try {
            const passwordRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[\\W]).{8,}$");

            // verify user input
            if (formData.newPassword === "" || formData.confirmNewPassword === "") {
                throw new Error("Please complete the form.");

            } else if (!passwordRegex.test(formData.newPassword)) {
                throw new Error("Password should have 8 characters with at least one uppercase letter, lowercase letter, number, and symbol.");
            
            } else if (formData.newPassword !== formData.confirmNewPassword) {
                throw new Error("Password and Confirm password do not match.");
            }

            // make request to update user's account password
            const result = await updatePassword(formData.newPassword);

            if (!result.success) {
                throw new Error(result.error.message);
            }

            navigate("/dashboard");

        } catch(error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    // redirect user back to dashboard if they are logged in
    useEffect(() => {
        const checkSession = async () => {
            if (session) {
                navigate("/dashboard");
            }
        };
        checkSession();
    }, []);

    return (
        <div className={styles.subContainer}>
            <div className={"app-title"}>
                Flashier Cards
            </div>
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
            <form className={styles.form} onSubmit={submitForm}>
                <Tooltip title="Password should have 8 characters with at least one uppercase letter, lowercase letter, number, and symbol.">
                    <div>
                        <div className={styles.formText}>New password</div>
                        <input
                            type="password"
                            name="newPassword"
                            value={formData.newPassword}
                            onChange={handleFormData}
                        />
                    </div>
                </Tooltip>
                <div>
                    <div className={styles.formText}>Confirm new password</div>
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
                    <span className={"dark-blue-btn-front"}>Reset password</span>
                </button>
            </form>
        </div>
    );
}

export default ResetPassword;