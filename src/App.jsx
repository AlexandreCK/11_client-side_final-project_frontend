import { Header } from './components/Header/Header';
import { ListContainer } from './components/ListContainer/ListContainer';
import { useBooks } from './hooks/useBooks';
import { ItemsList } from './components/ItemsList/ItemsList';

function App() {
    const { books } = useBooks();

    return (
        <>
            <Header />
            <ListContainer>
                <ItemsList itemsList={books} />
            </ListContainer>
        </>
    );
}

export default App;
