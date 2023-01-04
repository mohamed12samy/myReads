import React, { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { Book } from '../../Interfaces/Book';
import { useDispatch, useSelector } from 'react-redux';
import { getbooks } from '../../store/booksSlice';
import { useNavigate } from 'react-router-dom';
import { BookList } from '../../components/BookList/BookList';
import { AppDispatch, RootState } from '../../store/store';
import { Wrapper } from '../Wrapper';

function Home() {

    /// git books with redux 
    const dispatch = useDispatch<AppDispatch>();
    // const books = useSelector<RootState, Book[]>((state) => state.books.books);
    const {books, error} = useSelector<RootState, any>((state) => state.books);
    useEffect(() => {
        dispatch(getbooks());
    }, []);

    return (
        <Wrapper error={error} >
        <BookList books={books} />
        </Wrapper>
    )
}

export default Home