// import styles from './ItemCard.module.css';

export const ItemCard = ({ item, deleteBook }) => {
    // const titleStyles = {
    //     read: styles['itemcard__title--done'],
    //     'in progress': styles['itemcard__title--in-progress'],
    //     pending: styles['itemcard__title--pending'],
    // };

    // const statusStyles = {
    //     read: styles['itemcard__status--done'],
    //     'in progress': styles['itemcard__status--in-progress'],
    //     pending: styles['itemcard__status--pending'],
    // };

    return (
        <article>
            <h4>{item.title}</h4>
            <p>
                <strong>Author:</strong> {item.author}
                <br />
                <strong>Year:</strong> {item.year}
            </p>
            <span>{item.status}</span>
            <button onClick={() => deleteBook(item.id)}>Delete</button>
        </article>
    );
};
