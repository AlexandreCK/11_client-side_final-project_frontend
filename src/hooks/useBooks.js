import { useEffect, useState } from 'react';

export function useBooks() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/book')
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error('Failed to fetch books:', err));
    }, []);

    const addBook = async (newBook) => {
        try {
            const response = await fetch('http://localhost:3000/book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    title: newBook.title,
                    author: newBook.author,
                    year: newBook.year,
                    status: newBook.status,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to add book');
            }

            const addedBook = await response.json();
            setBooks([...books, addedBook]);
        } catch (error) {
            console.error('Error adding book:', error);
        }
    };

    const deleteBook = async (id) => {
        try {
            const response = await fetch(`http://localhost:3000/book/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    return {
        deleteBook,
        books,
        addBook,
    };
    };
