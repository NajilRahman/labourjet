import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { postData } from '../apiServices/apiServices';
import { Col, Row, Badge, Button, Modal, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CommentMessage from './comment';
import toast from 'react-hot-toast';
function PostCard({card,render,reRender}) {
  const id=JSON.parse(localStorage.getItem('user'))._id
    const [liked,setLiked]=useState(card.liked.includes(id))
    const [user,setUser]=useState({})  

    // modal handel
 const [show, setShow] = useState(false);
 const handleClose = () => setShow(false);
 const handleShow = () => setShow(true);

const [commentInput,setCommentInput]=useState('')
const [comments,setComments]=useState([])
const [reload,setReload]=useState(false)


useEffect(() => {
 postData('getComment',{_id:card._id})
 .then(res=>{
  setComments(res.data)
 })
}, [reload])

//sendComment
const sendComment=()=>{
  postData('postComment',{_id:card._id,comment:commentInput,commenterid:id})
  .then(res=>{
    setCommentInput('')
    toast.success('comment added')

    setReload(!reload)
  })
}

    const likeUpdate = (reqType) => {
      postData('likeUpdate', { _id:card._id,viewerid: id, reqType })
        .then(res => {
          setLiked(res.data.liked.includes(id))
          render(res)
        })
    }

    useEffect(() => {
      postData('user',{id:card.userid})
      .then(res=>{
        setUser(res.data)
      })
    }, [])
    

  

  return (
    <div >
        
        <Card className='w-100 my-4 border-0 shadow-lg' id={card?._id}>
        <Card.Body className="d-flex align-items-center pb-2">
           <Link to={`/user/${user?._id}`} style={{textDecoration:'none'}}>
              <div className='d-flex align-items-center' style={{width:'max-content'}}>
                  <img className='img-fluid rounded-circle shadow-sm' style={{height:'45px',width:'45px', objectFit: 'cover'}} src={user?.imgUrl || 'https://via.placeholder.com/150'} alt="profile" />
                  <span className='ms-3 text-white' style={{fontWeight:'600', fontSize:'1.1rem'}}>{user?.userName}
                  {user.userType==='employee' && <svg className='ms-2' style={{width:'22px'}} id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m256 512c-66.012-37.684-225-151.29-225-377.76v-73.14h15c34.673 1.377 118.623-.163 201.68-55.548l8.32-5.552 8.32 5.552c83.159 55.444 167.314 56.779 199.424 55.607l17.256-.159v73.24c0 267.383-221.99 374.756-225 377.76z" fill="#f0f7ff"/></g><path d="m481 134.24v-73.24l-17.256.159c-32.109 1.172-116.265-.163-199.424-55.607l-8.32-5.552v512c3.01-3.005 225-110.379 225-377.76z" fill="#c7cfe1"/><g><g><path d="m256 443.38c-2.617-3-165-99.914-165-309.141v-13.374l13.286-2.432c50.859-5.874 99.507-21.196 144.58-45.571l7.134-3.852 7.134 3.853c45.073 24.375 93.721 39.697 144.58 45.571l13.286 1.524v13.374c0 205.199-162.252 306.898-165 310.048z" fill="#7ed8f6"/></g></g><path d="m421 133.332v-13.374l-13.286-1.523c-50.859-5.874-99.507-21.196-144.58-45.571l-7.134-3.854v374.37c2.748-3.151 165-104.849 165-310.048z" fill="#4895ff"/><g id="Shield_2_"><g><path d="m241 307.311-55.605-55.605 21.21-21.211 34.395 34.394 79.395-79.394 21.21 21.211z" fill="#f0f7ff"/></g></g><path d="m256 292.311 85.605-85.605-21.21-21.211-64.395 64.394z" fill="#c7cfe1"/></g></svg>} </span>
              </div>
           </Link>
          </Card.Body>
          {card?.imgUrl && (
            <div style={{ width: '100%', maxHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderTop: '1px solid rgba(255,255,255,0.05)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <img src={card.imgUrl} alt="Post content" style={{ maxHeight: '500px', width: '100%', objectFit: 'contain' }} />
            </div>
          )}
          <Card.Body className='border-0 pt-3'>
            <Card.Text className='text-start mb-3' style={{fontSize: '0.95rem', lineHeight: '1.5'}}>
            {card?.description}
            </Card.Text>
            <div className='d-flex justify-content-start align-items-center gap-3 mt-2'>
              {liked ? (
                <button className={`btn btn-light d-flex justify-content-center align-items-center gap-2 action-btn`} style={{borderRadius: '25px', width: '75px', height: '42px', padding: '0'}} onClick={e=>likeUpdate('unlike')}>
                  <i className={`fa-solid fa-heart fa-lg`} style={{color:'#ef4444'}}></i>
                  {card.liked.length > 0 && <span style={{fontWeight: '600', color: '#fff'}}>{card.liked.length}</span>}
                </button>
              ) : (
                <button className={`btn btn-light d-flex justify-content-center align-items-center gap-2 action-btn`} style={{borderRadius: '25px', width: '75px', height: '42px', padding: '0'}} onClick={e=>likeUpdate('like')}>
                  <i className={`fa-regular fa-heart fa-lg`} style={{color:'#9ca3af'}}></i>
                  {card.liked.length > 0 && <span style={{fontWeight: '600', color: '#fff'}}>{card.liked.length}</span>}
                </button>
              )}
              <button className={`btn btn-light d-flex justify-content-center align-items-center gap-2 action-btn`} style={{borderRadius: '25px', width: '75px', height: '42px', padding: '0'}} onClick={handleShow}>
                <i className={`fa-regular fa-comment fa-lg`} style={{color:'#9ca3af'}}></i>
                {comments.length > 0 && <span style={{fontWeight: '600', color: '#fff'}}>{comments.length}</span>}
              </button>
            </div>
          </Card.Body>
        </Card>

        <Modal show={show} size="lg" centered onHide={() => setShow(false)} contentClassName="modal-glass border-0 shadow-lg" backdropClassName="glass-backdrop">
          <Modal.Header closeButton closeVariant="white" className="border-0 pt-4 pb-3 px-4">
            <Modal.Title className="fw-bold text-white">Comments ({comments.length})</Modal.Title>
          </Modal.Header>
          <Modal.Body className='p-0 d-flex flex-column' style={{ height: '50vh' }}>
            <div className='flex-grow-1 p-4' style={{ overflowY: 'auto' }}>
              {comments.length > 0 ? (
                <div className="d-flex flex-column gap-3">
                  {comments.map((obj, i) => (
                    <CommentMessage key={i} commentObj={obj} userid={obj.commenterid} comment={obj.comment} reRender={reRender} handleClose={handleClose} />
                  ))}
                </div>
              ) : (
                <div className="h-100 d-flex flex-column justify-content-center align-items-center text-muted">
                  <i className="fa-regular fa-comments fa-3x mb-3 opacity-50"></i>
                  <h5>No comments yet</h5>
                  <p>Be the first to share your thoughts!</p>
                </div>
              )}
            </div>
          </Modal.Body>
          <Modal.Footer className="border-0 p-3">
            <InputGroup className="w-100 shadow-sm">
              <Form.Control
                placeholder="Write a comment..."
                className="rounded-start-pill border-0 px-4 py-3"
                style={{ backgroundColor: 'rgba(255,255,255,0.08)', color: 'white' }}
                onChange={e => setCommentInput(e.target.value)}
                value={commentInput}
                onKeyPress={(e) => e.key === 'Enter' && sendComment()}
              />
              <Button variant="primary" className="rounded-end-pill px-4 border-0 d-flex align-items-center" onClick={sendComment}>
                <i className="fa-solid fa-paper-plane"></i>
              </Button>
            </InputGroup>
          </Modal.Footer>
        </Modal>
    </div>
  );
}

export default PostCard;