import Navbar from "./Navbar";
import ProfileNavbar from "./ProfileNavbar";
import styles from "../styles/Profile.module.css";
import { useEffect, useState } from 'react';
import UserAuth from "../AuthContext";
import type Profile from "../interfaces/Profile";
import FeedbackButton from "./FeedbackButton";

/*
    Description: This component allows user to change background animation.
    Last updated: 6/26/2026
*/

function Theme() {
    const [profile, setProfile] = useState<Profile>();
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { session } = UserAuth();

    const fetchProfileData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message);
            setProfile(data[0]);
            
        } catch (error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };
    
    const updateAnimation = async (animation: number) => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/profile/${profile?.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    animation: animation
                })
            });

            const data = await response.json();
            if (!response.ok)  throw new Error(data.message);
            setProfile(data[0]);

        } catch (error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <div className={styles.mainContainer}>
            <Navbar/>
            <div className={styles.subContainer}>
                <div className={"app-title"}>
                    Flashier Cards
                </div>
                <div className={styles.profileTable}>
                    <ProfileNavbar currentView={"theme"} />
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
                            Background Animation
                        </div>
                        <div className={styles.subText}>
                            Select background animation for the study page.
                        </div>
                        <div className={styles.animationOptions}>
                            <div
                                style={{ border: (profile?.animation === 0 ? "2px solid #004A94" : "2px solid #D9EDF8") }} 
                                onClick={() => updateAnimation(0)}
                            >
                                No Animation
                            </div>
                            <div 
                                style={{ border: (profile?.animation === 1 ? "2px solid #004A94" : "2px solid #D9EDF8") }} 
                                onClick={() => updateAnimation(1)}
                            >
                                Circles Animation
                            </div>
                            <div 
                                style={{ border: (profile?.animation === 2 ? "2px solid #004A94" : "2px solid #D9EDF8") }} 
                                onClick={() => updateAnimation(2)}
                            >
                                Diamonds Animation
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <FeedbackButton />
        </div>
    );
}

export default Theme;