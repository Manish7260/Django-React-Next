import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { clearAllUsers } from '../store/slices/UserSlice'

const DeleteAllUser = () => {

  const dispatch = useDispatch()

  const deleteUsers = () => {
    dispatch(clearAllUsers())
  }
  return (
    <Wrapper>
      <button className='btn clear-btn' onClick={deleteUsers}>clear button</button>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  .clear-btn{
    text-transform: capitalize;
    background-color: #db338a;
    margin-top: 2rem;
  }
`
export default DeleteAllUser
