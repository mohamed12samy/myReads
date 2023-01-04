import {booksToShelfs, handleChangeOnSelf} from './bookUtility'
import {mockedBooks} from '../../redux/books'
import { Book } from '../../Interfaces/Book';
import {RootState, store} from '../../redux/store'
import bookReducer, { changeShelf, setBooksStore } from "../../redux/booksSlice"

describe("book utility test", ()=>{
    it("books to shelves should divide books array and distribute it to shlves",()=>{
    const { currentlyReading, wantToRead, read, noShelf } = booksToShelfs(mockedBooks);
    expect(currentlyReading).toHaveLength(1);
    expect(read).toHaveLength(1);
    expect(wantToRead).toHaveLength(2);
    expect(noShelf).toHaveLength(1);
    })

    it("books to shekfs should divide books array and distribute it to shlves",()=>{
        const body = {id:"nggnmAEACAAJ", shelf:"read"};
        store.dispatch(setBooksStore(mockedBooks));
        handleChangeOnSelf(body);
        const {books} = store.getState().books;
        console.log(books)
        expect(books.find(b=>b.id === body.id).shelf).toEqual(body.shelf);
    })
})