import React from 'react'
import Card from 'react-bootstrap/Card';
import card1 from '../assets/images/card1.png';
import card2 from '../assets/images/card2.png';
import card3 from '../assets/images/card3.png';
import { Row, Col, Container, } from 'react-bootstrap'
import Header from '../components/navbar';
import Footer from '../components/footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
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
        
          <img className='img-fluid w-100 ' src='https://static.vecteezy.com/system/resources/previews/024/123/842/non_2x/set-of-illustrations-men-and-women-workers-from-different-professions-wearing-professional-uniforms-happy-labor-day-concept-vector.jpg'></img>
      <h1 className='text-center mt-5' id='services'>What We Provide ..?</h1>
        <Container className='mb-3 p-5 border-0 text-center' style={{ minHeight: '50vh' }}>
          <Row className='d-flex justify-content-center align-items-center'>
            <Col className='text-center mb-2'>
              <Card >
                <Card.Img variant="top" src={card1} />
                <Card.Body>
                  <Card.Title>Online Job Hunt</Card.Title>
                  <Card.Text>
                    Search for job oppertunities and search employeers
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
                    Search for job oppertunities and search employeers
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
                    Search for job oppertunities and search employeers
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
  
  
        <Container className='text-center my-5' id='about'>
          <h1 className='my-5'>About Us</h1>
          <p className='mb-5'>Introducing JobConnect, an innovative online platform that seamlessly connects job seekers with employers. Employees can create detailed profiles showcasing their skills and experience, while employers can easily search for talent based on specific criteria. With a user-friendly interface, job seekers can browse a variety of listings, from entry-level to executive roles, enhancing their chances of finding the perfect opportunity. The platform also features real-time chat, video interviews, and a rating system to foster trust. Additionally, JobConnect offers resources like resume-building tools and interview tips, empowering users to present themselves effectively. Whether you’re looking to hire or seeking your next career move, JobConnect is your go-to resource for all things employment.</p>
        </Container>
      </div>
      <Footer/>

   </>
  )
}

export default Landing