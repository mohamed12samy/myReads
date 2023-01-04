import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import {Header} from './Header'
import { mockedBooks } from "../../store/books";

test("test header", () => {
    render(<Provider store={store}>
        <Router>
            <Header/>
        </Router>
    </Provider>)
})