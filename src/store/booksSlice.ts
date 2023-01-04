import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Api } from "../Config/ApiConfig";
import { Book } from "../Interfaces/Book";

export const getbooks = createAsyncThunk<Book[], void>("books/getBooks", async () => {
    const {baseUrl, headers} = Api();

    const books = await fetch(`${baseUrl}/books`, { headers })
        .then((res) => res.json())
        .then((data) => data.books);
        return books
});

export const updateBookShelf = createAsyncThunk<any, any>("books/updateBookShelf", async ({id,shelf}) => {
    const {baseUrl, headers} = Api();
console.log(id, shelf)
    const books = await  fetch(`${baseUrl}/books/${id}`, {
        method: "PUT",
        headers: {
          ...headers,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ shelf }),
      }).then((res) => res.json());
        return books
});

export const getBook = createAsyncThunk<Book, any>("books/getBook", async ({id}) => {
    const {baseUrl, headers} = Api();

    const book = await   fetch(`${baseUrl}/books/${id}`, { headers })
    .then((res) => res.json())
    .then((data) => data.book);
        return book
});

const bookSlice = createSlice({
    name: "books",
    initialState: {
        books:[] as Book[],
        currentBook:{} as Book,
        error:undefined
    },
    reducers: {
        changeShelf: (state, action/*:PayloadAction<Book[]>*/) => {
            // state.books = [...state.books,...action.payload] as Book[]
            state.books = action.payload 
            //return action.payload;
        },
        setBooksStore:(state, action:PayloadAction<Book[]>)=>{
            state.books = action.payload
        },
        resetError:(state)=>{
            state.error = undefined;
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(getbooks.pending,(state, action)=>{
            console.log("Fetching Data...");
        })
        builder.addCase(getbooks.fulfilled,(state, action)=>{
            // console.log(state);
            state.books = action.payload
            //return action.payload;
        })
        builder.addCase(getbooks.rejected,(state, action)=>{
            // console.log(action);
            state.error = action.payload
            //return action.payload;
        })
        builder.addCase(updateBookShelf.pending,(state, action)=>{
            console.log("Updating Book shelf...");
        })
        builder.addCase(updateBookShelf.fulfilled,(state, action)=>{
            //state.books = []
            // console.log(action.payload)
        })
        builder.addCase(updateBookShelf.rejected,(state, action)=>{
            //state.books = []
            // console.log(action.payload, '\n', action.error)
            state.error = action.error
        })
        builder.addCase(getBook.pending,(state, action)=>{
            console.log("fetching Book shelf...");
        })
        builder.addCase(getBook.fulfilled,(state, action:PayloadAction<Book>)=>{
            state.currentBook = action.payload as Book
            // return action.payload;
        })
        builder.addCase(getBook.rejected,(state, action)=>{
            console.log(action)
            state.error = action.error
            // return action.payload;
        })
    }
})

export const { changeShelf, resetError, setBooksStore } = bookSlice.actions;
export default bookSlice.reducer;