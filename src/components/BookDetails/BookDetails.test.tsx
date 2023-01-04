import React from 'react'
import { Provider } from 'react-redux'
import { getStoreWithState, store } from '../../redux/store'
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import {BookDetails} from './BookDetails'
import { mockedBooks } from "../../redux/books";

test("test book details", () => {
    const mockStore = getStoreWithState({ books: { books: mockedBooks, currentBook: mockedBooks[0], error: undefined } });
    render(<Provider store={mockStore}>
        <Router>
            <BookDetails/>
        </Router>
    </Provider>)
})