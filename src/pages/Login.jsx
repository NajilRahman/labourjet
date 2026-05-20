import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthNavbar from '../components/authNavbar';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { postData } from '../apiServices/apiServices';
import toast from 'react-hot-toast';
import Loading from '../components/spinner';

const Login = () => {
  const [forgot, setForgot] = useState(true);
  const [code, setCode] = useState(true);
  const [changePass, setChangePass] = useState(true);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [otpCode, setOtpCode] = useState('');
  const [loginStep, setLoginStep] = useState('login'); // 'login' or 'otp'
  const [recoveryEmail, setRecoveryEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);

  const requestOtp = () => {
    if (!loginData.email) { toast.error('Enter email'); return; }
    setLoading(true);
    postData('userLogin', { email: loginData.email })
      .then(res => {
        setLoading(false);
        toast.success('OTP sent to email');
        setLoginStep('otp');
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response?.data || 'Failed to send OTP');
      });
  };

  const verifyOtp = () => {
    if (!otpCode) { toast.error('Enter OTP'); return; }
    setLoading(true);
    postData('verifyLoginOTP', { email: loginData.email, otp: otpCode })
      .then(res => {
        setLoading(false);
        toast.success('Login successful');
        localStorage.setItem('user', JSON.stringify(res.data));
        if (res.data.userType === 'admin') {
          navi('/adminpanel');
        } else {
          navi('/landinghome');
        }
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response?.data || 'Invalid OTP');
      });
  };

  // Handle Get Code
  const getResetCode = (e) => {
    e.preventDefault();
    if (!recoveryEmail) {
      return toast.error('Please enter your email address.');
    }
    setLoading(true);
    postData('forgotPassword', { email: recoveryEmail })
      .then(res => {
        setLoading(false);
        toast.success(res.data);
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response?.data || 'Failed to request reset code.');
      });
  };

  // Handle Verify Code
  const handleVerifyCode = (e) => {
    e.preventDefault();
    if (!recoveryEmail || !otpCode) {
      return toast.error('Please enter email and verification code.');
    }
    setLoading(true);
    postData('verifyCode', { email: recoveryEmail, code: otpCode })
      .then(res => {
        setLoading(false);
        toast.success(res.data);
        setCode(true);
        setChangePass(false);
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response?.data || 'Invalid reset code.');
      });
  };

  // Handle Change Password
  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      return toast.error('Please fill in all fields.');
    }
    if (newPassword !== confirmPassword) {
      return toast.error('Passwords do not match.');
    }
    setLoading(true);
    postData('changePassword', { email: recoveryEmail, code: otpCode, newPassword })
      .then(res => {
        setLoading(false);
        toast.success(res.data);
        setChangePass(true);
        setForgot(true);
        setRecoveryEmail('');
        setOtpCode('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response?.data || 'Failed to reset password.');
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
                The Best Place <br />
                <span className="text-gradient">To Grow Yourself</span>
              </h1>
              <p className="lead mb-4" style={{ color: 'var(--text-secondary)' }}>
                At LabourJet, we believe in the power of self-growth and continuous learning. Our platform is designed to empower individuals to enhance their skills, explore new opportunities, and connect with like-minded professionals. Join us on this journey of personal and professional development, and unlock your full potential today!
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
                      {/* User OTP Login */}
                      {forgot && (
                        loginStep === 'login' ? (
                          <>
                            <h3 className="mb-4 text-start font-weight-bold">Sign In</h3>
                            <div className="mb-4 text-start">
                              <label className="form-label">Email Address</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={loginData.email}
                                onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                              />
                            </div>
                            <button
                              onClick={(e) => { e.preventDefault(); requestOtp(); }}
                              className="btn w-100 btn-primary text-center mb-4"
                            >
                              Request Login OTP
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
                                value={otpCode}
                                onChange={(e) => setOtpCode(e.target.value)}
                              />
                            </div>
                            <button
                              onClick={(e) => { e.preventDefault(); verifyOtp(); }}
                              className="btn w-100 btn-primary text-center mb-4"
                            >
                              Verify OTP & Login
                            </button>
                          </>
                        )
                      )}

                      {/* Forgot Password Verification */}
                      {!code && (
                        <>
                          <h3 className="mb-4 text-start font-weight-bold">Recover Password</h3>
                          <Row className="align-items-end mb-4">
                            <Col sm={9} className="text-start">
                              <label className="form-label">Email Address</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={recoveryEmail}
                                onChange={(e) => setRecoveryEmail(e.target.value)}
                              />
                            </Col>
                            <Col sm={3}>
                              <button
                                onClick={getResetCode}
                                className="btn w-100 btn-primary px-0 text-center"
                                style={{ height: '50px' }}
                              >
                                Send
                              </button>
                            </Col>
                          </Row>
                          <div className="mb-4 text-start">
                            <label className="form-label">Verification Code</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Enter verification code"
                              value={otpCode}
                              onChange={(e) => setOtpCode(e.target.value)}
                            />
                          </div>
                          <button
                            onClick={handleVerifyCode}
                            className="btn w-100 btn-primary text-center mb-4"
                          >
                            Confirm Code
                          </button>
                        </>
                      )}

                      {/* Change Password */}
                      {!changePass && (
                        <>
                          <h3 className="mb-4 text-start font-weight-bold">Set New Password</h3>
                          <div className="mb-4 text-start">
                            <label className="form-label">New Password</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Enter new password"
                              value={newPassword}
                              onChange={(e) => setNewPassword(e.target.value)}
                            />
                          </div>
                          <div className="mb-4 text-start">
                            <label className="form-label">Confirm Password</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="Confirm new password"
                              value={confirmPassword}
                              onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                          </div>
                          <button
                            onClick={handleChangePassword}
                            className="btn w-100 btn-primary text-center mb-4"
                          >
                            Change Password
                          </button>
                        </>
                      )}

                      {forgot && (
                        <div className="row mt-3">
                          <Link to="/userRegister" style={{ textDecoration: 'none' }} className="col-6 text-start text-primary">
                            New User? Register
                          </Link>
                          <div
                            style={{ textDecoration: 'none', cursor: 'pointer' }}
                            className="col-6 text-end text-primary"
                            onClick={() => { setForgot(!forgot); setCode(!code); }}
                          >
                            Forgot Password?
                          </div>
                        </div>
                      )}
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

export default Login;
