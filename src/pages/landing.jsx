import React from 'react'
import Card from 'react-bootstrap/Card';
import card1 from '../assets/images/card1.png';
import card2 from '../assets/images/card2.png';
import card3 from '../assets/images/card3.png';
import futuristicHero from '../assets/images/futuristic_hero.png';
import { Row, Col, Container, } from 'react-bootstrap'
import Header from '../components/navbar';
import Footer from '../components/footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ThreeDNetwork from '../components/ThreeDNetwork';
import TalentShowcase from '../components/TalentShowcase';

function Landing() {
  const navi=useNavigate()
  useEffect(() => {
   if(localStorage.getItem('user'))
   {
     if(localStorage.getItem('user')!='')
     {
     navi('/landinghome')
   }
  }
  
  }, [])
  return (
   <>
         <Header/>
      <div className='  mb-5  ' style={{ minHeight: '80vh ' }}>
        <Container className='py-4'>
          <Row className='d-flex align-items-center justify-content-between my-4'>
            <Col lg={6} md={12} className='text-start mb-4 mb-lg-0'>
              <h1 className='display-4 fw-bold mb-3' style={{ letterSpacing: '-0.03em', lineHeight: '1.15' }}>
                The Next-Gen <span style={{ textShadow: '0 0 15px rgba(110, 140, 183, 0.35)' }}>Talent Network</span>
              </h1>
              <p className='lead mb-4' style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: '1.6' }}>
                LabourJet connects freelance specialists and companies inside a decentralized, high-speed 3D network. Tap into automated matches, secure contracts, and real-time collaboration.
              </p>
              <div className='d-flex gap-3'>
                <button className='btn btn-primary' onClick={() => navi('/Login')}>Get Started</button>
                <button className='btn btn-light' onClick={() => navi('/UserRegister')}>Register</button>
              </div>
            </Col>
            <Col lg={5} md={12}>
              <ThreeDNetwork />
            </Col>
          </Row>
        </Container>

        <Container className='my-5'>
          <TalentShowcase />
        </Container>
      <h1 className='text-center mt-5' id='services'>What We Provide ..?</h1>
        <Container className='mb-3 p-5 border-0 text-center' style={{ minHeight: '50vh' }}>
          <Row className='d-flex justify-content-center align-items-center'>
            <Col className='text-center mb-2'>
              <Card >
                <Card.Img variant="top" src={card1} />
                <Card.Body>
                  <Card.Title>Online Job Hunt</Card.Title>
                  <Card.Text>
                    Browse dynamic career opportunities and seamlessly apply to listings.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
  
            <Col className='text-center mb-2'>
              <Card >
                <Card.Img variant="top" src={card2} />
                <Card.Body>
                  <Card.Title>Search Jobs</Card.Title>
                  <Card.Text>
                    Filter jobs by role, location, and specialized skill requirements.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
  
  
            <Col className='text-center mb-2'>
              <Card >
                <Card.Img variant="top" src={card3} />
                <Card.Body>
                  <Card.Title>Search Employees</Card.Title>
                  <Card.Text>
                    Find and recruit top-verified employees tailored to your project goals.
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
  
  
        <Container className='text-center my-5' id='about'>
          <h1 className='my-5'>About Us</h1>
          <p className='mb-5'>Introducing LabourJet, an innovative online platform that seamlessly connects job seekers with employers. Employees can create detailed profiles showcasing their skills and experience, while employers can easily search for talent based on specific criteria. With a user-friendly interface, job seekers can browse a variety of listings, from entry-level to executive roles, enhancing their chances of finding the perfect opportunity. The platform also features real-time chat, video interviews, and a rating system to foster trust. Additionally, LabourJet offers resources like resume-building tools and interview tips, empowering users to present themselves effectively. Whether you’re looking to hire or seeking your next career move, LabourJet is your go-to resource for all things employment.</p>
        </Container>
      </div>
      <Footer/>

   </>
  )
}

export default Landing