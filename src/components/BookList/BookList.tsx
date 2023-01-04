import { red } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { Book } from '../../Interfaces/Book';
import { changeShelf, updateBookShelf } from '../../store/booksSlice';
import BookCard from '../BookCard/BookCard';
import { handleChangeOnSelf, booksToShelfs } from '../../Helpers/BookUtility/bookUtility'


const renderBooks = (books: Book[]) => {
    return books.map((item: Book) =>
        <div className='col-4 m-3' key={item.id}>
        <BookCard
            book={item}
            key={item.id}
            onChangeSelf={handleChangeOnSelf}
        />
        </div>
    );
};
const shelfStyling = 'shelfContainer row justify-content-center';


export const BookList = ({ books }) => {
    // const dispatch = useDispatch<any>()
    const [bookArray, setBooks] = useState({ currentlyReading: [], wantToRead: [], read: [], noShelf: [] });
   
    useEffect(() => {
        setBooks(booksToShelfs(books));
    }, [books])

    return (
        <div className='book-list  row justify-content-center'>
            {
                bookArray.currentlyReading.length !== 0 &&
                <>
                    <h3>currently Reading</h3>
                    <div className={shelfStyling}> {renderBooks(bookArray.currentlyReading)} </div>
                </>
            }
            {
                bookArray.read.length !== 0 &&
                <>
                    <h3>Read</h3>
                    <div className={shelfStyling}> {renderBooks(bookArray.read)} </div>
                </>
            }
            {
                bookArray.wantToRead.length !== 0 &&
                <>
                    <h3>want To Read</h3>
                    <div className={shelfStyling}> {renderBooks(bookArray.wantToRead)} </div>
                </>
            }
            {
                bookArray.noShelf.length !== 0 &&
                <>
                    <h3>Not categorized</h3>
                    <div className={shelfStyling}> {renderBooks(bookArray.noShelf)} </div>
                </>
            }
        </div>
    )
}
