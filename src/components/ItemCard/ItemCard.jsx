import styles from './ItemCard.module.css';

export const ItemCard = ({ item, deleteBook, setBookToUpdate }) => {
    const statusStyles = {
        Read: styles['itemcard__status--read'],
        'In Progress': styles['itemcard__status--in-progress'],
        Pending: styles['itemcard__status--pending'],
    };

    function deleteAlert() {
        if (confirm('Are you sure you want to delete this book?') == true) {
            deleteBook(item.id);
        }
    }

    return (
        <article className={styles['itemcard']}>
            <div className={styles['itemcard__header']}>
                <h4 className={styles['itemcard__title']}>{item.title}</h4>
                <p className={styles['itemcard__author']}>{item.author}</p>
            </div>
            <span className={styles['itemcard__year']}>{item.year}</span>
            <div className={styles['itemcard__status-container']}>
                <span className={`${styles['itemcard__status']} ${statusStyles[item.status]}`}>
                    {item.status}
                </span>
            </div>
            <div className={styles['itemcard__actions']}>
                <button 
                    className={`${styles['itemcard__button']} ${styles['itemcard__button--edit']}`}
                    onClick={() => setBookToUpdate(item)}
                >
                    Edit
                </button>
                <button 
                    className={`${styles['itemcard__button']} ${styles['itemcard__button--delete']}`}
                    onClick={deleteAlert}
                >
                    Delete
                </button>
            </div>
        </article>
    );
};
