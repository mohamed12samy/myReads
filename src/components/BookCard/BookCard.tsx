import { useNavigate } from 'react-router-dom';
import React from 'react'
function BookCard({ book, onChangeSelf }): JSX.Element {
    const navigate = useNavigate();
    const selectHandler = (event, id) => {
        console.log(event.target.value)
        onChangeSelf({ shelf: event.target.value, id: id } )
    }
    return (

        <div className="bookContainer" key={book.id}>
            <div className="imageContainer">
                <img src={book.imageLinks?.thumbnail} alt={`${book.title}`} />
            </div>
            <div className="detailsContainer">
                <p className="book-card-title" id='title'>{book.title}</p>
                {book.subtitle && <p className="book-card-subtitle">{book.subtitle}</p>}
                <p className="description" id='desc'>{book.description?.length > 80 ? `${book.description?.substring(0, 120)}...` :  book.description}</p>
                <button className='button-show-more' onClick={() => navigate(`/${book.id}`)}>show more</button>
            </div>
            <div className="book-shelf-changer">
                <select onChange={(e) => selectHandler(e, book.id)} value={book.shelf ?? "none"} className="selector">
                    <option value="none" disabled>
                        Move to...
                    </option>
                    <option value="currentlyReading">Currently Reading</option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read" >Read</option>
                    <option value="none" >None</option>
                </select>
            </div>
        </div>
    )
}

export default BookCard