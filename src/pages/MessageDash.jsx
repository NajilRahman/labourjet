import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Col,Row, Nav } from 'react-bootstrap';
import SelfMessage from '../components/SelfMessage';
import OthersMessage from '../components/OthersMessage';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import {Button} from 'react-bootstrap';
import { getData, postData } from '../apiServices/apiServices';
import io from 'socket.io-client'

  const ioPort=`http://localhost:4000`
  var socket
function MessageDash() {

  const {id}=useParams()
  const viewerid=JSON.parse(localStorage.getItem('user'))._id
  const [message,setMessage]=useState([])
  const [msgInput,setMsgInput]=useState('')
  const [oppo,setOppo]=useState()
  useEffect(() => {
    getData(`getMessage/${id}`)
    .then(res=>{
      setMessage(res.data)
      if(res.data.users[0]!=viewerid)
      {
        postData('user',{id:res.data.users[0]})
        .then(res=>{
          setOppo(res.data)
        })
      }
      else{
        postData('user',{id:res.data.users[1]})
        .then(res=>{
          setOppo(res.data)
        })
      }
      
    })

  }, [message])

  useEffect(() => {
    socket=io(ioPort);
      socket.emit('joinRoom',viewerid)
      socket.emit('joinChat',message._id)
      
  }, [])
  

 
  


  const sendMessage=()=>{
    postData('postMessage',{_id:id,messager:viewerid,msg:msgInput,recid:oppo._id})
    .then(res=>{

      socket.emit('newMessage',{_id:id,messager:viewerid,msg:msgInput,recid:oppo},(response)=>{
          setMessage(...message,response)
      })
   } )
  }
  
  return (
    <div>
       <Navbar className="bg-black  text-center">
        
        <Container>
          <Row className=' '>
         
   <Col className=''>
   <div className=' rounded-1  ' style={{width:'max-content'}}>
                  <span><img className='img-fluid rounded-pill' style={{height:'50px',width:'50px'}} src={oppo?.imgUrl} alt="" /><span className='ms-2 text-black text-white' style={{fontWeight:'bold'}}>{oppo?.userName}</span></span>
              </div>
   </Col>
          </Row>
        </Container>
      </Navbar>


      <div className='w-100 bg-white' style={{height:'70vh',overflowY:'scroll'}}>
     <Row className='w-100'> 

      {
        
          message.messages?.map(obj=>(
              obj.messager==viewerid?
              <Col sm={12}><SelfMessage message={obj} /></Col> 
              :   
<>
                <Col sm={12}><OthersMessage message={obj} /></Col>
  
</>

          ))
      }
      <div id='lastMessage'></div>
  </Row>
      </div>

      <Container className=''>
      <InputGroup className="mb-3">
                <Form.Control
                    placeholder="type..."
                    aria-label=""
                    aria-describedby="basic-addon2"
                    onChange={e=>setMsgInput(e.target.value)}
                />
                <Button variant='outline-dark' className='bg-dark' id="button-addon2" onClick={sendMessage}>
                    <i className="fa-solid fa-paper-plane text-white fa-xl "></i>
                </Button>
                
            </InputGroup>
      </Container>
     

    </div>
  )
}

export default MessageDash
