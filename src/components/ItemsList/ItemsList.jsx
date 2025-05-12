import styles from './ItemsList.module.css';
import { ItemCard } from '../ItemCard/ItemCard';

export const ItemsList = ({ itemsList }) => {
    return (
        <ul className={styles['items-list']}>
            {itemsList.map((item) => (
                <li key={item.id} className={styles['items-list__item']}>
                    <ItemCard item={item} />
                </li>
            ))}
        </ul>
    );
};
