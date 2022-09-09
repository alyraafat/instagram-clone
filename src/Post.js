import React from 'react'
import "./Post.css"
import { Avatar } from '@mui/material'


function Post({ userName, caption, imageUrl }) {
  return (
    <div className='post'>
      <div className='post__header'>
        <Avatar 
          className='post__avatar'
          alt={userName[0].toUpperCase()}
          src='https://images.unsplash.com/photo-1593642647651-e7f9e8f8f3f0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
        />
        <h3>{userName}</h3>
      </div>
     
      <img 
        className='post__image'
        src={ imageUrl }
        alt="Google Logo"
      /> 
      <h4 className='post__text'><strong>{userName}</strong> {caption}</h4>
    </div>
  )
}

export default Post
