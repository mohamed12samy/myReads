import React from 'react';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { Book } from '../../Interfaces/Book';
import { RootState } from '../../redux/store';

export const BookDetails = () => {
  const currentBook = useSelector<RootState, Book>((state) => state.books.currentBook);

  return (
    <div className="container">
      <h1 className="d-flex justify-content-center" style={{ color: 'white' }} >Book Details</h1>
      <div className="w-100 mx-auto ">
        <div className="book-img col-lg-3 col-3">
          <img className="w-100 h-70" src={currentBook.imageLinks?.thumbnail} alt={`${currentBook.title}`} />
        </div>
        <div className="">
          <div className="contents">
            <div className='title-shelf'>
            <h1 className="book-title ml-0">{currentBook.title}</h1>
            <span>( {currentBook.shelf} )</span>
            </div>
            <div className='details-content'>
              <h5>
                By:  <span >
                  {currentBook.authors.join(", ")}
                </span>
              </h5>
            </div>
            <div className='details-content'>
              <h5>Subtitle: </h5>
              <span>{currentBook.subtitle}</span>
            </div>
            {currentBook.categories &&
              <div className='details-content'>
                <h5>Genre:</h5> <p>{currentBook.categories.join(", ")}</p>
              </div>}
            {currentBook.averageRating &&
              <div className='details-content'>
                <h5>
                  Rating: <FontAwesomeIcon icon={faStar} />
                  <span className='ml-5'>{currentBook.averageRating}</span>
                </h5>
              </div>
            }
            <p className='details-description'>{currentBook.description}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
