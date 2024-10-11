import React, { useState, useEffect } from 'react'
import { Row, Col, Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import './css/userHome.css'
import Recommendation from '../components/Recommendation';
import Home from '../components/Home';
import Search from '../components/css/search';
import Work from '../components/work';
import Message from '../components/Message';
import Profile from '../components/css/profile';
import { getData, postData } from '../apiServices/apiServices';
function LandingHome() {
    const id = JSON.parse(localStorage.getItem('user'))._id
    const [view, setView] = useState('home')
    const [loginedUser, setLoginedUser] = useState([])
    const [recom, setRecom] = useState([])

    const [render, setRender] = useState('')
    const navi = useNavigate()
    useEffect(() => {
        if (localStorage.getItem('user')) {
            if (localStorage.getItem('user') != '') {
                const id = JSON.parse(localStorage.getItem('user'))._id
                postData('user', { id })
                    .then(res => {
                        setLoginedUser(res.data)
                    })
            }
            else {
                localStorage.setItem('user', '')
                navi('/')
            }
        }
        else {
            localStorage.setItem('user', '')
            navi('/')
        }


        postData('recommend', { _id: JSON.parse(localStorage.getItem('user'))._id })
            .then(res => {
                setRecom(res.data)
                console.log(res.data)
            })


    }, [render])

    return (
        <div id='maindiv' className='w-100  text-center' style={{ height: '90vh' }}>
            <Row className='  ' >

                <Col id='lside' sm={3} className=' bg-light border-0   py-5 '>
                    <h3><i className="fa-solid fa-rocket fa-xl"></i>labourJet</h3>

                    <Row className='my-5 text-center '>
                        <Col sm={12} md={12} style={{ cursor: 'pointer' }} onClick={e => setView('home')} className='my-4'><span><i className="fa-solid fa-house text-black fa-lg"><span className=' ms-3' style={{ fontWeight: 'bold' }}>Home</span></i></span></Col>
                        <Col sm={12} md={12} style={{ cursor: 'pointer' }} onClick={e => setView('search')} className='my-4'><span><i className="fa-solid fa-magnifying-glass text-black fa-lg"><span className=' ms-3' style={{ fontWeight: 'bold' }}>Search</span></i></span></Col>
                        <Col sm={12} md={12} style={{ cursor: 'pointer' }} onClick={e => setView('work')} className='my-4'><span><i className="fa-solid fa-screwdriver-wrench text-black fa-lg"><span className=' ms-3' style={{ fontWeight: 'bold' }}>Works</span></i></span></Col>
                        <Col sm={12} md={12} style={{ cursor: 'pointer' }} onClick={e => setView('msg')} className='my-4'><span><i className="fa-regular fa-message text-black fa-lg"><span className=' ms-3' style={{ fontWeight: 'bold' }}>Message</span></i></span></Col>
                        <Col sm={12} md={12} style={{ cursor: 'pointer' }} onClick={e => setView('profile')} className='my-4'><span><i className="fa-regular fa-user text-black fa-lg"><span className=' ms-3' style={{ fontWeight: 'bold' }}>Profile</span></i></span></Col>

                    </Row>

                </Col>
                <div id='smnav' className=' w-100 p-3 bg-white  w-100 ' style={{ zIndex: 10 }}>
                    <Row className=' text-center '>
                        <Col className=''><span><i className="fa-solid fa-magnifying-glass text-black " onClick={e => setView('search')}></i></span></Col>
                        <Col className=''><span><i className="fa-solid fa-screwdriver-wrench text-black " onClick={e => setView('work')}></i></span></Col>
                        <Col className=''><Link to={'/landinghome'}><span><i className="fa-solid fa-house text-black fa-xl" onClick={e => setView('home')}></i></span></Link></Col>
                        <Col className=''><span><i className="fa-regular fa-message text-black " onClick={e => setView('msg')}></i></span></Col>
                        <Col className=''><span><i className="fa-regular fa-user text-black " onClick={e => setView('profile')}></i></span></Col>

                    </Row>
                </div>
                <Col id='scroller' sm={12} md={6} className=' bg-white   p-1 ' style={{ maxHeight: '100vh ', overflowX: 'hidden', overflowY: 'scroll' }}>

                    {
                        view == 'profile' ?
                            <Profile userData={loginedUser} render={setRender} />
                            : view == 'search' ? <Search userData={loginedUser} render={setRender} />
                                : view == 'work' ? <Work userData={loginedUser} render={setRender} />
                                    : view == 'msg' ? <Message userData={loginedUser} render={setRender} />
                                        : <Home userData={loginedUser} render={setRender} />
                    }


                </Col>


                <Col id='rside' sm={3} className='fixed text-center bg-white py-3 border-0 '>
                    {/* <div className=' bg-white p-4 w-100 rounded-1 text-center ' style={{height:'max-content'}}>
                <span><img className='img-fluid' style={{height:'auto',width:'60px'}} src="https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg" alt="" /><span className='ms-2 text-black fs-4' style={{fontWeight:'bold'}}>Najil Rahman Pm <Badge>User</Badge> </span></span>
            </div> */}

                    <div className='my-4 ' style={{ maxHeight: '93vh', overflow: 'hidden' }}>
                        <h5 className='mb-4'>Recommendation</h5>
                       {
                        recom.length>0?
                        recom.map(obj=>(
                            <Recommendation userData={obj} render={setRender}/>

                        ))
                        :''
                       }
                    </div>
                </Col>
            </Row>
        </div>
    )
}

export default LandingHome
