import React from "react";
import { BrowserRouter, Link, Routes, Route } from "react-router-dom"
import Home from "./Home";
import "bootstrap/dist/css/bootstrap.min.css"
import Developer from "./Developer";
export default function Navbar() {
    return (
        <>
            <BrowserRouter>
                <nav className="d-flex navbar navbar-expand-lg navbar-light bg-light">
                    <h6 className="navbar-brand">GeoLocation</h6>
                    <ul className="navbar-nav d-flex">
                        <li className="nav-item">
                            <Link className="nav-link" to={"/"}>Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={"/Developer"}>Developer</Link>
                        </li>
                    </ul>

                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Developer" element={<Developer />} />

                </Routes>
            </BrowserRouter>


        </>
    )
}