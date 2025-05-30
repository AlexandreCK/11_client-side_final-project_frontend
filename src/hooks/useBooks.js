import { useEffect, useState } from 'react';

export function useBooks() {
    const [books, setBooks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        fetch(import.meta.env.VITE_BOOK_API_LINK)
            .then((res) => res.json())
            .then((data) => {
                setBooks(data);
                data ? setIsLoading(false) : setIsLoading(true);
            })
            .catch((err) => console.error('Failed to fetch books:', err));
    }, []);

    const addBook = async (newBook, onAddComplete) => {
        setIsSaving(true);
        try {
            const response = await fetch(import.meta.env.VITE_BOOK_API_LINK, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) {
                throw new Error('Failed to add book');
            }

            const addedBook = await response.json();
            setBooks([...books, addedBook]);
            alert('Book added successfully!');
            if (onAddComplete) {
                onAddComplete();
            }
        } catch (error) {
            console.error('Error adding book:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const deleteBook = async (id) => {
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BOOK_API_LINK}/${id}`,
                {
                    method: 'DELETE',
                },
            );

            if (!response.ok) {
                throw new Error('Failed to delete book');
            }

            setBooks(books.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const updateBook = async (updatedBook, onUpdateComplete) => {
        setIsSaving(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_BOOK_API_LINK}/${updatedBook.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedBook),
                },
            );

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            const updatedBookData = await response.json();

            setBooks(
                books.map((book) =>
                    book.id === updatedBook.id ? updatedBookData : book,
                ),
            );
            alert('Book updated successfully!');
            if (onUpdateComplete) {
                onUpdateComplete();
            }
        } catch (error) {
            console.error('Error updating book:', error);
        } finally {
            setIsSaving(false);
        }
    };

    return {
        deleteBook,
        books,
        addBook,
        updateBook,
        isLoading,
        isSaving,
    };
}
