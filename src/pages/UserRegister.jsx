import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import AuthNavbar from '../components/authNavbar';
import { postData } from '../apiServices/apiServices';
import toast from 'react-hot-toast';
import Loading from '../components/spinner';
const UserRegister = () => {
  const [loading,setLoading]=useState(false)
  const [userData,setUserData]=useState({email:'',phone:'',password:'',postal:'',state:'',userName:'',userType:'user'})
  const navi=useNavigate()
  const userReg=()=>{
   if(userData.email.includes('@gmail.com'))
   {
    if(userData.email!=""&&userData.phone!=""&&userData.password!=""&&userData.postal!=""&&userData.state!=""&&userData.userName!='')
      {
        setLoading(true)
        postData('userReg',userData)
      .then(res=>{
        setLoading(false)
       toast.success('Registration Completed')
        navi('/login')
       
      })
      .catch(err=>{
        toast.error('Registration Failed Check Email')
        setLoading(false)
  
      })
      }
      else{
        toast.error('Check all Inputs')
      }
   }
   else{
    toast.error('Enter Correct Email')
   }
  }
  return (
    <>
        <AuthNavbar/>
      <section className="background-radial-gradient overflow-hidden">
        <style>{`
          .background-radial-gradient {
            background-color: hsl(218, 41%, 15%);
            background-image: radial-gradient(650px circle at 0% 0%,
                hsl(218, 41%, 35%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%),
              radial-gradient(1250px circle at 100% 100%,
                hsl(218, 41%, 45%) 15%,
                hsl(218, 41%, 30%) 35%,
                hsl(218, 41%, 20%) 75%,
                hsl(218, 41%, 19%) 80%,
                transparent 100%);
          }
  
          #radius-shape-1 {
            height: 220px;
            width: 220px;
            top: -60px;
            left: -130px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }
  
          #radius-shape-2 {
            border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
            bottom: -60px;
            right: -110px;
            width: 300px;
            height: 300px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }
  
          .bg-glass {
            background-color: hsla(0, 0%, 100%, 0.9) !important;
            backdrop-filter: saturate(200%) blur(25px);
          }
        `}</style>
  
        <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div className="row gx-lg-5 align-items-center mb-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: 'hsl(218, 81%, 95%)' }}>
                The best place <br />
                <span style={{ color: 'hsl(218, 81%, 75%)' }}>To Grow Your Self</span>
              </h1>
              <p className="mb-4 opacity-70" style={{ color: 'hsl(218, 81%, 85%)' }}>
                At Labour Jet, we believe in the power of self-growth and continuous learning. Our platform is designed to empower individuals to enhance their skills, explore new opportunities, and connect with like-minded professionals. Whether you’re seeking to advance your career or discover your passions, Labour Jet provides the resources and community support you need to thrive. Join us on this journey of personal and professional development, and unlock your full potential today!
              </p>
            </div>
  
            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
  
              <div className="card bg-glass">
                <div className="card-body px-4 py-5 px-md-5">
                 {
                  loading?<div className='d-flex justify-content-center align-items-center' style={{height:'30vh'}}><Loading/></div>
                  : <form >
                  <div data-mdb-input-init className="form-outline mb-4">
                      <input type="text" id="form3Example2233" className="form-control" value={userData.userName}  onChange={e=>setUserData({...userData,userName:e.target.value})}/>
                      <label className="form-label" htmlFor="form3Example2233">userName</label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="email" id="form3Example3" className="form-control" value={userData.email}  onChange={e=>setUserData({...userData,email:e.target.value})}/>
                      <label className="form-label" htmlFor="form3Example3">Email address</label>
                    </div>
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="number" id="form4Example4" className="form-control" value={userData.phone}  onChange={e=>setUserData({...userData,phone:e.target.value})} />
                      <label className="form-label" htmlFor="form4Example4">Phone</label>
                    </div>
  
                    <div data-mdb-input-init className="form-outline mb-4">
                      <input type="password" id="form3Example5" autocomplete className="form-control" value={userData.password}  onChange={e=>setUserData({...userData,password:e.target.value})}/>
                      <label className="form-label" htmlFor="form3Example5" >Password</label>
                    </div>
  
  
                   <Row>
                      <Col>
                        <div data-mdb-input-init className="form-outline mb-4">
                          <input type="Number" id="form3Example6" className="form-control" value={userData.postal}  onChange={e=>setUserData({...userData,postal:e.target.value})} />
                          <label className="form-label" htmlFor="form3Example6">Postal</label>
                        </div>
                      </Col>
                      <Col>
          <select id="inputState" className="form-select"   onChange={e=>setUserData({...userData,state:e.target.value})}>
          <option value="Andhra Pradesh">Andhra Pradesh</option>
        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
        <option value="Assam">Assam</option>
        <option value="Bihar">Bihar</option>
        <option value="Chhattisgarh">Chhattisgarh</option>
        <option value="Goa">Goa</option>
        <option value="Gujarat">Gujarat</option>
        <option value="Haryana">Haryana</option>
        <option value="Himachal Pradesh">Himachal Pradesh</option>
        <option value="Jharkhand">Jharkhand</option>
        <option value="Karnataka">Karnataka</option>
        <option value="Kerala">Kerala</option>
        <option value="Madhya Pradesh">Madhya Pradesh</option>
        <option value="Maharashtra">Maharashtra</option>
        <option value="Manipur">Manipur</option>
        <option value="Meghalaya">Meghalaya</option>
        <option value="Mizoram">Mizoram</option>
        <option value="Nagaland">Nagaland</option>
        <option value="Odisha">Odisha</option>
        <option value="Punjab">Punjab</option>
        <option value="Rajasthan">Rajasthan</option>
        <option value="Sikkim">Sikkim</option>
        <option value="Tamil Nadu">Tamil Nadu</option>
        <option value="Telangana">Telangana</option>
        <option value="Tripura">Tripura</option>
        <option value="Uttar Pradesh">Uttar Pradesh</option>
        <option value="Uttarakhand">Uttarakhand</option>
        <option value="West Bengal">West Bengal</option>
  
          </select>
          <label htmlFor="inputState" className="form-label">State</label>
  
                      </Col>
                   </Row>
                    
  
                    <button onClick={e=>{e.preventDefault();userReg()}}  className="btn w-100 btn-primary btn-block mb-4">
                      Sign up
                    </button>
                    <div className="mt-3">
                   <Link to={'/Login'}style={{textDecoration:'none'}} className="col-6 text-end "> <p>Already Have An Account ?</p></Link>
                      </div>
                  </form>
                 }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserRegister;
