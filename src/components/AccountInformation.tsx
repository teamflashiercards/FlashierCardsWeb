import Navbar from "./Navbar";
import ProfileNavbar from "./ProfileNavbar";
import styles from "../styles/Profile.module.css";
import { useEffect, useState } from 'react';
import UserAuth from "../AuthContext";

/*
    Description: This component displays basic user information.
    Last updated: 6/10/2026
*/

function AccountInformation() {
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const [totalDecks, setTotalDecks] = useState(0);
    const { session } = UserAuth();

    const fetchDeckData = async () => {
        setLoading(true);

        try {
            const token = session.access_token;

            const deckResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/deck`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            const deckData = await deckResponse.json();

            if (!deckResponse.ok) {
                throw new Error(deckData.message);
            }

            setTotalDecks(deckData.length);

            /*
            // get list of decks to count
            const deckResponse = await fetch(`${import.meta.env.VITE_API_URL}/user/${userId}/decks`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            // get message and deck data
            const deckData = await deckResponse.json();

            if (!deckResponse.ok) {
                throw new Error(deckData.message);
            }

            setTotalDecks(deckData.length);*/
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
                <div className={styles.appTitle}>
                    Flashier Cards
                </div>
                <div className={styles.profileContent}>
                    <ProfileNavbar currentView={"accountInformation"} />
                    <div>
                        { (loading) ?
                            <div className={styles.errorMessage}>
                                Loading request...
                            </div>
                        :
                            (error.status) ?
                                <div className={styles.errorMessage}>{error.message}</div>
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
                        <div className={styles.subText} style={{marginBottom: "0rem"}}>
                            {totalDecks}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountInformation;