import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home.js";
import Header from "./components/Header.js";
import Footer from "./components/Footer.js";

const App = () => {
    return (
        <div>
            <Header />
            <Routes>
                <Route exact path="/" element={<Home />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default App;