import styles from './BookForm.module.css';

export const BookForm = ({ onAddBook }) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const title = form.elements.title.value.trim();
        const author = form.elements.author.value.trim();
        const year = form.elements.year.value.trim();
        const status = form.elements.status.value;

        if (!title || !author) return;

        onAddBook({
            title,
            author,
            year,
            status,
        });

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
                />
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="author">Author</label>
                <textarea
                    id="author"
                    name="author"
                    placeholder="Enter the book's author"
                    required
                />
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="year">Year</label>
                <textarea
                    id="year"
                    name="year"
                    placeholder="Enter year"
                    required
                />
            </div>

            <div className={styles['form-group']}>
                <label htmlFor="status">Status</label>
                <select id="status" name="status" defaultValue="Pending">
                    <option value="Pending">Pending</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Read">Read</option>
                </select>
            </div>

            <button type="submit" className={styles['submit-btn']}>
                Add Book
            </button>
        </form>
    );
};
