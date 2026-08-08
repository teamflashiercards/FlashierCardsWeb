import { BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Home from "./components/UserAuth/Home";
import Signup from "./components/UserAuth/Signup";
import VerifyEmail from "./components/UserAuth/VerifyEmail";
import Login from "./components/UserAuth/Login";
import ForgotPassword from "./components/UserAuth/ForgotPassword";
import ResetPassword from "./components/UserAuth/ResetPassword";
import Dashboard from "./components/Dashboard/Dashboard";
import Study from "./components/Study";
import Edit from "./components/Edit/Edit";
import AccountInformation from "./components/AccountInformation";
import Theme from "./components/Theme";
import ChangePassword from "./components/ChangePassword";
import DeleteAccount from "./components/DeleteAccount";
import About from "./components/About";
import Canvas from "./Canvas";
// import TestEdit from "./test/TestEdit";

/*
    Description: This file contains all the public and private routes.
    Last updated: 7/5/2026
*/

function App() {  
    return (
        <BrowserRouter>
            <Routes>
                {/* public routes */}
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/verify" element={<VerifyEmail />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgotPassword" element={<ForgotPassword />} />
                <Route path="/resetPassword" element={<ResetPassword />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<Navigate to="/"/>} />

                {/* public test routes */}
                {/* <Route path="/testEdit" element={<TestEdit />} /> */}
                <Route path="/testCanvas" element={<Canvas />} />
                
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
        </BrowserRouter>
    );
}

export default App;