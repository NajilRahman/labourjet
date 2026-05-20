import React, { useState, useEffect } from 'react';
import { Col, Row, Badge, Button, Modal, Spinner } from 'react-bootstrap';
import OwnPostCard from './ownPostCard';
import { postData, putData } from '../apiServices/apiServices';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import Loading from './spinner';

function Profile({ userData, render }) {
  const viewerid = JSON.parse(localStorage.getItem('user'))?._id;
  const [user, setUser] = useState(userData);
  const [userEdited, setUserEdited] = useState(userData);
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setUserEdited(userData);
  };
  const handleShow = () => setShow(true);

  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

  const [works, setWorks] = useState([]);
  const [reRender, setReRender] = useState('');
  const [loading, setLoading] = useState(true);
  const [addPost, setAddPost] = useState({
    imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0aQSskeO3CT-d7TlGa7S7xY47gNkCvj8QNQ&s',
    userid: userData?._id,
    description: '',
    liked: []
  });
  const [userPost, setUserPost] = useState([]);
  const [rating, setRating] = useState(0);
  const navi = useNavigate();

  const [skills, setSkills] = useState(user?.skills || []);
  const [skill, setSkill] = useState('');

  useEffect(() => {
    setLoading(true);
    postData('fetchUserPost', { viewerid })
      .then(res => {
        setUserPost(res.data.reverse());
        setLoading(false);
        render(res);
      });
  }, [reRender]);

  useEffect(() => {
    setLoading(true);
    postData('getWorksData', { id: viewerid })
      .then(res => {
        setWorks(res.data.reverse());
        if (res.data.length > 0) {
          setRating(Math.round(res.data.reduce((prev, next) => prev + next.rating, 0) / res.data.length));
        } else {
          setRating(0);
        }
        setLoading(false);
      });
  }, [reRender]);

  const updateimg = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserEdited({ ...userEdited, imgUrl: reader.result });
    };
  };

  const updatePost = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAddPost({ ...addPost, imgUrl: reader.result });
    };
  };

  const uploadPost = () => {
    setLoading(true);
    postData('uploadPost', addPost)
      .then(res => {
        toast.success('Post Uploaded');
        setLoading(false);
        setAddPost({
          imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0aQSskeO3CT-d7TlGa7S7xY47gNkCvj8QNQ&s',
          userid: userData?._id,
          description: '',
          liked: []
        });
        handleClose2();
        setReRender(res);
        render(res);
      })
      .catch(err => {
        setLoading(false);
        toast.error('Post upload failed');
      });
  };

  const updateProfile = () => {
    setLoading(true);
    if (userEdited.phone !== '' && userEdited.userName !== '' && userEdited.postal !== '') {
      putData('profileupdate', { ...userEdited, skills: skills })
        .then(res => {
          render(res);
          setLoading(false);
          toast.success('Profile Updated');
          handleClose();
        })
        .catch(err => {
          setLoading(false);
          toast.error('Update failed');
        });
    } else {
      toast.error('Fill in all fields');
      setLoading(false);
    }
  };

  const defaultAvatar = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80';

  return (
    <div className="card bg-glass border-0 p-4 mb-4 text-start" style={{ height: 'max-content' }}>
      {loading ? (
        <div style={{ height: '50vh' }} className="d-flex justify-content-center align-items-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <Row className="g-4">
          <Col md={4} className="text-center text-md-start">
            <div className="d-flex flex-column align-items-center">
              <img
                className="rounded-circle border border-3 border-primary mb-3 shadow-lg"
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                src={userData?.imgUrl || defaultAvatar}
                alt={userData?.userName}
              />
              <h4 className="fw-bold mb-1 d-flex align-items-center gap-2 justify-content-center">
                {userData?.userName}
                {userData?.userType === 'employee' && (
                  <i className="fa-solid fa-circle-check text-info fa-xs" title="Verified Specialist"></i>
                )}
              </h4>
              {userData?.userType === 'employee' && (
                <div className="d-flex gap-1 my-2">
                  {[...Array(5)].map((_, i) => (
                    <i
                      key={i}
                      className={`fa-solid fa-star ${i < rating ? 'text-warning' : 'text-muted'}`}
                    ></i>
                  ))}
                  <span className="ms-2 text-muted" style={{ fontSize: '0.85rem' }}>({works.length} reviews)</span>
                </div>
              )}
            </div>
          </Col>

          <Col md={8}>
            <div className="d-flex flex-wrap justify-content-around text-center p-3 rounded bg-glass border mb-4">
              <div>
                <span className="d-block fs-4 fw-bold">{userPost.length}</span>
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>Posts</span>
              </div>
              <div>
                <span className="d-block fs-4 fw-bold">{userData?.follower?.length || 0}</span>
                <span className="text-muted" style={{ fontSize: '0.85rem' }}>Followers</span>
              </div>
              {userData?.userType !== 'user' && (
                <div>
                  <span className="d-block fs-4 fw-bold text-truncate" style={{ maxWidth: '150px' }}>{userData?.jobRole}</span>
                  <span className="text-muted" style={{ fontSize: '0.85rem' }}>Job Role</span>
                </div>
              )}
            </div>

            {userData?.userType !== 'user' && userData?.skills?.length > 0 && (
              <div className="mb-4">
                <h6 className="text-muted mb-2">Skills & Certifications</h6>
                <div className="d-flex flex-wrap gap-2">
                  {userData.skills.map((obj, idx) => (
                    <Badge key={idx} pill bg="primary" className="py-2 px-3">
                      {obj}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div className="row g-3 text-start">
              <Col sm={6} className="d-flex align-items-center gap-2">
                <i className="fa-regular fa-envelope text-primary"></i>
                <span className="text-truncate">{userData?.email}</span>
              </Col>
              <Col sm={6} className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-phone text-primary"></i>
                <span>{userData?.phone}</span>
              </Col>
              <Col sm={6} className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-envelopes-bulk text-primary"></i>
                <span>{userData?.postal}</span>
              </Col>
              <Col sm={6} className="d-flex align-items-center gap-2">
                <i className="fa-solid fa-location-dot text-primary"></i>
                <span>{userData?.state}, India</span>
              </Col>
            </div>
          </Col>

          <Col sm={12}>
            <div className="d-flex flex-wrap flex-md-nowrap gap-3">
              <button className="btn btn-primary flex-grow-1" style={{ minWidth: '140px' }} onClick={handleShow}>
                Edit Profile
              </button>
              <button className="btn btn-light flex-grow-1" style={{ minWidth: '140px' }} onClick={handleShow2}>
                <i className="fa-solid fa-square-plus me-2"></i>New Post
              </button>
              <button className="btn btn-light text-danger border-danger flex-grow-1" style={{ minWidth: '140px' }} onClick={() => {
                localStorage.setItem('user', '');
                navi('/Login');
                toast.success('Logged Out');
              }}>
                Logout
              </button>
            </div>
          </Col>

          {/* User Posts Row */}
          <Col sm={12} className="mt-4">
            <h5 className="mb-3 text-gradient">Your Publications</h5>
            <Row className="g-4">
              {userPost.length > 0 ? (
                userPost.map(obj => (
                  <Col md={6} key={obj._id}>
                    <OwnPostCard post={obj} userData={userData} render={render} reRender={setReRender} />
                  </Col>
                ))
              ) : (
                <div className="col-12 py-5 text-center bg-glass border rounded-3">
                  <i className="fa-regular fa-images fa-3x text-muted mb-3"></i>
                  <p className="text-muted mb-0">No posts shared yet</p>
                </div>
              )}
            </Row>
          </Col>
        </Row>
      )}

      {/* Edit Profile Modal */}
      <Modal show={show} onHide={handleClose} size="lg" centered contentClassName="modal-glass border-0 shadow-lg" backdropClassName="glass-backdrop">
        <Modal.Header closeButton closeVariant="white" className="border-0 pt-4 pb-3 px-4">
          <Modal.Title className="fw-bold text-white">Edit Profile Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-4">
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <Row className="g-3">
              <Col sm={12} className="text-center mb-3">
                <input type="file" id="profilepic" onChange={updateimg} style={{ display: 'none' }} />
                <label htmlFor="profilepic" style={{ cursor: 'pointer' }}>
                  <img
                    className="rounded-circle border border-3 border-primary hover-scale shadow"
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                    src={userEdited?.imgUrl || defaultAvatar}
                    alt="Upload profile preview"
                  />
                  <small className="d-block text-white opacity-70 mt-2">Click to change picture</small>
                </label>
              </Col>
              <Col md={6} className="text-start">
                <label className="form-label text-white opacity-75 fw-500 mb-1">Username</label>
                <input
                  type="text"
                  className="form-control border-0 text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
                  value={userEdited?.userName || ''}
                  onChange={e => setUserEdited({ ...userEdited, userName: e.target.value })}
                />
              </Col>
              <Col md={6} className="text-start">
                <label className="form-label text-white opacity-75 fw-500 mb-1">Email (Disabled)</label>
                <input
                  type="email"
                  className="form-control border-0 text-white-50"
                  style={{ backgroundColor: 'rgba(255,255,255,0.04)', borderRadius: '12px', padding: '10px 16px', cursor: 'not-allowed', opacity: '0.6' }}
                  value={userEdited?.email || ''}
                  disabled
                />
              </Col>
              <Col md={6} className="text-start">
                <label className="form-label text-white opacity-75 fw-500 mb-1">Phone</label>
                <input
                  type="text"
                  className="form-control border-0 text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
                  value={userEdited?.phone || ''}
                  onChange={e => setUserEdited({ ...userEdited, phone: e.target.value })}
                />
              </Col>
              <Col md={6} className="text-start">
                <label className="form-label text-white opacity-75 fw-500 mb-1">Postal Code</label>
                <input
                  type="number"
                  className="form-control border-0 text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
                  value={userEdited?.postal || ''}
                  onChange={e => setUserEdited({ ...userEdited, postal: e.target.value })}
                />
              </Col>
              <Col md={12} className="text-start">
                <label className="form-label text-white opacity-75 fw-500 mb-1">State</label>
                <select
                  className="form-select border-0 text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
                  value={userEdited?.state || 'Andhra Pradesh'}
                  onChange={e => setUserEdited({ ...userEdited, state: e.target.value })}
                >
                  <option value="Andhra Pradesh" style={{ background: '#1e1b4b', color: '#fff' }}>Andhra Pradesh</option>
                  <option value="Arunachal Pradesh" style={{ background: '#1e1b4b', color: '#fff' }}>Arunachal Pradesh</option>
                  <option value="Assam" style={{ background: '#1e1b4b', color: '#fff' }}>Assam</option>
                  <option value="Bihar" style={{ background: '#1e1b4b', color: '#fff' }}>Bihar</option>
                  <option value="Chhattisgarh" style={{ background: '#1e1b4b', color: '#fff' }}>Chhattisgarh</option>
                  <option value="Goa" style={{ background: '#1e1b4b', color: '#fff' }}>Goa</option>
                  <option value="Gujarat" style={{ background: '#1e1b4b', color: '#fff' }}>Gujarat</option>
                  <option value="Haryana" style={{ background: '#1e1b4b', color: '#fff' }}>Haryana</option>
                  <option value="Himachal Pradesh" style={{ background: '#1e1b4b', color: '#fff' }}>Himachal Pradesh</option>
                  <option value="Jharkhand" style={{ background: '#1e1b4b', color: '#fff' }}>Jharkhand</option>
                  <option value="Karnataka" style={{ background: '#1e1b4b', color: '#fff' }}>Karnataka</option>
                  <option value="Kerala" style={{ background: '#1e1b4b', color: '#fff' }}>Kerala</option>
                  <option value="Madhya Pradesh" style={{ background: '#1e1b4b', color: '#fff' }}>Madhya Pradesh</option>
                  <option value="Maharashtra" style={{ background: '#1e1b4b', color: '#fff' }}>Maharashtra</option>
                  <option value="Manipur" style={{ background: '#1e1b4b', color: '#fff' }}>Manipur</option>
                  <option value="Meghalaya" style={{ background: '#1e1b4b', color: '#fff' }}>Meghalaya</option>
                  <option value="Mizoram" style={{ background: '#1e1b4b', color: '#fff' }}>Mizoram</option>
                  <option value="Nagaland" style={{ background: '#1e1b4b', color: '#fff' }}>Nagaland</option>
                  <option value="Odisha" style={{ background: '#1e1b4b', color: '#fff' }}>Odisha</option>
                  <option value="Punjab" style={{ background: '#1e1b4b', color: '#fff' }}>Punjab</option>
                  <option value="Rajasthan" style={{ background: '#1e1b4b', color: '#fff' }}>Rajasthan</option>
                  <option value="Sikkim" style={{ background: '#1e1b4b', color: '#fff' }}>Sikkim</option>
                  <option value="Tamil Nadu" style={{ background: '#1e1b4b', color: '#fff' }}>Tamil Nadu</option>
                  <option value="Telangana" style={{ background: '#1e1b4b', color: '#fff' }}>Telangana</option>
                  <option value="Tripura" style={{ background: '#1e1b4b', color: '#fff' }}>Tripura</option>
                  <option value="Uttar Pradesh" style={{ background: '#1e1b4b', color: '#fff' }}>Uttar Pradesh</option>
                  <option value="Uttarakhand" style={{ background: '#1e1b4b', color: '#fff' }}>Uttarakhand</option>
                  <option value="West Bengal" style={{ background: '#1e1b4b', color: '#fff' }}>West Bengal</option>
                </select>
              </Col>

              {userData?.userType !== 'user' && (
                <>
                  <Col md={8} className="text-start">
                    <label className="form-label text-white opacity-75 fw-500 mb-1">Add Skill</label>
                    <input
                      className="form-control border-0 text-white"
                      style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
                      type="text"
                      placeholder="e.g. Piping, Wiring"
                      value={skill}
                      onChange={e => setSkill(e.target.value)}
                    />
                  </Col>
                  <Col md={4} className="d-flex align-items-end">
                    <button
                      className="btn btn-primary w-100 rounded-pill px-4 border-0"
                      type="button"
                      onClick={() => {
                        if (skill) {
                          setSkills([...skills, skill]);
                          setSkill('');
                        }
                      }}
                    >
                      Add Skill
                    </button>
                  </Col>
                  <Col sm={12} className="text-start mt-3">
                    <label className="form-label text-white opacity-75 fw-500 mb-1">Your Skills</label>
                    <div className="d-flex flex-wrap gap-2 p-3 rounded-4 bg-glass border" style={{ borderColor: 'rgba(255,255,255,0.08) !important' }}>
                      {skills.length > 0 ? (
                        skills.map((obj, idx) => (
                          <Badge key={idx} pill bg="primary" className="py-2 px-3 border-0">
                            {obj}
                            <span
                              className="ms-2"
                              style={{ cursor: 'pointer', fontWeight: 'bold' }}
                              onClick={() => setSkills(skills.filter(item => item !== obj))}
                            >
                              ×
                            </span>
                          </Badge>
                        ))
                      ) : (
                        <small className="text-white opacity-50">No skills listed</small>
                      )}
                    </div>
                  </Col>
                </>
              )}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 p-3 px-4 gap-2">
          <Button variant="secondary" className="rounded-pill px-4 border-0" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" className="rounded-pill px-4 border-0" onClick={updateProfile}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Add Post Modal */}
      <Modal show={show2} onHide={handleClose2} centered contentClassName="modal-glass border-0 shadow-lg" backdropClassName="glass-backdrop">
        <Modal.Header closeButton closeVariant="white" className="border-0 pt-4 pb-3 px-4">
          <Modal.Title className="fw-bold text-white">Share new update</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4 pb-3">
          {loading ? (
            <div className="d-flex justify-content-center py-5">
              <Spinner animation="border" variant="light" />
            </div>
          ) : (
            <Row className="g-3">
              <Col sm={12} className="text-center">
                <input type="file" id="addpost" onChange={updatePost} style={{ display: 'none' }} />
                <label htmlFor="addpost" style={{ cursor: 'pointer' }} className="w-100">
                  <div
                    className="border border-dashed rounded-3 p-4 hover-scale d-flex flex-column align-items-center justify-content-center"
                    style={{ minHeight: '180px', backgroundColor: 'rgba(255,255,255,0.02)', borderColor: 'rgba(255,255,255,0.15)' }}
                  >
                    {addPost.imgUrl ? (
                      <img
                        src={addPost.imgUrl}
                        alt="Upload preview"
                        className="rounded"
                        style={{ maxHeight: '150px', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    ) : (
                      <>
                        <i className="fa-solid fa-cloud-arrow-up fa-2x text-white opacity-50 mb-2"></i>
                        <small className="text-white opacity-50">Click to browse media file</small>
                      </>
                    )}
                  </div>
                </label>
              </Col>
              <Col sm={12} className="text-start">
                <label className="form-label text-white opacity-75 fw-500 mb-1">Write caption</label>
                <textarea
                  className="form-control border-0 text-white"
                  style={{ backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: '12px', padding: '10px 16px' }}
                  rows={4}
                  value={addPost.description}
                  onChange={e => setAddPost({ ...addPost, description: e.target.value })}
                  placeholder="Share details of your completed works or requirements..."
                />
              </Col>
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer className="border-0 p-3 px-4 gap-2">
          <Button variant="secondary" className="rounded-pill px-4 border-0" style={{ backgroundColor: 'rgba(255,255,255,0.08)' }} onClick={handleClose2}>
            Cancel
          </Button>
          <Button variant="primary" className="rounded-pill px-4 border-0" onClick={uploadPost}>
            Publish Post
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
}

export default Profile;
