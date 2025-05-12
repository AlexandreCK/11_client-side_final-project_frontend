import { Header } from './components/Header/Header';
import { ListContainer } from './components/ListContainer/ListContainer';
import { useBooks } from './hooks/useBooks';
import { ItemsList } from './components/ItemsList/ItemsList';
import { BookForm } from './components/BookForm/BookForm';

function App() {
    const { books, addBook } = useBooks();

    return (
        <>
            <Header />
            <BookForm onAddBook={addBook} />
            <ListContainer>
                <ItemsList itemsList={books} />
            </ListContainer>
        </>
    );
}

export default App;
