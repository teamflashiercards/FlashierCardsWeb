import { useEffect, useState } from "react";
import UserAuth from "../AuthContext";
import { useNavigate } from "react-router-dom";
import styles from "../styles/Home.module.css";

/*
    Description: This component is used to verify user's email when they create an account.
    Last updated: 6/12/2026
*/

function VerifyEmail() {
    const navigate = useNavigate();
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { verifyToken, session } = UserAuth();
    const [token, setToken] = useState("");

    function handleFormData(e: any) {
        setToken(e.target.value);
    }

    const createUserProfile = async (accessToken: string) => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/profile`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${accessToken}`
                },
                body: JSON.stringify({
                    animation: 1
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message);
            }

            const data = await response.json();
            console.log(data);

        } catch (error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    }

    const submitForm = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            // get and remove email from local storage
            const email = localStorage.getItem("email");
            localStorage.removeItem("email");

            // verify user input
            if (token === "") {
                throw new Error("Please enter the token.");
            }

            // make request to do email verification
            const result = await verifyToken(email, token);

            if (!result.success) {
                throw new Error("Please enter a valid token.");
            }

            // create user profile during signup
            createUserProfile(result.data.session.access_token);

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

    return(
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
                    <div className={"error-message"}>
                        Please check your email for the 6 digit verification token
                    </div>
            }
            <form className={styles.form} onSubmit={submitForm}>
                <div>
                    <div className={styles.formText}>Verification token</div>
                    <input
                        type="text"
                        name="token"
                        value={token}
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
                    <span className={"dark-blue-btn-front"}>Confirm</span>
                </button>
            </form>
        </div>
    );
}

export default VerifyEmail;