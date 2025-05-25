import { useState } from 'react';

export function useUIState() {
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [book, setBook] = useState(null);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);

        if (isFormVisible) {
            setIsUpdate(false);
            setBook(null);
        }
    };

    const setBookToUpdate = (bookData) => {
        setIsFormVisible(true);
        setIsUpdate(true);
        setBook(bookData);
    };

    const closeForm = () => {
        setIsFormVisible(false);
        setIsUpdate(false);
        setBook(null);
    };

    return {
        isFormVisible,
        isUpdate,
        book,
        toggleFormVisibility,
        setBookToUpdate,
        closeForm
    };
}
