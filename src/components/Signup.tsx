import { useNavigate } from "react-router-dom";
import { useState, type ChangeEvent } from "react";
import UserAuth from "../AuthContext";
import HomeAnimation from "./HomeAnimation";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/Home.module.css";
import FeedbackButton from "./FeedbackButton";
import BlueTooltip from "./BlueTooltip";

/*
    Description: This component is the signup page for a user to create an account.
    Last updated: 6/12/2026
*/

function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { signup } = UserAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        confirmPassword: ""
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

            // TODO: create regex for email and add verification below

            // verify user input
            if (formData.email === "" || formData.password === "" || formData.confirmPassword === "") {
                throw new Error("Please complete the form.");

            } else if (!passwordRegex.test(formData.password)) {
                throw new Error("Password should have 8 characters with at least one uppercase letter, lowercase letter, number, and symbol.");
            
            } else if (formData.password !== formData.confirmPassword) {
                throw new Error("Password and Confirm password do not match.");
            }

            // make request to create user account
            const result = await signup(formData.email.trim().toLowerCase(), formData.password);

            if (!result.success) {
                throw new Error(result.error.message);

            // check if user already exists
            } else if (result.data.user && result.data.user.identities.length === 0) {
                throw new Error("User with this email already exists.");
            }
                        
            // to be used for verification
            localStorage.setItem("email", formData.email.trim().toLowerCase());

            // go to token verification page
            navigate("/verify");

        } catch (error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <HomeAnimation />
            <BlueTooltip title="Home" placement="bottom">
                <div className={styles.homeButton}>
                    <FontAwesomeIcon className={styles.homeIcon} icon={faHouse} onClick={() => navigate("/")} />
                </div>
            </BlueTooltip>
            <div className={styles.subContainer}>
                <div className={"app-title"}>
                    Join Flashier Cards
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
                    <div>
                        <div className={styles.formText}>Email</div>
                        <input 
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormData}
                        />
                    </div>
                    <BlueTooltip title="Password should have 8 characters with at least one uppercase letter, lowercase letter, number, and symbol.">
                        <div>
                            <div className={styles.formText}>Password</div>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleFormData}
                            />
                        </div>
                    </BlueTooltip>
                    <div>
                        <div className={styles.formText}>Confirm password</div>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={formData.confirmPassword}
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
                        <span className={"dark-blue-btn-front"}>Create account</span>
                    </button>
                </form>
            </div>
            <FeedbackButton />
        </>
    );
}

export default Signup;