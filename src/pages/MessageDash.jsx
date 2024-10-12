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
      console.log(res.data)
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
                  <span><img className='img-fluid rounded-pill  ' style={{ height: '50px', width: '50px' }} src={oppo?.imgUrl} alt="" /><span className='ms-3 text-black text-black' style={{ fontWeight: 'bold' }}>{oppo?.userName}</span></span>
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
          
           <Button variant='outline-dark ' style={{width:'max-content'}} className='bg-light rounded-pill  text-center p-2 mx-1' id="button-addon2" onClick={handleShow2}>
            <i className="fa-solid fa-comments-dollar text-black  "></i>
          </Button>
          <Button variant='outline-dark ' style={{width:'max-content'}} className='bg-light rounded-pill  text-center p-2 mx-1' id="button-addon2" onClick={handleShow}>
            <i className="fa-solid fa-person-circle-question text-black  "></i>
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
