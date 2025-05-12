// import styles from './ItemsList.module.css';
import { ItemCard } from '../ItemCard/ItemCard';

export const ItemsList = ({ itemsList, deleteBook }) => {
    return (
        <ul>
            {itemsList.map((item) => (
                <li key={item.id}>
                    <ItemCard item={item} deleteBook={deleteBook} />
                </li>
            ))}
        </ul>
    );
};
