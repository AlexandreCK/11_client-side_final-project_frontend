import styles from './ListContainer.module.css';

export const ListContainer = ({ children }) => {
    return <section className={styles['list-container']}>{children}</section>;
};
