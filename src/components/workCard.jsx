import React, { useEffect, useState } from 'react';
import { Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { postData } from '../apiServices/apiServices';
import { toast } from 'react-hot-toast';
import io from 'socket.io-client';

const WorkCard = ({ workData, render }) => {
    const id = JSON.parse(localStorage.getItem('user'))._id;
    const client = workData.recid == id ? workData.senderid : workData.recid;
    const [oppoUser, setOppoUser] = useState({});
    const [rating, setRating] = useState(workData?.rating);
    const [status, setStatus] = useState(workData.status);

    // socket for realtime work status updates
    const socket = io(import.meta.env.VITE_SOCKET_URL || 'https://labourjetbackend-zcymk750.b4a.run/');
    useEffect(() => {
        // join the chat room associated with this work item
        if (workData.chatid) socket.emit('joinChat', workData.chatid);
        socket.on('workStatusUpdated', ({ workid, status: newStatus }) => {
            if (workid === workData._id) {
                setStatus(newStatus);
                // optionally trigger parent refresh
                render && render();
            }
        });
        return () => {
            socket.disconnect();
        };
    }, [workData.chatid, workData._id]);

    useEffect(() => {
        postData('user', { id: client })
            .then(res => {
                setOppoUser(res.data);
            });
    }, []);

    const sendRating = (value) => {
        setRating(value);
        postData('setRating', { _id: workData._id, rating: value })
            .then(res => {
                toast.success('Rating Updated');
                render(res.data);
            });
    };

    const workStatusUpdate = (req) => {
        if (req === 'Approve') {
            postData('workStatusUpdate', { status: 'Approved', chatid: workData.chatid, workid: workData._id })
                .then(res => {
                    toast.success('Work Approved');
                    render(res.data);
                });
        } else {
            postData('workStatusUpdate', { status: 'Rejected', chatid: workData.chatid, workid: workData._id })
                .then(res => {
                    toast.success('Work Rejected');
                    render(res.data);
                });
        }
    };

    const workStatusUpdate1 = (req) => {
        postData('workStatusUpdate', { status: req, chatid: workData.chatid, workid: workData._id })
            .then(res => {
                toast.success('Work Completed');
                render(res.data);
            });
    };


    return (
        <section className="wrapper my-3 ">
            <div className=" mb-4 ">
                <div className="card shadow" >
                    <div className="card-body">
                        <div className="text-black fs-3 " ><p>{workData.workName}</p></div>

                        <p className="card-title mt-0">
                            <small className="card-meta mb-2">{workData.description}</small>

                        </p>
                        <small><i className="far fa-clock me-2"></i> {workData.workdate}</small>
                    </div>
                    <div className="card-footer">

                        <div className=' bg-light border-2 mb-2 p-4  w-100 rounded-1 text-center  ' style={{ height: 'max-content' }}>
                            <Row>
                                <Col sm-12><img className='img-fluid rounded-pill' style={{ height: '60px', width: '60px' }} src={oppoUser.imgUrl} alt="" /></Col>

                                <Col sm={12} className='ms-2 text-black '>{oppoUser.userName}{oppoUser.userType == 'employee' ? <svg className='ms-2' style={{ width: '30px' }} id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m256 512c-66.012-37.684-225-151.29-225-377.76v-73.14h15c34.673 1.377 118.623-.163 201.68-55.548l8.32-5.552 8.32 5.552c83.159 55.444 167.314 56.779 199.424 55.607l17.256-.159v73.24c0 267.383-221.99 374.756-225 377.76z" fill="#f0f7ff" /></g><path d="m481 134.24v-73.24l-17.256.159c-32.109 1.172-116.265-.163-199.424-55.607l-8.32-5.552v512c3.01-3.005 225-110.379 225-377.76z" fill="#c7cfe1" /><g><g><path d="m256 443.38c-2.617-3-165-99.914-165-309.141v-13.374l13.286-2.432c50.859-5.874 99.507-21.196 144.58-45.571l7.134-3.852 7.134 3.853c45.073 24.375 93.721 39.697 144.58 45.571l13.286 1.524v13.374c0 205.199-162.252 306.898-165 310.048z" fill="#7ed8f6" /></g></g><path d="m421 133.332v-13.374l-13.286-1.523c-50.859-5.874-99.507-21.196-144.58-45.571l-7.134-3.854v374.37c2.748-3.151 165-104.849 165-310.048z" fill="#4895ff" /><g id="Shield_2_"><g><path d="m241 307.311-55.605-55.605 21.21-21.211 34.395 34.394 79.395-79.394 21.21 21.211z" fill="#f0f7ff" /></g></g><path d="m256 292.311 85.605-85.605-21.21-21.211-64.395 64.394z" fill="#c7cfe1" /></g></svg> : ''} </Col>
                                <Col sm={6}><Link to={`/user/${client}`}><button className='btn btn-info p-1 mt-3 w-100' >View</button></Link></Col>
                                <Col sm={6}><Link to={`/message/${workData.chatid}`}><button className='btn btn-success p-1 mt-3 w-100' >Message</button></Link></Col>

                            </Row>

                        </div>
                        {
                            client != workData.senderid ?
                                <Row>
                                    <Col>
                                       
                                        <span className='my-5'><span>Work Status :</span> <span className={`badge bg-${status === 'Approved' ? 'info' : status === 'Rejected' ? 'danger' : status === 'completed' ? 'success' : 'warning'}`} style={{ cursor: 'default', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>{status}</span></span>

                                    </Col>
                                    
                                     {
                                          workData.status=='completed'?<Col sm={12} className='my-3'>
                                          <button  className='btn btn-white p-2' onClick={e=>sendRating(1)}><i className={`fa-solid fa-star ${rating>0?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2' onClick={e=>sendRating(2)}><i className={`fa-solid fa-star ${rating>1?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2' onClick={e=>sendRating(3)}><i className={`fa-solid fa-star ${rating>2?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2' onClick={e=>sendRating(4)}><i className={`fa-solid fa-star ${rating>3?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2' onClick={e=>sendRating(5)}><i className={`fa-solid fa-star ${rating>4?'text-warning':''}`}></i></button>
                                      </Col>
                                      :''
                                     
                                     }
                                </Row>
                                 : <>
                                    <Row>
                                        <Col sm={12} className='mb-3'>
                                            <span>      <span>Work Status :</span> <span className={`badge bg-${status === 'Approved' ? 'info' : status === 'Rejected' ? 'danger' : status === 'completed' ? 'success' : 'warning'}`} style={{ cursor: 'default', transition: 'transform 0.2s' }} onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'} onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>{status}</span></span>
                                        </Col>
                                        {

                                            workData.status == 'Approved' ? <Col sm={12}>
                                                <button className='btn btn-success my-2 ' onClick={e => workStatusUpdate1('completed')}>Completed</button>
                                            </Col> : ''
                                        }

                                        {
                                            workData.status == 'pending' ?
                                                <>

                                                    <Col>
                                                        <button className='btn btn-danger mb-3 w-100' onClick={e => workStatusUpdate('Reject')}>Reject</button>
                                                    </Col>
                                                    <Col><button className='btn btn-success w-100' onClick={e => workStatusUpdate('Approve')}>Approve</button></Col>
                                                </>
                                                : <></>
                                        }

{ 
                                         workData.status=='completed'?<Col sm={12} className='my-3'>
                                        <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>0?'text-warning':''}`}></i></button>
                                        <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>1?'text-warning':''}`}></i></button>
                                        <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>2?'text-warning':''}`}></i></button>
                                        <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>3?'text-warning':''}`}></i></button>
                                        <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>4?'text-warning':''}`}></i></button>
                                    </Col>
                                    :''
                                    }

                                    </Row>
                                </>
                        }

                    </div>
                </div>
            </div>
        </section>

    );
};

export default WorkCard;
