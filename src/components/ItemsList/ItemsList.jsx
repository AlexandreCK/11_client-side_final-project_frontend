import styles from './ItemsList.module.css';
import { ItemCard } from '../ItemCard/ItemCard';

export const ItemsList = ({
    itemsList,
    deleteBook,
    setBookToUpdate,
    isLoading,
}) => {
    return (
        <>
            {isLoading && (
                <p className={styles['items-list__loading']}>
                    Loading Books...
                </p>
            )}
            {!isLoading && (
                <ul className={styles['items-list']}>
                    {itemsList.map((item) => (
                        <li
                            key={item.id}
                            className={styles['items-list__item']}
                        >
                            <ItemCard
                                item={item}
                                deleteBook={deleteBook}
                                setBookToUpdate={setBookToUpdate}
                            />
                        </li>
                    ))}
                </ul>
            )}
        </>
    );
};
