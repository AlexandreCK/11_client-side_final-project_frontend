// import styles from './ItemsList.module.css';
import { ItemCard } from '../ItemCard/ItemCard';

export const ItemsList = ({
    itemsList,
    deleteBook,
    setBookToUpdate,
    isLoading,
}) => {
    return (
        <>
            {isLoading && <p>Loading Books...</p>}
            {!isLoading && (
                <ul>
                    {itemsList.map((item) => (
                        <li key={item.id}>
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
