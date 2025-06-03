import React from 'react'
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Book from "./pages/Book.jsx";
import AllBooks from "./pages/AllBooks.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/book/:book_id" element={<Book />} />
                <Route path="/all-books" element={<AllBooks />} />
            </Routes>
            <Footer />
        </div>
    )
}
export default App
