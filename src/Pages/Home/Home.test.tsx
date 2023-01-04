import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../../store/store'
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import Home from './Home'
import { mockedBooks } from "../../store/books";

test("test Home", () => {
    render(<Provider store={store}>
        <Router>
            <Home ></Home>
        </Router>
    </Provider>)
})