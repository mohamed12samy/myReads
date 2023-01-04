import React from 'react'
import { Provider } from 'react-redux'
import { store } from '../store/store'
import { render, screen } from "@testing-library/react"
import { BrowserRouter as Router } from 'react-router-dom'
import {RootLayout} from './RootLayout'

test("test RootLayout", () => {
    render(<Provider store={store}>
        <Router>
            <RootLayout/>
        </Router>
    </Provider>)
})