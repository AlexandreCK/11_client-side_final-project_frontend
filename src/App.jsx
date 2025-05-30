import { Header } from './components/Header/Header';
import { ListContainer } from './components/ListContainer/ListContainer';
import { useBooks } from './hooks/useBooks';
import { useUIState } from './hooks/useUIState';
import { ItemsList } from './components/ItemsList/ItemsList';
import { BookForm } from './components/BookForm/BookForm';
import { AddButton } from './components/AddButton/AddButton';
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
                <AddButton
                    isFormVisible={isFormVisible}
                    onClick={toggleFormVisibility}
                />
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
