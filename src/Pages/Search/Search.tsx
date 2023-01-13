import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { BookList } from '../../components/BookList/BookList';
import { Book } from '../../Interfaces/Book';
import { getbooks, searchBooks } from '../../redux/booksSlice';
import { AppDispatch, RootState } from '../../redux/store';

export const Search = () => {
  const [searchResult, setSearchResult] = React.useState([] as Book[]);
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const books = useSelector<RootState, Book[]>((state) => state.books.books);

  /*React.useEffect(() => {
    if (books?.length === 0) {
      dispatch(getbooks());
    }
  }, [])*/

  /*React.useEffect(() => {
     searchResult.some(b => {
      const filteredBook = books.find(book=> book.id === b.id && book.shelf !== b.shelf);
      if(filteredBook !== undefined){
        const execluded =  searchResult.filter(bf=> bf.id !== filteredBook.id);
          setSearchResult([...execluded, { ...b, shelf: filteredBook.shelf }])
          return false;
      }
        })
  }, [books])*/

  const handleBooksSearch = (event) => {

    dispatch(searchBooks({query:event.target.value, maxResults:1}))

    /*let  searchWord = event.target.value;
    if ( searchWord.trim() !== "") {
      const  filterdBooks = books.filter((book) => {
        const title = book.title;
        const authors = book.authors;
        const isbn = book.industryIdentifiers;
        return title?.toLowerCase().includes( searchWord)
          || isbn?.find(el =>el.type.toLocaleLowerCase().includes( searchWord))
          || authors?.find(el => el.toLocaleLowerCase().includes( searchWord)
          );
      });
      setSearchResult( filterdBooks);
    }
    else {
      setSearchResult([]);
    }*/
  }

  return (
    <div className='search-page'  >
      <input className="search-input" placeholder="Search by title, author, or ISBN" onChange={handleBooksSearch} />
      <BookList books={ books} />
     
    </div>
  )
}
