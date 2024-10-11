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


  useEffect(() => {
    getData(`getMessage/${id}`)
      .then(res => {
        setMessage(res.data)
        if (res.data.users[0] != viewerid) {
          postData('user', { id: res.data.users[0] })
            .then(res => {
              setOppo(res.data)
            })
        }
        else {
          postData('user', { id: res.data.users[1] })
            .then(res => {
              setOppo(res.data)
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
    postData('postMessage', { _id: id, messager: viewerid, msg: msgInput, recid: oppo._id,msgType:'user' })
      .then(res => {
        
        socket.emit('newMessage', { _id: id, messager: viewerid, msg: msgInput, recid: oppo,msgType:'user'  }, (response) => {
          setMessage([...message, response])
        })
      })
  }

  return (
    <div>
      <Navbar className="bg-black">
        <Container>
          <Row className=' '>

            <Col sm={9} className=''>
              <div className=' rounded-1  ' style={{ width: 'max-content' }}>
                <span><img className='img-fluid rounded-pill' style={{ height: '50px', width: '50px' }} src={oppo?.imgUrl} alt="" /><span className='ms-2 text-black text-white' style={{ fontWeight: 'bold' }}>{oppo?.userName}</span></span>
              </div>
            </Col>
          </Row>        <Navbar.Toggle />
          <Navbar.Collapse className="mx-3">
            <Navbar.Text>
            <Dropdown>
      <Dropdown.Toggle className='btn bg-black' id="dropdown-basic">
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item className='bg-sucess'onClick={handleShow2} >Payment Request</Dropdown.Item>
        <Dropdown.Item  onClick={handleShow}>Work Request</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      


      <div className='w-100 bg-white' style={{ height: '70vh', overflowY: 'scroll' }}>
        <Row className='w-100'>

          {

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

      <Container className=''>
        <InputGroup className="mb-3">
          <Form.Control
            placeholder="type..."
            aria-label=""
            aria-describedby="basic-addon2"
            onChange={e => setMsgInput(e.target.value)}
          />
          <Button variant='outline-dark' className='bg-dark' id="button-addon2" onClick={sendMessage}>
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
