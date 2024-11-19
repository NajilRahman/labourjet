import React from 'react'
import { Col, Row, Badge, Button, Modal } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import OwnPostCard from './ownPostCard'
import { postData, putData } from '../apiServices/apiServices'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import Loading from './spinner'
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

  //works
const [works,setWorks]=useState([])

//rerender
const [reRender,setReRender]=useState('')

  const [loading,setLoading]=useState(true)
  //add post
  const data = new Date()
  const [addPost, setAddPost] = useState({ imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0aQSskeO3CT-d7TlGa7S7xY47gNkCvj8QNQ&s', userid: userData._id, description: '', liked: [] })
  const [userPost, setUserPost] = useState([])
  const [rating,setRating]=useState(0)
  const navi = useNavigate()

//skill add
const [skills,setSkills]=useState(user.skills)
const [skill,setSkill]=useState('')
  

  useEffect(() => {
    //fetch userPost
    setLoading(true)

    postData('fetchUserPost', {viewerid})

      .then(res => {
        setUserPost(res.data.reverse())
        setLoading(false)
        render(res)
      })

       

  }, [reRender])

  useEffect(()=>{
    setLoading(true)
    postData('getWorksData',{id:viewerid})
    .then(res=>{
      setWorks(res.data.reverse())
      setRating(Math.round(res.data.reduce((prev,next)=>prev=prev+next.rating,0)/works.length))
      setLoading(false)
    })
  },[reRender])



  

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
    setLoading(true)
    postData('uploadPost', addPost)
      .then(res => {
        toast.success('Post Uploaded')
        setLoading(false)

        setAddPost({ imgUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0aQSskeO3CT-d7TlGa7S7xY47gNkCvj8QNQ&s', userid: userData._id, description: '' })
        handleClose2()
        setReRender(res)
        render(res)
      })
      .catch(err => {
        setLoading(false)
        toast.error('post upload failed')
      })
  }


  const updateProfile = () => {
    setLoading(true)

    if (userEdited.phone != '' && userEdited.userName != '' && userEdited.postal != '') {
      putData('profileupdate', {...userEdited,skills:skills})
        .then(res => {
          render(res)
          setLoading(false)

          toast.success('profile Updated')
          handleClose()
        })
    }
    else {
      toast.error('fill All Input')
      setLoading(false)

    }

  }


  return (
    <div className=' bg-white  mb-2 px-3 py-2  w-100 rounded-1 text-center ' style={{ height: 'max-content' }}>
     {
      loading==true?      <div style={{height:'100vh'}}  className='d-flex justify-content-center align-items-center'><Loading/></div>

      : <Row>
      <Col sm={6}>
        <Row>
          <Col sm={12} className='d-flex justify-content-center py-3'>
            <div className='rounded-pill' style={{ width: '150px', height: '150px', backgroundImage: `url(${userData.imgUrl ? userData.imgUrl : userEdited.imgUrl != '' ? userEdited.imgUrl : 'https://www.shutterstock.com/image-vector/vector-flat-illustration-grayscale-avatar-600nw-2264922221.jpg'} )`, backgroundSize: 'cover' }}></div>
          </Col>
          <Col className='ms-2 text-black mb-1 fs-4' style={{fontWeight:'800'}}>{userData.userName}{userData.userType=='employee'?<svg className='ms-2' style={{width:'30px'}} id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m256 512c-66.012-37.684-225-151.29-225-377.76v-73.14h15c34.673 1.377 118.623-.163 201.68-55.548l8.32-5.552 8.32 5.552c83.159 55.444 167.314 56.779 199.424 55.607l17.256-.159v73.24c0 267.383-221.99 374.756-225 377.76z" fill="#f0f7ff"/></g><path d="m481 134.24v-73.24l-17.256.159c-32.109 1.172-116.265-.163-199.424-55.607l-8.32-5.552v512c3.01-3.005 225-110.379 225-377.76z" fill="#c7cfe1"/><g><g><path d="m256 443.38c-2.617-3-165-99.914-165-309.141v-13.374l13.286-2.432c50.859-5.874 99.507-21.196 144.58-45.571l7.134-3.852 7.134 3.853c45.073 24.375 93.721 39.697 144.58 45.571l13.286 1.524v13.374c0 205.199-162.252 306.898-165 310.048z" fill="#7ed8f6"/></g></g><path d="m421 133.332v-13.374l-13.286-1.523c-50.859-5.874-99.507-21.196-144.58-45.571l-7.134-3.854v374.37c2.748-3.151 165-104.849 165-310.048z" fill="#4895ff"/><g id="Shield_2_"><g><path d="m241 307.311-55.605-55.605 21.21-21.211 34.395 34.394 79.395-79.394 21.21 21.211z" fill="#f0f7ff"/></g></g><path d="m256 292.311 85.605-85.605-21.21-21.211-64.395 64.394z" fill="#c7cfe1"/></g></svg>:''} </Col>
          {
            userData.userType=='employee'?
            <Col sm={12} className='text-center'>
                                     <span>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>0?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>1?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>2?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>3?'text-warning':''}`}></i></button>
                                          <button  className='btn btn-white p-2'><i className={`fa-solid fa-star ${rating>4?'text-warning':''}`}></i></button>
                                          <span  style={{fontSize:'10px',fontWeight:'800'}}>{works.length}</span>
                                     </span>
                                    </Col>
                                    :<></>
          }
        </Row>
       
      </Col>
      
      <Col sm={6} className='d-flex justify-content-center align-items-center'>
        <Row  className=' mt-3'>
          
          <Col className=''><span className='d-block' style={{fontWeight:'600'}}>{userPost.length}</span><span style={{fontWeight:'600',color:'black'}}>Posts</span></Col>
          <Col className='mx-2'><span className='d-block' style={{fontWeight:'600'}}>{userData.follower.length}</span><span style={{fontWeight:'600',color:'black'}}>Followers</span></Col>
          {
            userData.userType != 'user' ? <Col><span className='d-block' style={{fontWeight:'600'}}>{userData.jobRole}</span><span style={{fontWeight:'600',color:'black'}}>Job</span></Col> : <></>
          }

          {
            userData.userType != 'user' ? <Col sm={12} className='border-2 bg-light p-3 mt-4'>

              <h5>Skills</h5>
             {
              userData.skills.map(obj=>(
                <Badge pill bg="dark" className='py-3 px-3 my-2' >
                <span>{obj}</span>
              </Badge>
              ))
             }
              
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
        toast.success('logged out')
        localStorage.setItem('user', '')
      }}>Logout</button></Col>

      <Col sm={12}><button className='btn btn-info p-1 mt-3 w-100' onClick={e => handleShow2()}><i class="fa-solid fa-square-plus me-2"></i>add Post</button></Col>

      <Row className='my-5 border-2 '>
        {
          userPost.length > 0
            ?
            userPost.map(obj => (
              <Col sm={6}><OwnPostCard post={obj} userData={userData} render={render} reRender={setReRender} /></Col>
            ))

            : <h3 className='text-center'>no post to show</h3>
        }


      </Row>

    </Row>
     }
      





      {/* modal edit profile */}


      <Modal show={show} fullscreen={true} onHide={() => { setShow(false); setUserEdited(userData) }}>
        <Modal.Header closeButton>
          Edit Profile
        </Modal.Header>
        <Modal.Body className='text-center px-5'>
          {
            loading? <Loading/>
            :<Row>
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
           {userData.userType!='user'? <>
            <Col sm={8}>
               <input className='form-control' type='text' placeholder='type skill ...'value={skill} onChange={e => setSkill( e.target.value )}></input> 
              </Col>
              <Col sm={4}>
              <button className='btn text-white bg-black w-100' onClick={e=>{setSkills([...skills,skill])}}>add Skill</button>
              </Col>
              <Col sm={12} className='border-2 bg-light p-3 mt-4'>
  
                <h5>Skills</h5>
               {
                skills?.map(obj=>(
                  <Badge pill bg="dark" className='py-3 px-3 my-2' >
                  <span>{obj}<span className='ms-3' onClick={e=>{      setSkills( skills.filter(item=>item!=obj) ) }} style={{cursor:'pointer'}}>x</span></span>
                </Badge>
                ))
               }
              </Col>
    </>
            :''
            }
            <Col sm={5} className='my-3'><button className='btn btn-success w-100' onClick={updateProfile}>Save Changes</button></Col>
            <Col sm={5} className='my-3'><button className='btn btn-info w-100'>Change Password</button></Col>
            <Col sm={2} className='my-3'><button className='btn btn-danger w-100' onClick={e => { setUserEdited(userData) }}>Reset</button></Col>
          </Row>
}
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


          {
            loading?<div style={{height:'40vh'}}  className='d-flex justify-content-center align-items-center'><Loading/></div>
            :<Row>
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
          }
          
          
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={uploadPost}>Post</Button>
        </Modal.Footer>
      </Modal>

    </div>

  )
}

export default Profile
