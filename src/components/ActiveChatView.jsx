import React, { useEffect, useState, useRef } from 'react';
import { Container, Button, Modal, Form, InputGroup } from 'react-bootstrap';
import SelfMessage from './SelfMessage';
import OthersMessage from './OthersMessage';
import { getData, postData } from '../apiServices/apiServices';
import io from 'socket.io-client';
import SelfworkReq from './selfworkReq';
import OthersWorkReq from './othersWorkReq';
import SelfPaymentMessage from './selfPaymentMessage';
import OtherPaymentMessage from './OtherPaymentMessage';
import Loading from './spinner';

const ioPort = import.meta.env.VITE_SOCKET_URL || `http://localhost:3000`;
let socket;

function ActiveChatView({ chatId, viewerid, onBack }) {
  const [message, setMessage] = useState({ messages: [] });
  const [msgInput, setMsgInput] = useState('');
  const [oppo, setOppo] = useState(null);
  const [work, setWork] = useState({ workName: '', description: '', date: '' });
  const [payment, setPayment] = useState({ upiid: '', amount: '0' });

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [loading, setLoading] = useState(true);
  const feedEndRef = useRef(null);

  const scrollToBottom = () => {
    feedEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (!chatId) return;
    setLoading(true);
    getData(`getMessage/${chatId}`).then(res => {
      setMessage(res.data);
      const opposingUser = res.data.users[0] !== viewerid ? res.data.users[0] : res.data.users[1];
      postData('user', { id: opposingUser }).then(userRes => {
        setOppo(userRes.data);
        setLoading(false);
      });
    });
  }, [chatId, viewerid]);

  useEffect(() => {
    if (!chatId) return;
    socket = io(ioPort);
    socket.emit('joinRoom', viewerid);
    socket.emit('joinChat', chatId);

    socket.on('newMessageReceived', (data) => {
      setMessage(prev => {
        if (prev && prev.messages) {
          return { ...prev, messages: [...prev.messages, data] };
        }
        return prev;
      });
    });

    return () => {
      if (socket) socket.disconnect();
    };
  }, [chatId, viewerid]);

  useEffect(() => {
    scrollToBottom();
  }, [message.messages]);

  const sendPaymentReq = () => {
    const payload = {
      _id: chatId, messager: viewerid, msg: `upi://pay?pa=${payment.upiid}&am=${payment.amount}.00`,
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
      _id: chatId, viewerid, msgType: 'workRequest', workName: work.workName,
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
    postData('postMessage', { _id: chatId, messager: viewerid, msg: currentMsg, recid: oppo._id, msgType: 'user' })
      .then(res => {
        socket.emit('newMessage', { _id: chatId, messager: viewerid, msg: currentMsg, recid: oppo._id, msgType: 'user' }, (response) => {
          setMessage(prev => {
            if (prev && prev.messages) {
              return { ...prev, messages: [...prev.messages, response] };
            }
            return prev;
          });
        });
      });
  };

  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80';

  return (
    <div className="d-flex flex-column h-100 position-relative" style={{ minHeight: '75vh', backgroundColor: 'transparent' }}>
      {/* Header */}
      <div 
        className="d-flex align-items-center justify-content-between p-3 border-bottom bg-glass"
        style={{ 
          borderColor: 'rgba(255,255,255,0.08)',
          borderRadius: '16px 16px 0 0'
        }}
      >
        <div className="d-flex align-items-center">
          {onBack && (
            <button 
              className="btn btn-link text-white p-0 me-3 d-md-none border-0" 
              onClick={onBack}
            >
              <i className="fa-solid fa-arrow-left fa-lg"></i>
            </button>
          )}
          {oppo ? (
            <>
              <div className="position-relative">
                <img
                  className="rounded-circle shadow-sm"
                  style={{ height: '46px', width: '46px', objectFit: 'cover', border: '2px solid rgba(56, 189, 248, 0.3)' }}
                  src={oppo.imgUrl || defaultAvatar}
                  alt="profile"
                />
                <span 
                  className="position-absolute bottom-0 end-0 rounded-circle" 
                  style={{ width: '10px', height: '10px', backgroundColor: '#10b981', border: '2px solid #0f172a' }}
                ></span>
              </div>
              <div className="ms-3 d-flex flex-column text-start">
                <span className="text-white fw-bold d-flex align-items-center" style={{ fontSize: '1rem' }}>
                  {oppo.userName}
                  {oppo.userType === 'employee' && (
                    <i className="fa-solid fa-circle-check text-info ms-2 fa-xs" title="Verified"></i>
                  )}
                </span>
                <small className="text-white opacity-50" style={{ fontSize: '0.75rem' }}>
                  {oppo.userType === 'employee' ? (oppo.jobRole || 'Specialist') : 'Hirer'}
                </small>
              </div>
            </>
          ) : (
            <span className="text-white opacity-75">Loading chat companion...</span>
          )}
        </div>
      </div>

      {/* Message Feed */}
      <div 
        className="flex-grow-1 p-3 d-flex flex-column gap-2" 
        style={{ 
          overflowY: 'auto', 
          maxHeight: '48vh', 
          minHeight: '48vh',
          backgroundColor: 'rgba(0, 0, 0, 0.15)',
          backgroundImage: 'radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 0)',
          backgroundSize: '24px 24px'
        }}
      >
        {loading ? (
          <div className="h-100 d-flex justify-content-center align-items-center"><Loading /></div>
        ) : (
          <>
            {message.messages?.map((obj, i) => (
              <div key={i} className="w-100">
                {obj.msgType === 'user' ? (
                  obj.type && obj.type !== 'text' ? (
                    <div className={`d-flex justify-content-${obj.messager === viewerid ? 'end' : 'start'}`}> 
                      {obj.type === 'image' && (
                        <img src={obj.content} alt="sent image" style={{ maxWidth: '200px', borderRadius: '8px' }} />
                      )}
                      {obj.type === 'audio' && (
                        <audio controls src={obj.content} />
                      )}
                      {obj.type === 'video' && (
                        <video controls src={obj.content} style={{ maxWidth: '200px', borderRadius: '8px' }} />
                      )}
                    </div>
                  ) : (
                    obj.messager === viewerid ? <SelfMessage message={obj} /> : <OthersMessage message={obj} />
                  )
                ) : obj.msgType === 'workRequest' ? (
                  obj.senderid === viewerid ? <SelfworkReq data={obj} chatid={chatId} /> : <OthersWorkReq data={obj} chatid={chatId} />
                ) : (
                  obj.messager === viewerid ? <SelfPaymentMessage data={obj} chatid={chatId} /> : <OtherPaymentMessage data={obj} chatid={chatId} />
                )}
              </div>
            ))}
            <div ref={feedEndRef} />
          </>
        )}
      </div>

      {/* Input Area */}
      <div 
        className="p-3 border-top bg-glass" 
        style={{ 
          borderColor: 'rgba(255,255,255,0.08)',
          borderRadius: '0 0 16px 16px'
        }}
      >
        <InputGroup className="align-items-center gap-2">
          <Form.Control
            placeholder="Type a message..."
            className="rounded-pill border-0 text-white"
            style={{ backgroundColor: 'rgba(255,255,255,0.06)', padding: '10px 18px', fontSize: '0.9rem' }}
            onChange={e => setMsgInput(e.target.value)}
            value={msgInput}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
          />
          {oppo?.userType === 'employee' && (
            <Button 
              variant="light" 
              className="rounded-circle d-flex align-items-center justify-content-center border-0 cursor-pointer" 
              style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.08)' }} 
              onClick={handleShow}
              title="Send Work Request"
            >
              <i className="fa-solid fa-briefcase text-white opacity-75"></i>
            </Button>
          )}
          <Button 
            variant="light" 
            className="rounded-circle d-flex align-items-center justify-content-center border-0 cursor-pointer" 
            style={{ width: '40px', height: '40px', backgroundColor: 'rgba(255,255,255,0.08)' }} 
            onClick={handleShow2}
            title="Request Payment"
          >
            <i className="fa-solid fa-indian-rupee-sign text-white opacity-75"></i>
          </Button>
          <Button 
            variant="primary" 
            className="rounded-circle d-flex align-items-center justify-content-center border-0 shadow cursor-pointer" 
            style={{ width: '40px', height: '40px' }} 
            onClick={sendMessage}
          >
            <i className="fa-solid fa-paper-plane text-white" style={{ fontSize: '0.85rem' }}></i>
          </Button>
        </InputGroup>
      </div>

      {/* Work Request Modal */}
      <Modal show={show} onHide={handleClose} centered contentClassName="modal-glass border-0 shadow-lg" backdropClassName="glass-backdrop">
        <Modal.Header closeButton closeVariant="white" className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold text-white"><i className="fa-solid fa-briefcase me-2 text-info"></i>Send Work Request</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-2">
          <div className="d-flex flex-column gap-3">
            <input 
              type="text" 
              className="form-control border-0 text-white" 
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
              placeholder="Work Title" 
              onChange={e => setWork({ ...work, workName: e.target.value })} 
            />
            <textarea 
              className="form-control border-0 text-white" 
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
              rows="3" 
              placeholder="Describe the job, location, requirements..." 
              onChange={e => setWork({ ...work, description: e.target.value })} 
            />
            <input 
              type="date" 
              className="form-control border-0 text-white" 
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
              onChange={e => setWork({ ...work, date: e.target.value })} 
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 px-4 pb-4 gap-2">
          <Button variant="secondary" className="rounded-pill px-4 border-0" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} onClick={handleClose}>Cancel</Button>
          <Button variant="primary" className="rounded-pill px-4 border-0" onClick={sendWorkRequest}>Send Request</Button>
        </Modal.Footer>
      </Modal>

      {/* Payment Request Modal */}
      <Modal show={show2} onHide={handleClose2} centered contentClassName="modal-glass border-0 shadow-lg" backdropClassName="glass-backdrop">
        <Modal.Header closeButton closeVariant="white" className="border-0 px-4 pt-4">
          <Modal.Title className="fw-bold text-white"><i className="fa-solid fa-indian-rupee-sign me-2 text-success"></i>Request Payment</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-2">
          <div className="d-flex flex-column gap-3">
            <input 
              type="text" 
              className="form-control border-0 text-white" 
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
              placeholder="Your UPI ID" 
              onChange={e => setPayment({ ...payment, upiid: e.target.value })} 
            />
            <input 
              type="number" 
              className="form-control border-0 text-white" 
              style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
              placeholder="Amount (INR)" 
              onChange={e => setPayment({ ...payment, amount: e.target.value })} 
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 px-4 pb-4 gap-2">
          <Button variant="secondary" className="rounded-pill px-4 border-0" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} onClick={handleClose2}>Cancel</Button>
          <Button variant="primary" className="rounded-pill px-4 border-0" onClick={sendPaymentReq}>Request Payment</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ActiveChatView;
