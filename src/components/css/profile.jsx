import React from 'react'
import { Col, Row, Badge, Button, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import OwnPostCard from '../ownPostCard'
import { postData, putData } from '../../apiServices/apiServices'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
function Profile({ userData, render }) {

  //user data
  const viewerid=JSON.parse(localStorage.getItem('user'))._id
  const [user, setUser] = useState(userData)
  const [userEdited, setUserEdited] = useState(userData)
  // modal handel
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // modal handel 2
  const [show2, setShow2] = useState(false);
  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);

//rerender
const [reRender,setReRender]=useState('')


  //add post
  const data = new Date()
  const [addPost, setAddPost] = useState({ imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0aQSskeO3CT-d7TlGa7S7xY47gNkCvj8QNQ&s', userid: userData._id, description: '', liked: [] })
  const [userPost, setUserPost] = useState([])

  const navi = useNavigate()

  useEffect(() => {
    //fetch userPost
    postData('fetchUserPost', {viewerid})
      .then(res => {
        setUserPost(res.data.reverse())
      
        render(res)
      })

  }, [reRender])





  

  const updateimg = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader;
    reader.readAsDataURL(file);
    reader.onload = () => {
      setUserEdited({ ...user, imgUrl: reader.result })
    }
  }
  const updatePost = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader;
    reader.readAsDataURL(file);
    reader.onload = () => {
      setAddPost({ ...addPost, imgUrl: '' })
      setAddPost({ ...addPost, imgUrl: reader.result })
    }
  }


  const uploadPost = () => {
    postData('uploadPost', addPost)
      .then(res => {
        toast.success('Post Uploaded')
        setAddPost({ imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0aQSskeO3CT-d7TlGa7S7xY47gNkCvj8QNQ&s', userid: userData._id, description: '' })
        handleClose2()
        setReRender(res)
        render(res)
      })
      .catch(err => {
        toast.error('post upload failed')
      })
  }


  const updateProfile = () => {

    if (userEdited.phone != '' && userEdited.userName != '' && userEdited.postal != '') {
      putData('profileupdate', userEdited)
        .then(res => {
          render(res)
          toast.success('profile Updated')
          handleClose()
        })
    }
    else {
      toast.error('fill All Input')
    }

  }


  return (
    <div className=' bg-white  mb-2 px-3 py-2  w-100 rounded-1 text-center ' style={{ height: 'max-content' }}>
      <Row>
        <Col sm={6}>
          <Row>
            <Col sm={12} className='d-flex justify-content-center py-3'>
              <div className='rounded-pill' style={{ width: '150px', height: '150px', backgroundImage: `url(${userData.imgUrl ? userData.imgUrl : userEdited.imgUrl != '' ? userEdited.imgUrl : 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'} )`, backgroundSize: 'cover' }}></div>
            </Col>
            <Col className='ms-2 text-black mb-4'>{userData.userName} </Col>

          </Row>
        </Col>
        <Col sm={6} className='d-flex justify-content-center align-items-center'>
          <Row >
            <Col className='mx-5'><span className='d-block'>{userPost.length}</span><span>Posts</span></Col>
            <Col className='mx-5'><span className='d-block'>{userData.follower.length}</span><span>Followers</span></Col>
            {
              userData.userType != 'user' ? <Col><span className='d-block'>Developer</span><span>Job</span></Col> : <></>
            }

            {
              userData.userType != 'user' ? <Col sm={12} className='border-2 bg-light p-3 mt-4'>

                <h5>Skills</h5>
                <Badge pill bg="dark" className='py-3 px-3 my-2' >
                  <span>maths</span><span style={{ cursor: 'pointer' }} className='ms-4'>X</span>
                </Badge>
                <Badge pill bg="dark" className='py-3 px-3 my-2' >
                  <span>maths</span><span style={{ cursor: 'pointer' }} className='ms-4'>X</span>
                </Badge> <Badge pill bg="dark" className='py-3 px-3 my-2' >
                  <span>maths</span><span style={{ cursor: 'pointer' }} className='ms-4'>X</span>
                </Badge> <Badge pill bg="dark" className='py-3 px-3 my-2' >
                  <span>maths</span><span style={{ cursor: 'pointer' }} className='ms-4'>X</span>
                </Badge> <Badge pill bg="dark" className='py-3 px-3 my-2' >
                  <span>maths</span><span style={{ cursor: 'pointer' }} className='ms-4'>X</span>
                </Badge>

              </Col> : <></>
            }

          </Row>
        </Col>
        <Col sm={12} className='my-4 text-center'>
          <Row>

            <Col sm={6} className='  text-black d-block my-2 '><i className="fa-regular fa-envelope fa-lg me-2"></i>{userData.email}</Col>
            <Col sm={6} className=' text-black my-2 '><i className="fa-solid fa-phone fa-lg me-2"></i>{userData.phone}</Col>
            <Col sm={6} className=' text-black  my-2'><i className="fa-solid fa-envelopes-bulk fa-lg me-2"></i>{userData.postal}</Col>
            <Col sm={6} className='  text-black my-2 '><i className="fa-solid fa-location-dot fa-lg me-2"></i>{userData.state} ,india</Col>
          </Row>

        </Col>


        <Col sm={6}><button className='btn btn-primary p-1 mt-3 w-100' onClick={e => handleShow()}>Edit Profile</button></Col>
        <Col sm={6}><button className='btn btn-danger p-1 mt-3 w-100' onClick={e => {
          navi('/')
          toast.success('loged out')
          localStorage.setItem('user', '')
        }}>Logout</button></Col>

        <Col sm={12}><button className='btn btn-warning p-1 mt-3 w-100' onClick={e => handleShow2()}>add Post</button></Col>



      </Row>
      <Row className='my-5 border-2'>
        {
          userPost.length > 0
            ?
            userPost.map(obj => (
              <Col sm={6}><OwnPostCard post={obj} userData={userData} render={render} reRender={setReRender} /></Col>
            ))

            : <h3 className='text-center'>no post to show</h3>
        }


      </Row>





      {/* modal edit profile */}


      <Modal show={show} fullscreen={true} onHide={() => { setShow(false); setUserEdited(userData) }}>
        <Modal.Header closeButton>
          Edit Profile
        </Modal.Header>
        <Modal.Body className='text-center px-5'>
          <Row>
            <Col sm={12}>
              <input type="file" id='profilepic' onChange={updateimg} style={{ display: 'none' }} />
              <label htmlFor='profilepic'>
                <Col sm={12} className='py-3'>
                  <div className='rounded-pill' style={{ width: '150px', height: '150px', backgroundImage: `url(${userEdited.imgUrl != '' ? userEdited.imgUrl : userData.imgUrl ? userData.imgUrl : 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'} )`, backgroundSize: 'cover' }}></div>
                </Col>
              </label>
            </Col>
            <Col sm={6}>
              <div data-mdb-input-init className="form-outline mb-4">
                <input type="text" className="form-control" value={userEdited.userName} onChange={e => setUserEdited({ ...userEdited, userName: e.target.value })} />
              </div>
            </Col>
            <Col sm={6}>
              <div data-mdb-input-init className="form-outline mb-4">
                <input type="email" className="form-control" value={userEdited.email} onChange={e => setUserEdited({ ...userEdited, email: e.target.value })} disabled />
              </div>
            </Col>
            <Col sm={3}>
              <div data-mdb-input-init className="form-outline mb-4">
                <input type="number" className="form-control" value={userEdited.postal} onChange={e => setUserEdited({ ...userEdited, postal: e.target.value })} />
              </div>
            </Col>
            <Col sm={6}>
              <div data-mdb-input-init className="form-outline mb-4">
                <input type="text" className="form-control" value={userEdited.phone} onChange={e => setUserEdited({ ...userEdited, phone: e.target.value })} />
              </div>
            </Col>
            <Col>
              <select id="inputState" className="form-select" value={userEdited.state} onChange={e => setUserEdited({ ...userEdited, state: e.target.value })}>
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
            <Col sm={5} className='my-3'><button className='btn btn-success w-100' onClick={updateProfile}>Save Changes</button></Col>
            <Col sm={5} className='my-3'><button className='btn btn-info w-100'>Change Password</button></Col>
            <Col sm={2} className='my-3'><button className='btn btn-danger w-100' onClick={e => { setUserEdited(userData) }}>Reset</button></Col>
          </Row>
        </Modal.Body>
      </Modal>


      {/* add post modal */}
      <Modal
        show={show2}
        onHide={handleClose2}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col sm={6}>
              <input type="file" id='addpost' onChange={updatePost} style={{ display: 'none' }} />

              <label htmlFor='addpost'>
                <div className='py-3'>
                  <div className='' style={{ width: '150px', height: '150px', backgroundImage: `url(${addPost.imgUrl != '' ? addPost.imgUrl : 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'} )`, backgroundSize: 'cover' }}></div>
                </div>
              </label>
            </Col>
            <Col sm={6} className='d-flex justify-centent-center align-items-center'>
              <div data-mdb-input-init className="form-outline ">
                <textarea type="text" className="form-control w-100" style={{ height: '20vh' }} value={addPost.description} onChange={e => setAddPost({ ...addPost, description: e.target.value })} placeholder='Description' />
              </div>
            </Col>

          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={uploadPost}>Post</Button>
        </Modal.Footer>
      </Modal>

    </div>

  )
}

export default Profile
