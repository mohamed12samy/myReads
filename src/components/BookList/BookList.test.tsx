import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import {BookList} from './BookList'
import { mockedBooks } from "../../store/books";

test("should contain images, buttons and comboboxes with books array lengrh", () => {
    render(<Provider store={store}>
        <Router>
            <BookList books={mockedBooks} ></BookList>
        </Router>
    </Provider>)
    expect(screen.getAllByRole('img')).toHaveLength(mockedBooks.length)
    expect(screen.getAllByRole('combobox')).toHaveLength(mockedBooks.length)
    expect(screen.getAllByRole('button')).toHaveLength(mockedBooks.length)
})