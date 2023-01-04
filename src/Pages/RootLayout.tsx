import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Outlet } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Header } from '../components/Header/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Wrapper } from './Wrapper';

export const RootLayout = () => {
const {error} = useSelector<RootState, any>(state => state.books);

    return (
        <div className='content'>
            <Header />
            <Wrapper error={error}>
            <Outlet />
            </Wrapper>
        </div>
    )
}
