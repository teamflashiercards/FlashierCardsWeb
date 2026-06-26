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
                <div className={styles.subTitle}>
                    Study The Flashier Way
                </div>
                <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className={styles.fancyBtn}
                    style={{marginBottom: "1.5rem"}}
                >
                    <span className={styles.lightBlueBtnShadow}></span>
                    <span className={styles.lightBlueBtnEdge}></span>
                    <span className={styles.lightBlueBtnFront}>Sign up</span>
                </button>
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className={styles.fancyBtn}
                >
                    <span className={styles.darkBlueBtnShadow}></span>
                    <span className={styles.darkBlueBtnEdge}></span>
                    <span className={styles.darkBlueBtnFront}>Log in</span>
                </button>
            </div>
        </>
    );
}

export default Home;