import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../redux/store'
import { resetError } from '../../redux/booksSlice'

export const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const {error} = useSelector<RootState, any>(state => state.books);
  return (
    <div className="header">
    <Link to="/" style={{textDecoration:"none"}}  replace={error} onClick={()=>{dispatch(resetError())}}><h4>My Reads</h4></Link>
    <ul className="nav">
      <li>
        <NavLink to="/" end replace={error}  onClick={()=>{dispatch(resetError())}}>Home</NavLink>
      </li>
      <li>
        <NavLink to="/search" replace={error} onClick={()=>{dispatch(resetError())}}><FontAwesomeIcon icon={faSearch} size='xs' /> Search</NavLink>
      </li>
    </ul>
  </div>
  )
}
