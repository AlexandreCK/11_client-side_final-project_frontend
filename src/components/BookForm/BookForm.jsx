import styles from './BookForm.module.css';

export const BookForm = ({
    onAddBook,
    onUpdateBook,
    isUpdate,
    book,
    toggleFormVisibility,
}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.elements.title.value.trim();
        const author = form.elements.author.value.trim();
        const year = form.elements.year.value.trim();
        const status = form.elements.status.value;

        if (!title || !author) return;

        const bookData = {
            title,
            author,
            year,
            status,
        };

        if (isUpdate && book) {
            onUpdateBook({ ...book, ...bookData });
            toggleFormVisibility();
        } else {
            onAddBook(bookData);
        }

        form.reset();
    };

    return (
        <form className={styles['task-form']} onSubmit={handleSubmit}>
            <div className={styles['form-group']}>
                <label htmlFor="title">Book Title</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Enter book title"
                    required
                    defaultValue={book ? book.title : ''}
                />
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="author">Author</label>
                <textarea
                    id="author"
                    name="author"
                    placeholder="Enter the book's author"
                    required
                    defaultValue={book ? book.author : ''}
                />
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="year">Year</label>
                <input
                    type="number"
                    id="year"
                    name="year"
                    placeholder="Enter year"
                    required
                    defaultValue={book ? book.year : ''}
                />
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="status">Status</label>
                <select
                    id="status"
                    name="status"
                    defaultValue={book ? book.status : 'Pending'}
                >
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Read">Read</option>
                </select>
            </div>

            <button type="submit" className={styles['submit-btn']}>
                {isUpdate ? 'Update Book' : 'Add Book'}
            </button>
        </form>
    );
};
