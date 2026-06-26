import { useNavigate } from "react-router-dom";
import { useEffect, useState, type ChangeEvent } from "react";
import UserAuth from "../AuthContext";
import styles from "../styles/Home.module.css";
import HomeAnimation from "./HomeAnimation";

/*
    Description: This component is the login page for a user to access their account.
    Last updated: 6/12/2026
*/

function Login() {
    const navigate = useNavigate();
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { login, session } = UserAuth();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
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
            // verify user input
            if (formData.email === "" || formData.password === "") {
                throw new Error("Please complete the form.");
            }

            // make request to login user
            const result = await login(formData.email.trim().toLowerCase(), formData.password);

            if (!result.success) {
                throw new Error(result.error.message);
            }

            navigate("/dashboard");

        } catch (error: any) {
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
        <>
            <HomeAnimation />
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
                    <div>
                        <div className={styles.formText}>Email</div>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleFormData}
                        />
                    </div>
                    <div>
                        <div className={styles.formText}>Password</div>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleFormData}
                        />
                    </div>
                    <button
                        type="submit"
                        className={"fancy-btn"}
                        style={{ marginTop: "0.5rem", marginBottom: "1.5rem" }}
                    >
                        <span className={"dark-blue-btn-shadow"}></span>
                        <span className={"dark-blue-btn-edge"}></span>
                        <span className={"dark-blue-btn-front"}>Log in</span>
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate("/forgotPassword")}
                        className={"fancy-btn"}
                    >
                        <span className={"light-blue-btn-shadow"}></span>
                        <span className={"light-blue-btn-edge"}></span>
                        <span className={"light-blue-btn-front"}>Forgot password?</span>
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;