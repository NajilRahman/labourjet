import React, { useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import toast from 'react-hot-toast';

import { useNavigate } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';
import Statitics from '../components/admin/Statitics';
import EmployeeMng from '../components/admin/EmployeeMng';
import UserMng from '../components/admin/userMng';
import { getData } from '../apiServices/apiServices';
import Loading from '../components/spinner';
function AdminHome() {
    const navi=useNavigate()

    const [state,setState]=useState('dash')
    const [user,setUser]=useState([])
    const [render,setRender]=useState('')
    const [loading,setLoading]=useState(true)

    useEffect(() => {
     getData('getallusers')
     .then(res=>{
        console.log(res.data)
        setUser(res.data)
        setLoading(false)
     })
     .catch(err=>{
        console.log(err)
     })
    }, [render])
    
    return (
        <div>
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary shadow">
            <Container>
                <Navbar.Brand href="/">Admin Panel</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">


                    </Nav>
                    <Nav>
                        <button className='btn btn-danger' onClick={e => {
                            navi('/')
                            toast.success('logged out')
                            localStorage.setItem('user', '')
                        }}>Logout</button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
           {
            loading?
           <div className='d-flex justify-content-center align-items-center ' style={{height:'90vh'}}> <Loading /></div>
            :
        
        <Row>
            <Col sm={2} className='shadow d-flex justify-content-center align-items-center' style={{height:'86vh'}}>
                        <div>
                            <button className='btn btn-light w-100 my-3 ' onClick={()=>setState('dash')}>Dashboard</button>
                            <button className='btn btn-light w-100 my-3 ' onClick={()=>setState('emp')}>Employee Managment</button>
                            <button className='btn btn-light w-100 my-3 ' onClick={()=>setState('user')}>User Managment</button>
                            <button className='btn btn-light w-100 my-3 ' onClick={()=>setState('stat')}>Statitics</button>
                        </div>

            </Col>
            <Col sm={10} className='py-4  px-4' style={{height:'86vh',overflowX:'hidden',overflowY:'scroll'}}>
            {
                state=='dash'||state=='dash'?
                <>
                    <Statitics data={user} setRender={setRender}/>
                    <EmployeeMng data={user} setRender={setRender}/>
                    <UserMng data={user} setRender={setRender}/>
    
                </>
                :state=='dash'||state=='emp'?
                <EmployeeMng data={user} setRender={setRender}/>
                :state=='dash'||state=='user'?
                <UserMng data={user} setRender={setRender}/>
                :state=='dash'||state=='stat'?
                <Statitics data={user} setRender={setRender}/>
                :''

            }

            </Col>
        </Row>

           }
        </div>
    )
}

export default AdminHome
