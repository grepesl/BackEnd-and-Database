import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import './page.css';

const Book = () => {
    const { book_id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:5000/books/${book_id}`)
            .then((res) => res.json())
            .then((data) => {
                setBook(data.book);
            })
            .catch((err) => {
                console.error('Fetch error:', err);
            });
    }, [book_id]);

    if (!book) return <div>Loading...</div>;


    return (

        <div className="book-container">
            <div className="book-header">
                <img src={book.image_url} alt={book.title} />
                <div className="book-details">
                    <h1>{book.title}</h1>
                    <p><strong>Author:</strong> {book.author}</p>
                    <p><strong>Published:</strong> {book.publish_date.substring(0, 10)}</p>
                    <p><strong>Pages:</strong> {book.pages}</p>
                    <p><strong>Rating:</strong> {book.rating} ☆</p>
                    <p><strong>Genres:</strong> {book.genres}</p>
                </div>
            </div>
            <p style={{ marginTop: '20px' }}>{book.description}</p>
            <NavLink to="/all-books">
                <button className="back-button">BACK</button>
            </NavLink>
        </div>
    );
};

export default Book;
