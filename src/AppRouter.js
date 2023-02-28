import React from "react";
import "./index.css";
import App from "./App";
import Login from "./Login";
import { Typography, Box } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {"Copyright © "}
            howecofe, {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

function AppRouter() {
    
    return (
        <div>
            <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="login" element={<Login />} />
            </Routes>
            </BrowserRouter>
            <Box mt={5}>
                <Copyright />
            </Box>
        </div>
    );
};

export default AppRouter;