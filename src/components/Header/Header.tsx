import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link, NavLink } from 'react-router-dom'

export const Header = () => {
  return (
    <div className="header">
    <Link to="/" style={{textDecoration:"none"}}><h4>My Reads</h4></Link>
    <ul className="nav">
      <li>
        <NavLink to="/" end>Home</NavLink>
      </li>
      <li>
        <NavLink to="/search"><FontAwesomeIcon icon={faSearch} size='xs' /> Search</NavLink>
      </li>
    </ul>
  </div>
  )
}
