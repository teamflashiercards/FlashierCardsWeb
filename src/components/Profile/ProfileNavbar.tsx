import { useNavigate } from "react-router-dom";
import styles from "../../styles/ProfileNavbar.module.css";

/*
    Description: This is a reuable component that contains the code for profile navigation.
    Last updated: 6/10/2026
*/

function ProfileNavbar({ currentView }: any) {
    const navigate = useNavigate();

    return (
        <div className={styles.navbar}>
            <button
                type="button"
                style={{backgroundColor: (currentView === "accountInformation") ? "#003971" : "#004A94"}}
                className={styles.navOption}
                onClick={() => navigate("/profile/accountInformation")}
            >
                Account Information
            </button>
            <button
                type="button"
                style={{backgroundColor: (currentView === "theme") ? "#003971" : "#004A94"}}
                className={styles.navOption}
                onClick={() => navigate("/profile/theme")}
            >
                Theme
            </button>
            <button
                type="button"
                style={{backgroundColor: (currentView === "changePassword") ? "#003971" : "#004A94"}}
                className={styles.navOption}
                onClick={() => navigate("/profile/changePassword")}
            >
                Change Password
            </button>
            <button
                type="button"
                style={{backgroundColor: (currentView === "deleteAccount") ? "#003971" : "#004A94"}}
                className={styles.navOption}
                onClick={() => navigate("/profile/deleteAccount")}
            >
                Delete Account
            </button>
        </div>
    );
}

export default ProfileNavbar;