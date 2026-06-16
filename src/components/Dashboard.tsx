import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import UserAuth from "../AuthContext";

function Dashboard() {
    const navigate = useNavigate();
    const { session, logout } = UserAuth();

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
  
    const fetchData = async () => {
        const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/profile`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${session.access_token}`
            }
        });

        // get message and deck data
        const data = await response.json();

        console.log(data);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div>
            <div>Hello World</div>
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default Dashboard;