import express from 'express';
import cors from 'cors';
import mysql from 'mysql2';
import dotenv from 'dotenv';

const app= express();
dotenv.config();

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:' + process.env.FRONTEND_PORT  // tik šito frontend'o leidimas
}));

// connecting Database
const connection = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

app.get('/',(req,res)=>{
    res.send("Hi");
})

app.get("/books", async(req, res) => {
    const { in_stock, date_from, date_until, sort_order } = req.query;

    let query = `
        SELECT
            b.*,
            GROUP_CONCAT(g.name ORDER BY g.name SEPARATOR ', ') AS genres
        FROM books b
             LEFT JOIN book_genres bg ON b.id = bg.book_id
             LEFT JOIN genres g ON bg.genre_id = g.id
    `;

    const conditions = [];
    const values = [];

    if (in_stock === 'true') {
        conditions.push("b.amount_of_copies > 0");
    }

    if (date_from) {
        conditions.push("b.publish_date >= ?");
        values.push(date_from);
    }

    if (date_until) {
        conditions.push("b.publish_date <= ?");
        values.push(date_until);
    }

    if (conditions.length > 0) {
        query += ` WHERE ` + conditions.join(" AND ");
    }

    query += " GROUP BY b.id";

    if (sort_order === 'asc') {
        query += " ORDER BY b.rating ASC";
    } else if (sort_order === 'desc') {
        query += " ORDER BY b.rating DESC";
    }

    try {
        const data = await connection.promise().query(query, values);
        res.status(202).json({
            books: data[0],
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});

app.get("/books/:id", async(req, res) => {
    try {
        const {id} = req.params
        const data = await connection.promise().query(
            `SELECT
                 b.*,
                 GROUP_CONCAT(g.name ORDER BY g.name SEPARATOR ', ') AS genres
             FROM books b
                  LEFT JOIN book_genres bg ON b.id = bg.book_id
                  LEFT JOIN genres g ON bg.genre_id = g.id
             WHERE b.id = ?
             GROUP BY b.id;
            `,[id]
        );
        res.status(200).json({
            book: data[0][0],
        });
    } catch (err) {
        res.status(500).json({
            message: err,
        });
    }
});


app.listen(5000,()=>{
    console.log("Server listening in http://localhost:5000")
})