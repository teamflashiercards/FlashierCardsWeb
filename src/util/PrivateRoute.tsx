import { Navigate, Outlet } from "react-router-dom";
import UserAuth from "./AuthContext";

/*
    Description: This component is used in App to protect private routes.
    Last updated: 6/5/2026
*/

const PrivateRoute = () => {
    const { session } = UserAuth();

    if (session === undefined) {
        return <div>Loading...</div>;
    } else {
        return session ? <Outlet/> : <Navigate to="/" replace/>;
    }
};

export default PrivateRoute;