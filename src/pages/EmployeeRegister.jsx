import React, { useState } from 'react';
import { Button, Col, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { postData } from '../apiServices/apiServices';
import AuthNavbar from '../components/authNavbar';
import Loading from '../components/spinner';
import toast from 'react-hot-toast';

const EmployeeRegister = () => {
  const [skills, setSkills] = useState([]);
  const [jobType, setJobType] = useState(false); // false: skilled, true: certified
  const [form, setForm] = useState({
    userName: '',
    email: '',
    phone: '',
    password: '',
    jobRole: '',
    idCard: '',
    education: '',
    state: 'Andhra Pradesh',
    postal: '',
    documents: '',
    approvel: 'rejected',
    userType: 'employee'
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState('register');
  const [otp, setOtp] = useState('');
  const navi = useNavigate();

  const updateDoc = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setForm({ ...form, documents: reader.result });
    };
  };

  const updateidCard = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setForm({ ...form, idCard: reader.result });
    };
  };

  const requestOtp = () => {
    if (!form.userName || !form.email || !form.phone || !form.password) {
      return toast.error("Please fill in required fields");
    }
    setLoading(true);
    postData('sendRegisterOTP', form)
      .then(res => {
        setLoading(false);
        toast.success('OTP sent to email');
        setStep('otp');
      })
      .catch(err => {
        setLoading(false);
        toast.error(err.response?.data || 'Failed to send OTP');
      });
  };

  const verifyOtpAndRegister = () => {
    if (!otp) {
      return toast.error('Enter OTP');
    }
    setLoading(true);
    postData('verifyRegisterAndCreate', { email: form.email, otp })
      .then(res => {
        setLoading(false);
        toast.success('Registration Successful');
        toast.success('We will verify your documents soon');
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
            <div className="col-lg-5 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
              <h1 className="display-4 fw-bold mb-4 ls-tight">
                Work on Your <br />
                <span className="text-gradient">Own Terms</span>
              </h1>
              <p className="lead mb-4" style={{ color: 'var(--text-secondary)' }}>
                Register as an Employee to unlock premium client listings, get automated job recommendations, receive direct messages from hirers, and build your digital footprint.
              </p>
            </div>

            <div className="col-lg-7 mb-5 mb-lg-0 position-relative">
              <div className="card bg-glass border-0 shadow-lg p-4">
                <div className="card-body">
                  {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '40vh' }}>
                      <Spinner animation="border" variant="primary" />
                    </div>
                  ) : (
                    <form>
                      {step === 'register' ? (
                        <>
                          <h3 className="mb-4 text-start font-weight-bold">Register Specialist</h3>

                          {/* skilled vs certified switcher */}
                          <div className="d-flex justify-content-between p-1 rounded-3 mb-4" style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                            <button
                              className={`btn w-50 py-2 ${!jobType ? 'btn-primary text-white' : 'btn-light'}`}
                              style={{ borderRadius: '6px', fontSize: '0.9rem' }}
                              onClick={(e) => { e.preventDefault(); setJobType(false); }}
                            >
                              Skilled Job
                            </button>
                            <button
                              className={`btn w-50 py-2 ${jobType ? 'btn-primary text-white' : 'btn-light'}`}
                              style={{ borderRadius: '6px', fontSize: '0.9rem' }}
                              onClick={(e) => { e.preventDefault(); setJobType(true); }}
                            >
                              Certified Job
                            </button>
                          </div>

                          <Row>
                            <Col md={6} className="mb-4 text-start">
                              <label className="form-label">User Name</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="johndoe"
                                value={form.userName}
                                onChange={e => setForm({ ...form, userName: e.target.value })}
                              />
                            </Col>
                            <Col md={6} className="mb-4 text-start">
                              <label className="form-label">Email Address</label>
                              <input
                                type="email"
                                className="form-control"
                                placeholder="name@example.com"
                                value={form.email}
                                onChange={e => setForm({ ...form, email: e.target.value })}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6} className="mb-4 text-start">
                              <label className="form-label">Phone Number</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="9876543210"
                                value={form.phone}
                                onChange={e => setForm({ ...form, phone: e.target.value })}
                              />
                            </Col>
                            <Col md={6} className="mb-4 text-start">
                              <label className="form-label">Password</label>
                              <input
                                type="password"
                                className="form-control"
                                placeholder="••••••••"
                                value={form.password}
                                onChange={e => setForm({ ...form, password: e.target.value })}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6} className="mb-4 text-start">
                              <label className="form-label">Job Role</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Electrician, Designer"
                                value={form.jobRole}
                                onChange={e => setForm({ ...form, jobRole: e.target.value })}
                              />
                            </Col>
                            <Col md={6} className="mb-4 text-start">
                              <label className="form-label">Higher Education</label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="e.g. Diploma, B.Tech"
                                value={form.education}
                                onChange={e => setForm({ ...form, education: e.target.value })}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md={6} className="mb-4 text-start">
                              <label className="form-label">Upload ID Card</label>
                              <input
                                type="file"
                                className="form-control"
                                onChange={updateidCard}
                              />
                              {form.idCard && (
                                <div className="mt-2 text-center p-2 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                  <img src={form.idCard} alt="ID Preview" style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                                </div>
                              )}
                            </Col>
                            {jobType && (
                              <Col md={6} className="mb-4 text-start">
                                <label className="form-label">Certificates / Documents</label>
                                <input
                                  type="file"
                                  className="form-control"
                                  onChange={updateDoc}
                                />
                                {form.documents && (
                                  <div className="mt-2 text-center p-2 rounded" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <img src={form.documents} alt="Doc Preview" style={{ maxHeight: '80px', maxWidth: '100%', objectFit: 'contain', borderRadius: '4px' }} />
                                  </div>
                                )}
                              </Col>
                            )}
                          </Row>

                          <Row className="mb-4">
                            <Col md={6} className="text-start">
                              <label className="form-label">Postal Code</label>
                              <input
                                type="number"
                                className="form-control"
                                placeholder="682001"
                                value={form.postal}
                                onChange={e => setForm({ ...form, postal: e.target.value })}
                              />
                            </Col>
                            <Col md={6} className="text-start">
                              <label className="form-label">State</label>
                              <select
                                className="form-select"
                                value={form.state}
                                onChange={e => setForm({ ...form, state: e.target.value })}
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
                            onClick={(e) => { e.preventDefault(); requestOtp(); }}
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
                            onClick={(e) => { e.preventDefault(); verifyOtpAndRegister(); }}
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

export default EmployeeRegister;
