import styles from './BookForm.module.css';
import { useBookForm } from '../../hooks/useBookForm';

export const BookForm = ({
    onAddBook,
    onUpdateBook,
    isUpdate,
    book,
    isSaving,
}) => {
    const { formData, handleChange, handleSubmit } = useBookForm({
        initialData: book,
        onAddBook,
        onUpdateBook,
        isUpdate
    });

    return (
        <form className={styles['book-form']} onSubmit={handleSubmit}>
            <h2 className={styles['book-form__title']}>
                {isUpdate ? 'Update Book' : 'Add New Book'}
            </h2>
            
            <div className={styles['form-group']}>
                <label htmlFor="title">Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter book title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                />
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="author">Author</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    placeholder="Enter author name"
                    required
                    value={formData.author}
                    onChange={handleChange}
                />
            </div>

            <div className={styles['form-row']}>
                <div className={styles['form-group']}>
                    <label htmlFor="year">Publication Year</label>
                    <input
                        type="number"
                        id="year"
                        name="year"
                        placeholder="Enter year"
                        required
                        value={formData.year}
                        onChange={handleChange}
                    />
                </div>

                <div className={styles['form-group']}>
                    <label htmlFor="status">Reading Status</label>
                    <select
                        id="status"
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                    >
                        <option value="Pending">Pending</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Read">Read</option>
                    </select>
                </div>
            </div>

            <button
                type="submit"
                className={styles['submit-btn']}
                disabled={isSaving}
            >
                {isSaving ? 'Saving...' : isUpdate ? 'Update Book' : 'Add Book'}
            </button>
        </form>
    );
};
