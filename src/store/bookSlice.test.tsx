import bookReducer, { changeShelf, getbooks, getBook, updateBookShelf } from "./booksSlice"
import { mockedBooks } from "./books";
import { getStoreWithState, RootState } from "./store";
import { Book } from "../Interfaces/Book";

describe("book reducer", () => {
    it("should return the initial state when passed an empty action", () => {
        const initialState = undefined;
        const action = { type: "" };
        const result = bookReducer(initialState, action);
        expect(result).toEqual({ books: [], currentBook: {} });
    });
    it("should convert the books received to an array", () => {
        const initialState = undefined;
        const action = changeShelf(mockedBooks);
        const result = bookReducer(initialState, action);
        expect(result.books.length).toEqual(mockedBooks.length);
        mockedBooks.forEach((book) => {
            expect(result.books.find(b => b.id === book.id)).toEqual(book);
        });
    });
    it("passing books at different times should not be allowed and all books are not recieved", () => {
        const initialState = undefined;
        const action = changeShelf(mockedBooks.slice(0, 2));
        let result = bookReducer(initialState, action);
        const secAction = changeShelf(mockedBooks.slice(2, 4));
        result = bookReducer(result, secAction);
        expect(result.books.length).toEqual(2);
    });
});
const state: RootState = {
    books: { books: [], currentBook: {} as Book, error:undefined }
}

describe("thunk api without reducers", () => {
    it("checking if getBooks succeed and recived array of books", async () => {
        const dispatch = jest.fn();
        const thunk = getbooks();
        await thunk(dispatch, () => state, undefined);
        expect(dispatch.mock.lastCall[0].type).toEqual('books/getBooks/fulfilled');
    });

    it("checking if getBook should fail with wrong Id", async () => {
        const id = "wrongID";
        const dispatch = jest.fn();
        const thunk = getBook({id});
        await thunk(dispatch, () => state, undefined);
        const {lastCall} = dispatch.mock;
        expect(lastCall[0].type).toEqual('books/getBook/rejected');
    });

    it("checking if getBook should succeed with correct Id", async () => {
        const id = "nggnmAEACAAJ";
        const dispatch = jest.fn();
        const thunk = getBook({id});
        await thunk(dispatch, () => state, undefined);
        const {lastCall} = dispatch.mock;
        expect(lastCall[0].type).toEqual('books/getBook/fulfilled');
        expect(lastCall[0].payload.id).toEqual(id);
    });

    it("checking if updateBookshelf should succeed with correct args", async () => {
        const body = {id:"nggnmAEACAAJ", shelf:"read"};
        const dispatch = jest.fn();
        const thunk = updateBookShelf(body);
        await thunk(dispatch, () => state, undefined);
        const {lastCall,calls} = dispatch.mock;
        // console.log(lastCall[0].payload.read)
        expect(lastCall[0].type).toEqual('books/updateBookShelf/fulfilled');
        expect(lastCall[0].payload.read).toContain(body.id);
    });

    it("checking if updateBookshelf should fail with empty shelf", async () => {
        const body = {id:"nggnmAEACAAJ", shelf:""};
        const dispatch = jest.fn();
        const thunk = updateBookShelf(body);
        await thunk(dispatch, () => state, undefined);
        const {lastCall} = dispatch.mock;
        expect(lastCall[0].type).toEqual('books/updateBookShelf/fulfilled');
        expect(lastCall[0].payload.error).toBeDefined();
        expect(lastCall[0].payload.error).toEqual('Please provide a shelf in the request body');
    });

    it("checking if updateBookshelf should fail with empty id", async () => {
        const body = {id:"", shelf:"read"};
        const dispatch = jest.fn();
        const thunk = updateBookShelf(body);
        await thunk(dispatch, () => state, undefined);
        const {lastCall} = dispatch.mock;
        // console.log(lastCall[0])
        expect(lastCall[0].type).toEqual('books/updateBookShelf/rejected');
        expect(lastCall[0].error).toBeDefined();
        expect(lastCall[0].error.message).toContain('invalid json response body');
    });
});

// import configureStore from "redux-mock-store";
// import thunk from "redux-thunk";
// const mockStore = configureStore([thunk]);

// describe("checkoutCart w/mock redux store", () => {
   
//   it("checking if getBooks succeed and recived array of books", async () => {
//     const store = mockStore({
//         books: { books: [], currentBook: {} as Book }
//     });
//     await store.dispatch(getbooks());
//     const actions = store.getActions();
//     console.log(actions)
//     expect(actions[0].type).toEqual('books/getBooks/pending');
//     expect(actions[1].type).toEqual('books/getBooks/fulfilled');
//   });
// });

 
describe("testing test thunk with extraReducers", () => {
   
    it("checking if getBooks succeed and recived array of books", async () => {
        const store = getStoreWithState(state);
        await store.dispatch(getbooks());
        const actions = store.getState();
        // console.log(actions)
         expect(actions.books.books).toBeDefined();
         expect(actions.books.error).toBeUndefined();
      });

      it("checking if getBook with id succeed and recieved data", async () => {
        const id = "nggnmAEACAAJ";
        const store = getStoreWithState(state);
        await store.dispatch(getBook({id}));
        const actions = store.getState();
         expect(actions.books.currentBook).toBeDefined();
         expect(actions.books.currentBook.id).toEqual(id);
         expect(actions.books.error).toBeUndefined();
      });

      it("checking if getBook with id faild with wrong id", async () => {
        const id = "wrongID";
        const store = getStoreWithState(state);
        await store.dispatch(getBook({id}));
        const actions = store.getState();
        console.log(actions)
         expect(actions.books.currentBook).toEqual({});
         expect(actions.books.error).toBeDefined();
         expect(actions.books.error.message).toContain('invalid json response body');
      });
      
});
 
