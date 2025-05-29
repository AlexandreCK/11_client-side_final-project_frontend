import { useState, useEffect } from 'react';

export function useBookForm({
    initialData,
    onAddBook,
    onUpdateBook,
    isUpdate,
}) {
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        year: new Date().getFullYear().toString(),
        status: 'Pending',
    });

    useEffect(() => {
        if (isUpdate && initialData) {
            setFormData({
                title: initialData.title || '',
                author: initialData.author || '',
                year: initialData.year || '',
                status: initialData.status || 'Pending',
            });
        } else {
            resetForm();
        }
    }, [isUpdate, initialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.title.trim() || !formData.author.trim()) {
            return;
        }

        const bookData = {
            title: formData.title.trim(),
            author: formData.author.trim(),
            year: formData.year.trim(),
            status: formData.status,
        };

        if (isUpdate && initialData) {
            onUpdateBook({ ...initialData, ...bookData });
        } else {
            onAddBook(bookData);
        }

        resetForm();
    };

    const resetForm = () => {
        setFormData({
            title: '',
            author: '',
            year: new Date().getFullYear().toString(),
            status: 'Pending',
        });
    };

    return {
        formData,
        handleChange,
        handleSubmit,
        resetForm,
    };
}
