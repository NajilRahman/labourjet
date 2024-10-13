import React, { useState } from 'react';
import { Button, Col, Row,Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {postData} from '../apiServices/apiServices'
import AuthNavbar from '../components/authNavbar';
const EmployeeRegister = () => {
    const [skills,setSkills]=useState([])
    const [skill,setSkill]=useState('')
    const [jobType,setJobType]=useState(false)
    const [form,setForm]=useState({userName:'',email:'',phone:'',password:'',jobRole:'',idCard:'',education:'',state:'',postal:'',documents:'',approvel:'rejected',userType:'employee'})

    const updateDoc= (e) => {
        const file = e.target.files[0];
        const reader = new FileReader;
        reader.readAsDataURL(file);
        reader.onload = () => {
          setForm({ ...form, documents: reader.result })
        }
    }
    const updateidCard= (e) => {
        const file = e.target.files[0];
        const reader = new FileReader;
        reader.readAsDataURL(file);
        reader.onload = () => {
          setForm({ ...form, idCard: reader.result })
        }
    }

    const EmployeeLogin=()=>{
        postData('employeeReg',form)
        .then(res=>{
            console.log(res.data)
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
                                    <form>
                                        <Row className='text-center mb-3'>
                                        <Col><button className='btn fs-5 ' style={{backgroundColor:'tranparent',textDecoration:jobType==false?'underline':'none'}}  onClick={(e)=>{e.preventDefault();setJobType(false)}}>Skilled Job</button></Col>
    
                                        <Col><button className='btn fs-5 ' style={{backgroundColor:'tranparent',cotextDecorationlor:jobType==true?'underline':'none'}} onClick={(e)=>{e.preventDefault();setJobType(true)}}>Certified Job</button></Col>
    
                                        </Row>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="text" id="form3Example222323" className="form-control" value={form.userName} onChange={e=>setForm({...form,userName:e.target.value})}/>
                                            <label className="form-label" htmlFor="form3Example222323">userName</label>
                                        </div>

                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="email" id="form3Example3" className="form-control" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
                                            <label className="form-label" htmlFor="form3Example3">Email address</label>
                                        </div>
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="number" id="form4Example4" className="form-control" value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/>
                                            <label className="form-label" htmlFor="form4Example4">Phone</label>
                                        </div>
    
                                        <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="password" id="form3Example11" className="form-control" autocomplete value={form.password} onChange={e=>setForm({...form,password:e.target.value})}/>
                                            <label className="form-label" htmlFor="form3Example11">Password</label>
                                        </div>
    
                                       <Row>
                                         {
                                            jobType==true?   
                                            <>
                                            <Col sm={12} md={6}>
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <input type="file" id="form3Example21" className="form-control"  onChange={e=>updateDoc(e)}/>
                                                    <label className="form-label  " htmlFor="form3Example21">Upload Documents Or Certificate</label>
                                                </div>
                                            </Col>
                                           
                                            </>
                                        :<></>
                                         }
                                          <Col sm={12} md={6}>
                                             <div data-mdb-input-init className="form-outline mb-4">
                                             <input type="text" id="form3Example2321" className="form-control" value={form.jobRole} onChange={e=>setForm({...form,jobRole:e.target.value})}/>
                                             <label className="form-label  " htmlFor="form3Example2321">Job Role</label>
                                         </div>
                                         </Col>
                                            <Col sm={12} md={6}>
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <input type="file" id="form3Example21" className="form-control"  onChange={e=>updateidCard(e)}/>
                                                    <label className="form-label  " htmlFor="form3Example21">Upload Id Card</label>
                                                </div>
                                            </Col>
                                            <Col>
                                            <div data-mdb-input-init className="form-outline mb-4">
                                            <input type="higher Education" id="form3Example31" className="form-control"  value={form.education} onChange={e=>setForm({...form,education:e.target.value})}/>
                                            <label className="form-label" htmlFor="form3Example31">Higher Education</label>
                                        </div>
                                            </Col>
                                       </Row>
    
    
                                        <Row>
                                            <Col>
                                                <select id="inputState" className="form-select" value={form.state} onChange={e=>setForm({...form,state:e.target.value})}>
                                                    <option selected>Choose...</option>
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
    
                                            <Col>
                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <input type="Number" id="form3Example6" className="form-control" value={form.postal} onChange={e=>setForm({...form,postal:e.target.value})}/>
                                                    <label className="form-label" htmlFor="form3Example6">Postal</label>
                                                </div>
                                            </Col>
    
    
                                        </Row>
                                       
    
    
                                        <button  data-mdb-button-init data-mdb-ripple-init className="btn w-100 btn-primary btn-block mt-2 mb-4" onClick={e=>{e.preventDefault(); EmployeeLogin()}}>
                                            Sign up
                                        </button>
                                        <div className="mt-3">
                                            <Link to={'/Login'} style={{ textDecoration: 'none' }} className="col-6 text-end "> <p>Already have an account ?</p></Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EmployeeRegister;
