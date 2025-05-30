import { Header } from './components/Header/Header';
import { ListContainer } from './components/ListContainer/ListContainer';
import { useBooks } from './hooks/useBooks';
import { useUIState } from './hooks/useUIState';
import { ItemsList } from './components/ItemsList/ItemsList';
import { BookForm } from './components/BookForm/BookForm';
import styles from './App.module.css';

function App() {
    const { books, addBook, deleteBook, updateBook, isLoading, isSaving } =
        useBooks();
    const {
        isFormVisible,
        isUpdate,
        book,
        toggleFormVisibility,
        setBookToUpdate,
        closeForm,
    } = useUIState();

    const handleAddBook = (newBook) => {
        addBook(newBook, closeForm);
    };

    const handleUpdateBook = (updatedBook) => {
        updateBook(updatedBook, closeForm);
    };

    return (
        <div className={styles['container']}>
            <div className={styles['header-container']}>
                <Header />
                <button
                    className={`${styles['add-button']} ${isFormVisible ? styles['add-button--cancel'] : ''}`}
                    onClick={toggleFormVisibility}
                >
                    {isFormVisible ? 'Cancel' : 'Add New Book'}
                </button>
            </div>
            {isFormVisible && (
                <BookForm
                    onAddBook={handleAddBook}
                    onUpdateBook={handleUpdateBook}
                    isUpdate={isUpdate}
                    book={book}
                    isSaving={isSaving}
                />
            )}
            <ListContainer>
                <ItemsList
                    itemsList={books}
                    deleteBook={deleteBook}
                    setBookToUpdate={setBookToUpdate}
                    isLoading={isLoading}
                />
            </ListContainer>
        </div>
    );
}

export default App;
