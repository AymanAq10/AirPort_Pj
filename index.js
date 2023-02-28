import React from "react";
import ReactDOM from "react-dom/client";
import AdminPage from "./AdminPage/AdminPage";
import RequestPage from "./RequestPage/RequestPage";
import { BrowserRouter } from 'react-router-dom';
// import App from "./Home_login-Signup/App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <AdminPage />
);