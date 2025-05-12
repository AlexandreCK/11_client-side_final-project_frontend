import { useEffect, useState } from 'react';

export function useBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/book')
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error('Failed to fetch books:', err));
    }, []);

    const addBook = (newBook) => {
        setBooks([...books, newBook]);
    };

    return {
        books,
        addBook,
    };
}
