import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import PrivateRoute from "./PrivateRoute";
import Home from "./components/Home";
import Signup from "./components/Signup";
import VerifyEmail from "./components/VerifyEmail";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import Dashboard from "./components/Dashboard";
import Study from "./components/Study";
import Edit from "./components/Edit";
import AccountInformation from "./components/AccountInformation";
import Theme from "./components/Theme";
import ChangePassword from "./components/ChangePassword";
import DeleteAccount from "./components/DeleteAccount";
import About from "./components/About";
import FeedbackButton from "./components/FeedbackButton";

/*
    Description: This file contains all the public and private routes.
    Last updated: 6/6/2026
*/

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify" element={<VerifyEmail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/"/>} />

                {/* private routes */}
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/dashboard/study/:deckId" element={<Study />} />
                    <Route path="/dashboard/edit/:deckId" element={<Edit />} />
                    <Route path="/profile/accountInformation" element={<AccountInformation />} />
                    <Route path="/profile/theme" element={<Theme />} />
                    <Route path="/profile/changePassword" element={<ChangePassword />} />
                    <Route path="/profile/deleteAccount" element={<DeleteAccount />} />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    return (
        <BrowserRouter>
            <FeedbackButton />
            <AnimatedRoutes />
        </BrowserRouter>
    );
}

export default App;
