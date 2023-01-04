import React from 'react'

export const Error = ({error}) => {
  return (
    <div className='error'>
    <h2>Error occured</h2>
    <p>{error.name}</p>
    </div>
  )
}
