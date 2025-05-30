import styles from './HeaderContainer.module.css';

export const HeaderContainer = ({ children }) => {
    return <div className={styles['header-container']}>{children}</div>;
};
