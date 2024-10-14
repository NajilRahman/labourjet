import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Row, Nav } from 'react-bootstrap';
import SelfMessage from '../components/SelfMessage';
import OthersMessage from '../components/OthersMessage';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Button } from 'react-bootstrap';
import { getData, postData } from '../apiServices/apiServices';
import Dropdown from 'react-bootstrap/Dropdown';
import Modal from 'react-bootstrap/Modal';

import io from 'socket.io-client'
import SelfworkReq from '../components/selfworkReq';
import OthersWorkReq from '../components/othersWorkReq';
import SelfPaymentMessage from '../components/selfPaymentMessage';
import OtherPaymentMessage from '../components/OtherPaymentMessage';
import Loading from '../components/spinner';


const ioPort = `http://localhost:4000`
var socket
function MessageDash() {

  const { id } = useParams()
  const viewerid = JSON.parse(localStorage.getItem('user'))._id
  const [message, setMessage] = useState([])
  const [msgInput, setMsgInput] = useState('')
  const [oppo, setOppo] = useState()
  const [work,setWork]=useState({workName:'',description:'',date:''})
  const [payment,setPayment]=useState({upiid:'',amount:'0'})
  //modal 
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   //modal 2
   const [show2, setShow2] = useState(false);
   const handleClose2 = () => setShow2(false);
   const handleShow2 = () => setShow2(true);
  const [loading,setLoading]=useState(true)


  useEffect(() => {
    getData(`getMessage/${id}`)
      .then(res => {
        setMessage(res.data)
        if (res.data.users[0] != viewerid) {
          postData('user', { id: res.data.users[0] })
            .then(res => {
              setOppo(res.data)
              setLoading(false)
            })
        }
        else {
          postData('user', { id: res.data.users[1] })
            .then(res => {
              setOppo(res.data)
              setLoading(false)

            })
        }

      })

  }, [message])

  useEffect(() => {
    socket = io(ioPort);
    socket.emit('joinRoom', viewerid)
    socket.emit('joinChat', message._id)

  }, [])


  const sendPaymentReq=()=>{
    postData('postMessage', { _id: id, messager: viewerid, msg:`upi://pay?pa=${payment.upiid}&am=${payment.amount}.00`, recid: oppo._id ,msgType:'payment',upiid:payment.upiid,amount:payment.amount ,status:'pending'})
    .then(res => {
      handleClose2()
      socket.emit('newMessage', { _id: id, messager: viewerid, msg:`upi://pay?pa=${payment.upiid}&am=${payment.amount}.00`, recid: oppo._id ,msgType:'payment',upiid:payment.upiid,amount:payment.amount,status:'pending' }, (response) => {
        setMessage([...message, response])
      })
    })
  }


  const sendWorkRequest=()=>{
    postData('sendWorkRequest', { _id: id,  viewerid,msgType:'workRequest',workName:work.workName,description:work.description,date:work.date, recid: oppo._id })
    .then(res => {
      handleClose()
      socket.emit('newMessage', { _id: id, viewerid,msgType:'workRequest',workName:work.workName,description:work.description,date:work.date, recid: oppo._id }, (response) => {
        setMessage([...message, response])
      })
    })
  }



  const sendMessage = () => {
    postData('postMessage', { _id: id, messager: viewerid, msg: msgInput, recid: oppo._id,msgType:'user'})
      .then(res => {
        setMsgInput('')
        socket.emit('newMessage', { _id: id, messager: viewerid, msg: msgInput, recid: oppo,msgType:'user'  }, (response) => {
          setMessage([...message, response])
        })
      })
  }

  return (
    <div>
        <Navbar className="text-center bg-light shadow" style={{height:'max-content'}}>
            <Row className=' '>
  
              <Col sm={12} className='ms-4'>
                <div className=' ' style={{ width: 'max-content' }}>
                  <span><img className='img-fluid rounded-pill  ' style={{ height: '50px', width: '50px' }} src={oppo?.imgUrl} alt="" /><span className='ms-3 text-black text-black' style={{ fontWeight: 'bold' }}>{oppo?.userName}{oppo?.userType=='employee'?<svg className='ms-2' style={{width:'30px'}} id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m256 512c-66.012-37.684-225-151.29-225-377.76v-73.14h15c34.673 1.377 118.623-.163 201.68-55.548l8.32-5.552 8.32 5.552c83.159 55.444 167.314 56.779 199.424 55.607l17.256-.159v73.24c0 267.383-221.99 374.756-225 377.76z" fill="#f0f7ff"/></g><path d="m481 134.24v-73.24l-17.256.159c-32.109 1.172-116.265-.163-199.424-55.607l-8.32-5.552v512c3.01-3.005 225-110.379 225-377.76z" fill="#c7cfe1"/><g><g><path d="m256 443.38c-2.617-3-165-99.914-165-309.141v-13.374l13.286-2.432c50.859-5.874 99.507-21.196 144.58-45.571l7.134-3.852 7.134 3.853c45.073 24.375 93.721 39.697 144.58 45.571l13.286 1.524v13.374c0 205.199-162.252 306.898-165 310.048z" fill="#7ed8f6"/></g></g><path d="m421 133.332v-13.374l-13.286-1.523c-50.859-5.874-99.507-21.196-144.58-45.571l-7.134-3.854v374.37c2.748-3.151 165-104.849 165-310.048z" fill="#4895ff"/><g id="Shield_2_"><g><path d="m241 307.311-55.605-55.605 21.21-21.211 34.395 34.394 79.395-79.394 21.21 21.211z" fill="#f0f7ff"/></g></g><path d="m256 292.311 85.605-85.605-21.21-21.211-64.395 64.394z" fill="#c7cfe1"/></g></svg>:''} </span></span>
                </div>
              </Col>
            </Row>        <Navbar.Toggle />
        </Navbar>
      


      <div className='w-100 ' style={{ height: '70vh', overflowY: 'scroll' }}>
        <Row className='w-100'>

          {
            loading?<div style={{height:'70vh'}}  className='d-flex justify-content-center align-items-center'><Loading/></div>
            :
            message.messages?.map(obj => (
              obj.msgType=='user'?
              obj.messager == viewerid ?
                <Col sm={12}><SelfMessage message={obj} /></Col>
                :<Col sm={12}><OthersMessage message={obj} /></Col>
              :obj.msgType=='workRequest'?
                obj.senderid == viewerid ?
                <Col sm={12}><SelfworkReq data={obj}  chatid={id}/></Col>
                :<Col sm={12}><OthersWorkReq data={obj} chatid={id}/></Col>

              : obj.messager == viewerid ?
              <Col sm={12}><SelfPaymentMessage data={obj}  chatid={id}/></Col>
              :<Col sm={12}><OtherPaymentMessage data={obj} chatid={id}/></Col>

            ))
          }
          <div id='lastMessage'></div>
        </Row>
      </div>

      <Container className='' >
        <InputGroup className="mb-3" >
          <Form.Control
            placeholder="type..."
            aria-label=""
            aria-describedby="basic-addon2"
            className='rounded-5'
            onChange={e => setMsgInput(e.target.value)}
            value={msgInput}
          />
          
           {
            oppo?.userType=='employee'?<Button variant='outline-dark ' style={{width:'max-content'}} className='bg-light rounded-pill  text-center p-2 mx-1' id="button-addon2" onClick={handleShow}>
            <i className="fa-solid fa-person-circle-question text-black  "></i>
          </Button>
          :''
           }
           <Button variant='outline-dark ' style={{width:'max-content'}} className='bg-light rounded-pill  text-center p-2 mx-1' id="button-addon2" onClick={handleShow2}>
            <i className="fa-solid fa-comments-dollar text-black  "></i>
          </Button>
           
          <Button variant='outline-black' className='bg-dark rounded-pill text-center p-2 mx-1' style={{width:'max-content'}} id="button-addon2" onClick={sendMessage}>
            <i className="fa-solid fa-paper-plane text-white fa-xl "></i>
          </Button>


        </InputGroup>
      </Container>



          {/* work Request modal */}
          <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Work Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" className='form-control mb-2' placeholder='Work' onChange={e=>{setWork({...work,workName:e.target.value})}}/>
            <input type="text" className='form-control mb-2' placeholder='about work, place, description etc...' onChange={e=>{setWork({...work,description:e.target.value})}}/>
            <input type="date" className='form-control mb-2' placeholder='date' onChange={e=>{setWork({...work,date:e.target.value})}}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={sendWorkRequest} >
            Send
          </Button>
        </Modal.Footer>
      </Modal>





       {/* payment Request modal */}
       <Modal show={show2} onHide={handleClose2}>
        <Modal.Header closeButton>
          <Modal.Title>Work Request</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <input type="text" className='form-control mb-2' placeholder='upi id' onChange={e=>{setPayment({...payment,upiid:e.target.value})}}/>
            <input type="text" className='form-control mb-2' placeholder='amount' onChange={e=>{setPayment({...payment,amount:e.target.value})}}/>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={sendPaymentReq} >
            Send
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  )
}

export default MessageDash
