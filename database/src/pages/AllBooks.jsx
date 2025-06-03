import React, { useEffect, useState } from 'react';
import './page.css';
import {NavLink} from "react-router-dom";
import { useNavigate, useLocation } from 'react-router-dom';

const AllBooks = () => {
    const [books, setBooks] = useState([]);
    const [selectedDateFrom, setSelectedDateFrom] = useState('');
    const [selectedDateUntil, setSelectedDateUntil] = useState('');
    const [inStock, setInStock] = useState(false);
    const [sortOrder, setSortOrder] = useState('');

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const params = new URLSearchParams(location.search);

        // taking filtering values from link, to prevent filtering reset on page refresh
        setInStock(params.get('in_stock') === 'true');
        setSelectedDateFrom(params.get('date_from') || '');
        setSelectedDateUntil(params.get('date_until') || '');
        setSortOrder(params.get('sort_order') || '');
    }, [location.search]);

    useEffect(() => {
        const params = new URLSearchParams();

        // Fetch data and update the URL when filters change
        if (inStock) params.set('in_stock', 'false');
        if (selectedDateFrom) params.set('date_from', selectedDateFrom);
        if (selectedDateUntil) params.set('date_until', selectedDateUntil);
        if (sortOrder) params.set('sort_order', sortOrder);

        fetch(`http://localhost:5000/books?${params.toString()}`)
            .then(res => res.json())
            .then(data => setBooks(data.books))
            .catch(console.error);

        navigate(`/all-books?${params.toString()}`, { replace: true });
    }, [inStock, selectedDateFrom, selectedDateUntil, sortOrder, navigate]);

    const toggleInStock = (e) => {
        setInStock(e.target.checked);
    };

    const toggleDateFrom = (e) => {
        setSelectedDateFrom(e.target.value);
    };

    const toggleDateUntil = (e) => {
        setSelectedDateUntil(e.target.value);
    };

    const handleSortChange = (e) => {
        setSortOrder(e.target.value);
    };

    return (
        <div className="book-list">

            <label>Sort by rating: </label>
            <select value={sortOrder} onChange={handleSortChange}>
                <option value="" >Choose</option>
                <option value="desc">High to Low</option>
                <option value="asc">Low to High</option>
            </select>

            <div className="filter-container">
                <p>Have in stock <input checked={inStock} type="checkbox" onChange={toggleInStock} /></p>
                <p>Date from <input type="date" onChange={toggleDateFrom} /></p>
                <p>Date until <input type="date" onChange={toggleDateUntil} /></p>
            </div>

            <h1>All Books</h1>
            {books.map((book) => (
                <div key={book.id} className="book-card">
                    <img src={book.image_url} alt={book.title} />
                    <div className="book-info">
                        <h2>{book.title}</h2>
                        <p>{book.author}</p>
                        <p>{book.publish_date.substring(0, 10)}</p>
                        <p>{book.genres}</p>
                        <p>{book.description.substring(0, 200) + '...'}</p>
                        <NavLink to={`/book/${book.id}`}><button className="read-more-btn">Read More</button></NavLink>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllBooks;
