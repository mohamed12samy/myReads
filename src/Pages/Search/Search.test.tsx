import { fireEvent, render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { BrowserRouter as Router } from 'react-router-dom'
import BookCard from "../../components/BookCard/BookCard"
import { mockedBooks } from "../../store/books"
import { store, getStoreWithState } from "../../store/store"
import React from 'react'
import { Search } from "./Search"
import userEvent from "@testing-library/user-event";
import { Book } from "../../Interfaces/Book"
import { changeShelf } from "../../store/booksSlice"


describe("test book search", () => {
    it("test component contains only text input and h3 with no data found", () => {
        render(<Provider store={store}>
            <Router>
                <Search></Search>
            </Router>
        </Provider>)

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        const h3 = screen.getByRole('heading');
        expect(h3).toBeInTheDocument();
        expect(h3).toHaveTextContent("No data is found");
    })

    it("test if useState to set the search result is called times equal to the typed characters", async () => {

        const mockStore = getStoreWithState({ books: { books: mockedBooks, currentBook: {} as Book, error: undefined } });

        const setState = jest.fn();
        const useStateSpy: any = (useState: any) => [useState, setState];
        jest.spyOn(React, 'useState').mockImplementation(useStateSpy);

        render(<Provider store={mockStore}>
            <Router>
                <Search></Search>
            </Router>
        </Provider>)

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        const user = userEvent.setup();
        await user.type(input, "linux");
        expect(setState).toHaveBeenCalledTimes(5);
        expect(setState).toHaveBeenLastCalledWith([mockedBooks[0]]);
    })


    
    it("test passing two empty spaces", async () => {

        const mockStore = getStoreWithState({ books: { books: mockedBooks, currentBook: {} as Book, error: undefined } });

        const setState = jest.fn();
        const useStateSpy: any = (useState: any) => [useState, setState];
        jest.spyOn(React, 'useState').mockImplementation(useStateSpy);

        render(<Provider store={mockStore}>
            <Router>
                <Search></Search>
            </Router>
        </Provider>)

        const input = screen.getByRole('textbox');
        expect(input).toBeInTheDocument();
        const user = userEvent.setup();
        await user.type(input, "  ");
        expect(setState).toHaveBeenCalledTimes(2);
        expect(setState).toHaveBeenLastCalledWith([]);
        
    })

    // it("test passing two empty spaces", async () => {

    //     const mockStore = getStoreWithState({ books: { books: mockedBooks, currentBook: {} as Book, error: undefined } });

    //     const setState = jest.fn();
    //     const useStateSpy: any = (useState: any) => [useState, setState];
    //     jest.spyOn(React, 'useState').mockImplementation(useStateSpy);

    //     render(<Provider store={mockStore}>
    //         <Router>
    //             <Search></Search>
    //         </Router>
    //     </Provider>)

    //         mockStore.dispatch(changeShelf([...mockedBooks.slice(1, mockedBooks.length),{...mockedBooks[0], shelf:"read"} ]));
    //     const input = screen.getByRole('textbox');
    //     expect(input).toBeInTheDocument();
    //     const user = userEvent.setup();
    //     await user.type(input, "  ");
    //     expect(setState).toHaveBeenCalledTimes(2);
    //     expect(setState).toHaveBeenLastCalledWith([]);
        
    // })

})