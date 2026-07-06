import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import UserAuth from "../AuthContext";
import styles from "../styles/Home.module.css";
import HomeAnimation from "./HomeAnimation";

/*
    Description: This component is the home page that leads to signup and login.
    Last updated: 6/12/2026
*/

function Home() {
    const navigate = useNavigate();
    const { session } = UserAuth();
    
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
            <div className={styles.mainContainer}>
                <div className={styles.homeTitle}>
                    Flashier Cards
                </div>
                <div 
                    className={styles.homeSubTitle}
                    onClick={() => navigate("/about")}
                >
                    Study The Flashier Way
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className={"fancy-btn"}
                    style={{marginBottom: "1.5rem"}}
                >
                    <span className={"light-blue-btn-shadow"}></span>
                    <span className={"light-blue-btn-edge"}></span>
                    <span className={"light-blue-btn-front"}>Sign up</span>
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className={"fancy-btn"}
                >
                    <span className={"dark-blue-btn-shadow"}></span>
                    <span className={"dark-blue-btn-edge"}></span>
                    <span className={"dark-blue-btn-front"}>Log in</span>
                </button>
            </div>
        </>
    );
}

export default Home;