import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Col, Row, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import SelfMessage from '../components/SelfMessage';
import OthersMessage from '../components/OthersMessage';
import { getData, postData } from '../apiServices/apiServices';
import io from 'socket.io-client';
import SelfworkReq from '../components/selfworkReq';
import OthersWorkReq from '../components/othersWorkReq';
import SelfPaymentMessage from '../components/selfPaymentMessage';
import OtherPaymentMessage from '../components/OtherPaymentMessage';
import Loading from '../components/spinner';

const ioPort = import.meta.env.VITE_SOCKET_URL || 'https://labourjetbackend-zcymk750.b4a.run/';
let socket;

function MessageDash() {
  const { id } = useParams();
  const viewerid = JSON.parse(localStorage.getItem('user'))?._id;
  const [message, setMessage] = useState({ messages: [] });
  const [msgInput, setMsgInput] = useState('');
  const [oppo, setOppo] = useState();
  const [work, setWork] = useState({ workName: '', description: '', date: '' });
  const [payment, setPayment] = useState({ upiid: '', amount: '0' });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData(`getMessage/${id}`).then(res => {
      setMessage(res.data);
      if (res.data.users[0] !== viewerid) {
        postData('user', { id: res.data.users[0] }).then(res => {
          setOppo(res.data);
          setLoading(false);
        });
      } else {
        postData('user', { id: res.data.users[1] }).then(res => {
          setOppo(res.data);
          setLoading(false);
        });
      }
    });
  }, [id]);

  useEffect(() => {
    socket = io(ioPort);
    socket.emit('joinRoom', viewerid);
    socket.emit('joinChat', id);

    socket.on('newMessageReceived', (data) => {
      setMessage(prev => {
        if (prev && prev.messages) {
          return { ...prev, messages: [...prev.messages, data] };
        }
        return prev;
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  const sendPaymentReq = () => {
    const payload = {
      _id: id, messager: viewerid, msg: `upi://pay?pa=${payment.upiid}&am=${payment.amount}.00`,
      recid: oppo._id, msgType: 'payment', upiid: payment.upiid, amount: payment.amount, status: 'pending'
    };
    postData('postMessage', payload).then(res => {
      handleClose2();
      socket.emit('newMessage', payload, (response) => {
        setMessage(prev => {
          if (prev && prev.messages) {
            return { ...prev, messages: [...prev.messages, response] };
          }
          return prev;
        });
      });
    });
  };

  const sendWorkRequest = () => {
    const payload = {
      _id: id, viewerid, msgType: 'workRequest', workName: work.workName,
      description: work.description, date: work.date, recid: oppo._id
    };
    postData('sendWorkRequest', payload).then(res => {
      handleClose();
      socket.emit('newMessage', payload, (response) => {
        setMessage(prev => {
          if (prev && prev.messages) {
            return { ...prev, messages: [...prev.messages, response] };
          }
          return prev;
        });
      });
    });
  };

  const sendMessage = () => {
    if (!msgInput.trim()) return;
    const currentMsg = msgInput;
    setMsgInput('');
    postData('postMessage', { _id: id, messager: viewerid, msg: currentMsg, recid: oppo._id, msgType: 'user' })
      .then(res => {
        socket.emit('newMessage', { _id: id, messager: viewerid, msg: currentMsg, recid: oppo._id, msgType: 'user' }, (response) => {
          setMessage(prev => {
            if (prev && prev.messages) {
              return { ...prev, messages: [...prev.messages, response] };
            }
            return prev;
          });
        });
      });
  };

  return (
    <div className="d-flex flex-column" style={{ height: '100vh', backgroundColor: 'transparent' }}>
      {/* Header */}
      <Navbar className="bg-glass shadow-sm px-4 py-3 border-bottom sticky-top" style={{ zIndex: 10 }}>
        <div className="d-flex align-items-center w-100">
          {oppo ? (
            <>
              <img
                className="rounded-circle shadow-sm"
                style={{ height: '50px', width: '50px', objectFit: 'cover' }}
                src={oppo.imgUrl || 'https://via.placeholder.com/150'}
                alt="profile"
              />
              <div className="ms-3 d-flex flex-column">
                <span className="text-white fw-bold d-flex align-items-center" style={{ fontSize: '1.1rem' }}>
                  {oppo.userName}
                  {oppo.userType === 'employee' && (
                    <i className="fa-solid fa-circle-check text-info ms-2 fa-xs" title="Verified"></i>
                  )}
                </span>
                <small className="text-muted">{oppo.userType === 'employee' ? oppo.jobRole || 'Specialist' : 'Hirer'}</small>
              </div>
            </>
          ) : (
            <span className="text-white">Loading...</span>
          )}
        </div>
      </Navbar>

      {/* Message Feed */}
      <div className="flex-grow-1 p-3" style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {loading ? (
          <div className="h-100 d-flex justify-content-center align-items-center"><Loading /></div>
        ) : (
          message.messages?.map((obj, i) => (
            <div key={i} className="w-100">
              {obj.msgType === 'user' ? (
                obj.messager === viewerid ? <SelfMessage message={obj} /> : <OthersMessage message={obj} />
              ) : obj.msgType === 'workRequest' ? (
                obj.senderid === viewerid ? <SelfworkReq data={obj} chatid={id} /> : <OthersWorkReq data={obj} chatid={id} />
              ) : (
                obj.messager === viewerid ? <SelfPaymentMessage data={obj} chatid={id} /> : <OtherPaymentMessage data={obj} chatid={id} />
              )}
            </div>
          ))
        )}
        <div id="lastMessage"></div>
      </div>

      {/* Input Area */}
      <div className="bg-glass p-3 border-top mt-auto shadow-lg" style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 1rem)' }}>
        <Container fluid>
          <InputGroup className="align-items-center gap-2">
            <Form.Control
              placeholder="Type a message..."
              className="rounded-pill border-0 shadow-none"
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white', padding: '12px 20px' }}
              onChange={e => setMsgInput(e.target.value)}
              value={msgInput}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            />
            {oppo?.userType === 'employee' && (
              <Button variant="light" className="rounded-circle d-flex align-items-center justify-content-center border-0" style={{ width: '45px', height: '45px', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={handleShow}>
                <i className="fa-solid fa-briefcase text-white"></i>
              </Button>
            )}
            <Button variant="light" className="rounded-circle d-flex align-items-center justify-content-center border-0" style={{ width: '45px', height: '45px', backgroundColor: 'rgba(255,255,255,0.1)' }} onClick={handleShow2}>
              <i className="fa-solid fa-indian-rupee-sign text-white"></i>
            </Button>
            <Button variant="primary" className="rounded-circle d-flex align-items-center justify-content-center border-0 shadow" style={{ width: '45px', height: '45px' }} onClick={sendMessage}>
              <i className="fa-solid fa-paper-plane text-white"></i>
            </Button>
          </InputGroup>
        </Container>
      </div>

      {/* Work Request Modal */}
      <Modal show={show} onHide={handleClose} centered contentClassName="modal-glass border-0 shadow-lg" backdropClassName="glass-backdrop">
        <Modal.Header closeButton closeVariant="white" className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold text-white"><i className="fa-solid fa-briefcase me-2 text-info"></i>Send Work Request</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-2">
          <div className="d-flex flex-column gap-3">
            <input type="text" className="form-control" placeholder="Work Title" onChange={e => setWork({ ...work, workName: e.target.value })} />
            <textarea className="form-control" rows="3" placeholder="Describe the job, location, requirements..." onChange={e => setWork({ ...work, description: e.target.value })} />
            <input type="date" className="form-control" onChange={e => setWork({ ...work, date: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 px-4 pb-4">
          <Button variant="light" className="rounded-pill px-4" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff'}} onClick={handleClose}>Cancel</Button>
          <Button variant="primary" className="rounded-pill px-4" onClick={sendWorkRequest}>Send Request</Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Request Modal */}
      <Modal show={show2} onHide={handleClose2} centered contentClassName="modal-glass border-0 shadow-lg" backdropClassName="glass-backdrop">
        <Modal.Header closeButton closeVariant="white" className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold text-white"><i className="fa-solid fa-indian-rupee-sign me-2 text-success"></i>Request Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-2">
          <div className="d-flex flex-column gap-3">
            <input type="text" className="form-control" placeholder="Your UPI ID" onChange={e => setPayment({ ...payment, upiid: e.target.value })} />
            <input type="number" className="form-control" placeholder="Amount (INR)" onChange={e => setPayment({ ...payment, amount: e.target.value })} />
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 px-4 pb-4">
          <Button variant="light" className="rounded-pill px-4" style={{background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'#fff'}} onClick={handleClose2}>Cancel</Button>
          <Button variant="primary" className="rounded-pill px-4" onClick={sendPaymentReq}>Request Payment</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default MessageDash;
