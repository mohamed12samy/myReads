import { useDispatch } from "react-redux";
import BookCard from "../../components/BookCard/BookCard";
import { Book } from "../../Interfaces/Book";
import { changeShelf, updateBookShelf } from "../../redux/booksSlice";
import { AppDispatch, store } from "../../redux/store";



// const dispatch = useDispatch<AppDispatch>();

export const handleChangeOnSelf = (body: { id: string; shelf: string; }) => {
    const books = store.getState().books.books;
    console.log(books)
    let updatedBooks = [];
    books.map(book => {
        if (book.id === body.id)
            updatedBooks = [...updatedBooks, { ...book, shelf: body.shelf }];
        else {
            updatedBooks = [...updatedBooks, book]
        }

    });
    store.dispatch(changeShelf(updatedBooks))
    store.dispatch(updateBookShelf(body))
}


export const booksToShelfs = (books: Book[]): { currentlyReading: Book[], wantToRead: Book[], read: Book[], noShelf: Book[] } => {
    const currentlyReading = Array.isArray(books) ? books.filter(
        (book) => book.shelf === "currentlyReading"
    ) : [];
    const wantToRead = Array.isArray(books) ? books.filter((book) => book.shelf === "wantToRead") : [];
    const read = Array.isArray(books) ? books.filter((book) => book.shelf === "read") : [];
    const noShelf = Array.isArray(books) ? books.filter((book) => book.shelf === "none" || book.shelf === undefined) : [];
    return { currentlyReading, wantToRead, read, noShelf };
};

