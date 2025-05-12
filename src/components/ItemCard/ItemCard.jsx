import styles from './ItemCard.module.css';

export const ItemCard = ({ item }) => {
    const titleStyles = {
        read: styles['itemcard__title--done'],
        'in progress': styles['itemcard__title--in-progress'],
        pending: styles['itemcard__title--pending'],
    };

    const statusStyles = {
        read: styles['itemcard__status--done'],
        'in progress': styles['itemcard__status--in-progress'],
        pending: styles['itemcard__status--pending'],
    };

    const status = item.status.toLowerCase();

    return (
        <article className={styles.itemcard}>
            <h4
                className={`${styles.itemcard__title} ${titleStyles[status] || ''}`}
            >
                {item.title}
            </h4>
            <p className={styles.itemcard__description}>
                <strong>Author:</strong> {item.author}
                <br />
                <strong>Year:</strong> {item.year}
            </p>
            <span
                className={`${styles.itemcard__status} ${statusStyles[status] || ''}`}
            >
                {item.status}
            </span>
        </article>
    );
};
