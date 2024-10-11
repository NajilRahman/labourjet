import React from 'react'
import MessageCard from './MessageCard'

function message() {
  return (
    <div id='scroller' sm={12} md={6} className=' bg-white  p-5 ' style={{ maxHeight: '100vh ',height:'100vh', overflowX: 'hidden', overflowY: 'scroll' }}>
      <h1>Message History</h1>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>
      <MessageCard/>

    </div>
  )
}

export default message
