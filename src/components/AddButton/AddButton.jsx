import styles from './AddButton.module.css';

export const AddButton = ({ isFormVisible, onClick }) => (
    <button
        className={`${styles['add-button']} ${isFormVisible ? styles['add-button--cancel'] : ''}`}
        onClick={onClick}
    >
        {isFormVisible ? 'Cancel' : 'Add New Book'}
    </button>
);
