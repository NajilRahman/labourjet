import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthNavbar from '../components/authNavbar';
import { Button, Col,Row } from 'react-bootstrap';
import { postData } from '../apiServices/apiServices';
import toast from 'react-hot-toast';
import Loading from '../components/spinner';

const Login = () => {
  const [forgot,setForgot]=useState(true)
  const [code,setCode]=useState(true)
  const [changePass,setChangePass]=useState(true)
  const [loginData,setLoginData]=useState({email:'',password:''})
  const navi=useNavigate()
  const [loading,setLoading]=useState(false)

  const login=()=>{
    setLoading(true)
    postData('userLogin',loginData)
    .then(res=>{
      localStorage.setItem('user',JSON.stringify(res.data))
      setLoading(false)
      toast.success('loagined succesfully')
      navi('/landinghome')
    })
    .catch(err=>{
      toast.error(err.response.data)
      setLoading(false)
    })
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
                  : <form>

                  {/* user login */}
                   {
                      forgot?
                       <>
                         <div data-mdb-input-init className="form-outline mb-4">
                         <input type="email" id="form3Example3" className="form-control" value={loginData.email} onChange={(e)=>setLoginData({...loginData,email:e.target.value})}/>
                         <label className="form-label" htmlFor="form3Example3">Email address</label>
                         </div>
                         <div data-mdb-input-init className="form-outline mb-4">
                         <input type="password" id="form3Example4" className="form-control" value={loginData.password} onChange={(e)=>setLoginData({...loginData,password:e.target.value})} />
                         <label className="form-label" htmlFor="form3Example4">Password</label>
                       </div>
                       <button onClick={e=>{e.preventDefault();login()}}  className="btn w-100 btn-primary text-center btn-block mb-4">
                         Login
                       </button>
                       </>
                     
                     :''
                     }
 
 
                     {/* Forgot password */}
 
                     {
                       !code?
                     <>
                         <Row>
                           <Col sm={9}>
                             <div data-mdb-input-init className="form-outline mb-4">
                               <input type="email" id="form3Example3" className="form-control" />
                               <label className="form-label" htmlFor="form3Example3">Email address</label>
                               </div>
                           </Col>
                           <Col>
                           <button   data-mdb-button-init data-mdb-ripple-init className="btn w-100 btn-primary text-center btn-block mb-4">
                         Get
                       </button>
                           </Col>
                         </Row>
                           <div data-mdb-input-init className="form-outline mb-4">
                           <input type="number" id="form3Example322" className="form-control" />
                           <label className="form-label" htmlFor="form3Example322">Code</label>
                           </div>
                         <button  onClick={e=>{setCode(!code);setChangePass(!changePass)}}  data-mdb-button-init data-mdb-ripple-init className="btn w-100 btn-primary text-center btn-block mb-4">
                         Confirm Code
                       </button>
                     </>
                     :''
                     }
 
 
                     {/* Change password */}
 
                     {
                       !changePass?
                       <>
                         <div data-mdb-input-init className="form-outline mb-4">
                             <input type="number" id="form3Example3221" className="form-control" />
                             <label className="form-label" htmlFor="form3Example3221">Password</label>
                             </div>
                             <div data-mdb-input-init className="form-outline mb-4">
                             <input type="number" id="form3Example3222" className="form-control" />
                             <label className="form-label" htmlFor="form3Example3222">Comfirm Password</label>
                             </div>
                             <button onClick={e=>{setChangePass(!changePass);setForgot(!forgot)}}  data-mdb-button-init data-mdb-ripple-init className="btn w-100 btn-primary text-center btn-block mb-4">
                         Change Password
                       </button>
                       </>
                       :''
                     }
 
                     
 
                    
                     
                     
 
                     
                    
   
                     {
                       forgot?<div className="row mt-3">
                       <Link to={'/userRegister'}style={{textDecoration:'none'}} className="col-6 text-start "> <p>New User ?</p></Link>
                       <div style={{textDecoration:'none',cursor:'pointer'}} className="col-6 text-end "> <p  onClick={e=>{setForgot(!forgot);setCode(!code)}}>Forgot Password ?</p></div>
                          </div>
                       :''   
                     }
                     {/* <div className="text-center">
                       <p>or sign up with:</p>
                       <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                         <i className="fab fa-facebook-f"></i>
                       </button>
   
                       <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                         <i className="fab fa-google"></i>
                       </button>
   
                       <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                         <i className="fab fa-twitter"></i>
                       </button>
   
                       <button type="button" data-mdb-button-init data-mdb-ripple-init className="btn btn-link btn-floating mx-1">
                         <i className="fab fa-github"></i>
                       </button>
                     </div> */}
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

export default Login;
