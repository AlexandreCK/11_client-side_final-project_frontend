import { Header } from './components/Header/Header';
import { ListContainer } from './components/ListContainer/ListContainer';
import { useBooks } from './hooks/useBooks';
import { ItemsList } from './components/ItemsList/ItemsList';
import { BookForm } from './components/BookForm/BookForm';
import { useState } from 'react';
import styles from './App.module.css';

function App() {
    const { books, addBook, deleteBook, updateBook, isLoading, isSaving } = useBooks();
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [book, setBook] = useState(null);

    const toggleFormVisibility = () => {
        setIsFormVisible(!isFormVisible);
        setIsUpdate(false);
        setBook(null);
    };

    const setBookToUpdate = (book) => {
        setIsFormVisible(true);
        setIsUpdate(true);
        setBook(book);
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
                <div>
                    <BookForm
                        onAddBook={addBook}
                        onUpdateBook={(updatedBook) => updateBook(updatedBook, toggleFormVisibility)}
                        isUpdate={isUpdate}
                        book={book}
                        toggleFormVisibility={toggleFormVisibility}
                        isSaving={isSaving}
                    />
                </div>
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
