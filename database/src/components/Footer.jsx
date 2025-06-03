import React from 'react';
import './main.css';


export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">

                <div className="footer-section">
                    <p>&copy; {new Date().getFullYear()} Book Library. All rights reserved.</p>
                </div>

                <div className="footer-section social-icons">
                    <a href='#'><i className="bi bi-facebook"></i></a>
                    <a href='#'><i className="bi bi-instagram"></i></a>
                </div>

                <div className="footer-section">
                    <p><strong>Place:</strong> Gedimino pr. 10, Vilnius</p>
                    <p><strong>Working hours:</strong></p>
                    <p>I–V: 09:00 – 18:00</p>
                    <p>VI: 10:00 – 15:00</p>
                    <p>VII: Closed</p>
                </div>

            </div>
        </footer>
    );
}
