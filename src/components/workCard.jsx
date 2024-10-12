import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { postData } from '../apiServices/apiServices';
const WorkCard = ({workData}) => {
    const id=JSON.parse(localStorage.getItem('user'))._id

    const client=workData.recid==id?workData.senderid:workData.recid
    const [oppoUser,setOppoUser]=useState({})
    useEffect(()=>{
        postData('user',{id:client})
        .then(res=>{
            setOppoUser(res.data)
        })
    },[])
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

                                <Col sm={12} className='ms-2 text-black '>{oppoUser.userName}</Col>
                                <Col sm={6}><Link to={`/user/${client}`}><button className='btn btn-info p-1 mt-3 w-100' >View</button></Link></Col>
                                <Col sm={6}><Link to={`/message/${workData.chatid}`}><button className='btn btn-success p-1 mt-3 w-100' >Message</button></Link></Col>

                            </Row>
                           
                        </div>
                        {
                                client!=workData.senderid?
                                                 <span className='my-5'>      <span>Work Status :</span>       <button className={`btn ${workData.status=='Approved'?`btn-success`:workData.status=='Rejected'?`btn-danger`:'btn-warning'}`}>{workData.status}</button></span>
                                :<>
                                <Row>
                            <Col sm={12} className='mb-3'>                   <span>      <span>Work Status :</span>       <button className={`btn ${workData.status=='Approved'?`btn-success`:workData.status=='Rejected'?`btn-danger`:'btn-warning'}`}>{workData.status}</button></span>
                            </Col>
                     <Col> <button className='btn btn-danger my-2 'onClick={e=>workStatusUpdate('Reject')}>Reject</button></Col>
                     <Col>
                     <button className='btn btn-success my-2 ' onClick={e=>workStatusUpdate('Approve')}>Approve</button>
                   </Col>
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
