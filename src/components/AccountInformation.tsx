import Navbar from "./Navbar";
import ProfileNavbar from "./ProfileNavbar";
import styles from "../styles/Profile.module.css";
import { useEffect, useState } from 'react';
import UserAuth from "../AuthContext";
import FeedbackButton from "./FeedbackButton";

/*
    Description: This component displays basic user information.
    Last updated: 6/26/2026
*/

function AccountInformation() {
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const [totalDecks, setTotalDecks] = useState(0);
    const { session } = UserAuth();

    const fetchDeckData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/deck`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setTotalDecks(data.length);

        } catch (error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeckData();
    }, []);

    return (
        <div className={styles.mainContainer}>
            <Navbar />
            <div className={styles.subContainer}>
                <div className={"app-title"}>
                    Flashier Cards
                </div>
                <div className={styles.profileTable}>
                    <ProfileNavbar currentView={"accountInformation"} />
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
                        <div className={styles.text}>
                            Email
                        </div>
                        <div className={styles.subText}>
                            {session.user.email}
                        </div>
                        <div className={styles.text}>
                            Date Account Created
                        </div>
                        <div className={styles.subText}>
                            {new Date(session.user.created_at).toDateString()}
                        </div>
                        <div className={styles.text}>
                            Total Number of Decks
                        </div>
                        <div className={styles.subText} style={{ marginBottom: "0rem" }}>
                            {totalDecks}
                        </div>
                    </div>
                </div>
            </div>
            <FeedbackButton />
        </div>
    );
}

export default AccountInformation;