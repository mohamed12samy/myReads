import React from 'react'
import { Error } from '../components/Error/Error'
export const Wrapper = ({error, children}) => {
  return (
    <>
    {
        error ? 
        <Error error={error}></Error>
        :
        children
    }
    </>
  )
}
