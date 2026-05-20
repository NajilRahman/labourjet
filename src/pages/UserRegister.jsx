import React, { useState } from 'react';
import { Col, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import AuthNavbar from '../components/authNavbar';
import { postData } from '../apiServices/apiServices';
import toast from 'react-hot-toast';
import Loading from '../components/spinner';

const UserRegister = () => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    phone: '',
    password: '',
    postal: '',
    state: 'Andhra Pradesh',
    userName: '',
    userType: 'user'
  });
  const [step, setStep] = useState('register');
  const [otp, setOtp] = useState('');
  const navi = useNavigate();

  const userReg = () => {
    if (userData.email.includes('@gmail.com')) {
      if (
        userData.email !== '' &&
        userData.phone !== '' &&
        userData.password !== '' &&
        userData.postal !== '' &&
        userData.state !== '' &&
        userData.userName !== ''
      ) {
        setLoading(true);
        postData('sendRegisterOTP', userData)
          .then(res => {
            setLoading(false);
            toast.success('OTP sent to email');
            setStep('otp');
          })
          .catch(err => {
            toast.error('Failed to send OTP');
            setLoading(false);
          });
      } else {
        toast.error('Check all inputs');
      }
    } else {
      toast.error('Enter correct email');
    }
  };

  const verifyOtpAndRegister = () => {
    if (!otp) {
      return toast.error('Enter OTP');
    }
    setLoading(true);
    postData('verifyRegisterAndCreate', { email: userData.email, otp })
      .then(res => {
        setLoading(false);
        toast.success('Registration Completed');
        navi('/login');
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response?.data || 'OTP verification failed');
      });
  };

  return (
    <>
      <AuthNavbar />
      <section className="d-flex align-items-center justify-content-center py-5 fade-in-up" style={{ minHeight: '90vh' }}>
        <div className="container px-4 px-md-5 text-center text-lg-start">
          <div className="row gx-lg-5 align-items-center my-5">
            <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="display-4 fw-bold mb-4 ls-tight">
                Join Next-Gen <br />
                <span className="text-gradient">Talent Network</span>
              </h1>
              <p className="lead mb-4" style={{ color: 'var(--text-secondary)' }}>
                Create a user account to find skilled employee specialists, hire vetted workforce in minutes, manage tasks, and streamline your operations on the fly.
              </p>
            </div>

            <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div className="card bg-glass border-0 shadow-lg p-4">
                <div className="card-body">
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '30vh' }}>
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <form>
                      {step === 'register' ? (
                        <>
                          <h3 className="mb-4 text-start font-weight-bold">Register User</h3>
                          <div className="mb-4 text-start">
                            <label className="form-label">User Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="johndoe"
                              value={userData.userName}
                              onChange={e => setUserData({ ...userData, userName: e.target.value })}
                            />
                          </div>
                          <div className="mb-4 text-start">
                            <label className="form-label">Email Address</label>
                            <input
                              type="email"
                              className="form-control"
                              placeholder="name@example.com"
                              value={userData.email}
                              onChange={e => setUserData({ ...userData, email: e.target.value })}
                            />
                          </div>
                          <div className="mb-4 text-start">
                            <label className="form-label">Phone Number</label>
                            <input
                              type="number"
                              className="form-control"
                              placeholder="9876543210"
                              value={userData.phone}
                              onChange={e => setUserData({ ...userData, phone: e.target.value })}
                            />
                          </div>
                          <div className="mb-4 text-start">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="••••••••"
                              value={userData.password}
                              onChange={e => setUserData({ ...userData, password: e.target.value })}
                            />
                          </div>
                          <Row className="mb-4">
                            <Col className="text-start">
                              <label className="form-label">Postal Code</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="682001"
                                value={userData.postal}
                                onChange={e => setUserData({ ...userData, postal: e.target.value })}
                              />
                            </Col>
                            <Col className="text-start">
                              <label className="form-label">State</label>
                              <select
                                className="form-select"
                                value={userData.state}
                                onChange={e => setUserData({ ...userData, state: e.target.value })}
                              >
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
                            </Col>
                          </Row>
                          <button
                            onClick={e => { e.preventDefault(); userReg(); }}
                            className="btn w-100 btn-primary text-center mb-4"
                          >
                            Request OTP
                          </button>
                        </>
                      ) : (
                        <>
                          <h3 className="mb-4 text-start font-weight-bold">Verification</h3>
                          <div className="mb-4 text-start">
                            <label className="form-label">Enter OTP Code</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter 6-digit OTP"
                              value={otp}
                              onChange={e => setOtp(e.target.value)}
                            />
                          </div>
                          <button
                            onClick={e => { e.preventDefault(); verifyOtpAndRegister(); }}
                            className="btn w-100 btn-primary text-center mb-4"
                          >
                            Verify OTP & Register
                          </button>
                        </>
                      )}
                      <div className="mt-3 text-center">
                        <Link to="/Login" style={{ textDecoration: 'none' }} className="text-primary">
                          Already have an account? Sign In
                        </Link>
                      </div>
                    </form>
                  )}
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
