import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import UserAuth from "../AuthContext";

function Dashboard() {
    const navigate = useNavigate();
    const [_error, setError] = useState({ status: false, message: "" });
    const [_loading, setLoading] = useState(false);
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
        setLoading(true);

        try {
            const response = await fetch(`${import.meta.env.VITE_FLASHIER_CARDS_API}/api/profile`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${session.access_token}`
                }
            });

            // get message and deck data
            const data = await response.json();

            console.log(data);

            if (!response.ok) {
                throw new Error(data.message);
            }

            setLoading(false);

        } catch(error: any) {
            setLoading(false);
            setError({status: true, message: error.message});
        }
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