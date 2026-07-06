import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faFolder, faCircleUser, faRightFromBracket, faInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "../styles/Navbar.module.css";
import UserAuth from "../AuthContext";

/*
    Description: This is a reuable component that contains the code for app navigation.
    Last updated: 6/10/2026
*/

function Navbar() {
    const navigate = useNavigate();
    const [menu, setMenu] = useState(false);
    const { logout } = UserAuth();

    const handleLogout = async () => {
        try {
            const result = await logout();
            if (!result.success) {
                throw new Error(result.error.message);
            }
            navigate("/");
        } catch (error: any) {
            console.error(error.message);
        }
    };

    return (
        <div className={styles.navbar}>
            <button 
                type="button"
                className={styles.navOption}
                onClick={() => {setMenu(!menu)}}
            >
                <span><FontAwesomeIcon icon={faBars} /></span>
                <span style={{display: menu ? "block" : "none"}}>Menu</span>
            </button>
            <button 
                type="button"
                className={styles.navOption}
                onClick={() => navigate("/dashboard")}
            >
                <span><FontAwesomeIcon icon={faFolder} /></span>
                <span style={{display: menu ? "block" : "none"}}>Decks</span>
            </button>
            <button 
                type="button"
                className={styles.navOption}
                onClick={() => navigate("/profile/accountInformation")}
            >
                <span><FontAwesomeIcon icon={faCircleUser} /></span>
                <span style={{display: menu ? "block" : "none"}}>Profile</span>
            </button>
            <button 
                type="button"
                className={styles.navOption}
                onClick={() => navigate("/about")}
            >
                <span><FontAwesomeIcon icon={faInfo} /></span>
                <span style={{display: menu ? "block" : "none"}}>Info</span>
            </button>
            <button 
                type="button"
                className={styles.navOption}
                onClick={handleLogout}
            >
                <span><FontAwesomeIcon icon={faRightFromBracket} /></span>
                <span style={{display: menu ? "block" : "none"}}>Logout</span>
            </button>
        </div>
    );
}

export default Navbar;