import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import About from "./pages/About";
import Dashbord from "./pages/Dashbord";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
    return (
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route element={<PrivateRoute />}>
                    <Route path="/dashboard" element={<Dashbord />} />
                </Route>
                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/dashbord" element={<Dashbord />} />
                <Route path="/projects" element={<Projects />} />
            </Routes>
        </BrowserRouter>
    );
}
