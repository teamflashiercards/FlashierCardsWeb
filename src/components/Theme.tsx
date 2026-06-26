import Navbar from "./Navbar";
import ProfileNavbar from "./ProfileNavbar";
import styles from "../styles/Profile.module.css";
import { useEffect, useState } from 'react';
import UserAuth from "../AuthContext";

/*
    Description: This component allows user to change background animation.
    Last updated: 6/11/2026
*/

function Theme() {
    const [animation, setAnimation] = useState(1);
    const [error, setError] = useState({ status: false, message: "" });
    const [loading, setLoading] = useState(false);
    const { session } = UserAuth();

    const fetchProfileData = async () => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            // expect an array of object
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data);
            }

            setAnimation(data[0].animation);
            
        } catch (error: any) {
            setError({ status: true, message: error.message });

        } finally {
            setLoading(false);
        }
    };
    
    const updateAnimation = async (animationNum: Number) => {
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/profile`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${session.access_token}`
                },
                body: JSON.stringify({
                    animation: animationNum
                })
            });

            // expect a message in string format
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data);
            }
            
            fetchProfileData();

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
                <div className={styles.appTitle}>
                    Flashier Cards
                </div>
                <div className={styles.profileContent}>
                    <ProfileNavbar currentView={"theme"} />
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
                            Background Animation
                        </div>
                        <div className={styles.subText}>
                            Select background animation for the study page.
                        </div>
                        <div className={styles.animationOptions}>
                            <div
                                style={{border: (animation === 0 ? "2px solid #004A94" : "2px solid #D9EDF8")}} 
                                onClick={() => updateAnimation(0)}
                            >
                                No Animation
                            </div>
                            <div 
                                style={{border: (animation === 1 ? "2px solid #004A94" : "2px solid #D9EDF8")}} 
                                onClick={() => updateAnimation(1)}
                            >
                                Circles Animation
                            </div>
                            <div 
                                style={{border: (animation === 2 ? "2px solid #004A94" : "2px solid #D9EDF8")}} 
                                onClick={() => updateAnimation(2)}
                            >
                                Diamonds Animation
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Theme;