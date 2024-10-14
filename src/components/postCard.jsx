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

    //like function
    const likeUpdate = (reqType) => {
      postData('likeUpdate', { _id:card._id,viewerid: id, reqType })
        .then(res => {
          setLiked(!res.data.liked.includes(id))
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
        
        <Card className='w-100 my-2 ' id={card?._id}>
        <Card.Body>
           <Link to={`/user/${user?._id}`} style={{textDecoration:'none'}}>
              <div className=' rounded-1 text-center ' style={{width:'max-content'}}>
                  <span><img className='img-fluid rounded-pill' style={{height:'50px',width:'50px'}} src={user?.imgUrl} alt="" /><span className='ms-2 text-black' style={{fontWeight:'bold'}}>{user?.userName}{user.userType=='employee'?<svg className='ms-2' style={{width:'30px'}} id="Capa_1" enable-background="new 0 0 512 512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"><g><g><path d="m256 512c-66.012-37.684-225-151.29-225-377.76v-73.14h15c34.673 1.377 118.623-.163 201.68-55.548l8.32-5.552 8.32 5.552c83.159 55.444 167.314 56.779 199.424 55.607l17.256-.159v73.24c0 267.383-221.99 374.756-225 377.76z" fill="#f0f7ff"/></g><path d="m481 134.24v-73.24l-17.256.159c-32.109 1.172-116.265-.163-199.424-55.607l-8.32-5.552v512c3.01-3.005 225-110.379 225-377.76z" fill="#c7cfe1"/><g><g><path d="m256 443.38c-2.617-3-165-99.914-165-309.141v-13.374l13.286-2.432c50.859-5.874 99.507-21.196 144.58-45.571l7.134-3.852 7.134 3.853c45.073 24.375 93.721 39.697 144.58 45.571l13.286 1.524v13.374c0 205.199-162.252 306.898-165 310.048z" fill="#7ed8f6"/></g></g><path d="m421 133.332v-13.374l-13.286-1.523c-50.859-5.874-99.507-21.196-144.58-45.571l-7.134-3.854v374.37c2.748-3.151 165-104.849 165-310.048z" fill="#4895ff"/><g id="Shield_2_"><g><path d="m241 307.311-55.605-55.605 21.21-21.211 34.395 34.394 79.395-79.394 21.21 21.211z" fill="#f0f7ff"/></g></g><path d="m256 292.311 85.605-85.605-21.21-21.211-64.395 64.394z" fill="#c7cfe1"/></g></svg>:''} </span></span>
              </div>
           </Link>
          </Card.Body>
          <Card.Img variant="bottom" src={card?.imgUrl}/>
          <Card.Body className='border-0'>
            <Card.Text className='text-start'>
            {card?.description}
            </Card.Text>
            <div className='d-flex   justify-content-start align-items-start'>
{
  liked?
  <button className='btn '  onClick={e=>likeUpdate('unlike')}><i className={`fa-${liked?'solid':'regular'} fa-heart fa-xl`} style={{color:liked?'red':'black'}} ></i><h6>{card.liked.length!==0?card.liked.length:''}</h6></button>
:         
   <button className='btn ' onClick={e=>likeUpdate('like')}><i className={`fa-${liked?'solid':'regular'} fa-heart fa-xl`} style={{color:liked?'red':'black'}} ></i>{card.liked.length!==0?card.liked.length:''}</button>

}
<button className='btn ' onClick={handleShow}><i className={`fa-regular fa-comment fa-xl`} ></i><h6>{comments.length!==0?comments.length:''}</h6></button>



            </div>
          </Card.Body>
        </Card>

        <Modal show={show} fullscreen={true} onHide={() => { setShow(false); }}>
        <Modal.Header closeButton>
          Comments
        </Modal.Header>
        <Modal.Body className='text-center'>
          <Row>
           <Col sm={12} className='' style={{height:'80vh',overflowY:'scroll'}}>
            {
              comments.length>0?
              comments.map(obj=>(
               
                  <CommentMessage userid={obj.commenterid} comment={obj.comment} reRender={reRender} handleClose={handleClose}></CommentMessage>
              ))
              
              :<h3 className='text-center'>No Comments</h3>
            }
           </Col>
           <Col sm={12}>
           <Container className=''>
      <InputGroup className="mb-3">
                <Form.Control
                    placeholder="type..."
                    aria-label=""
                    aria-describedby="basic-addon2"
                    value={commentInput}
                    onChange={e=>setCommentInput(e.target.value)}
                />
                <Button variant='outline-dark' className='bg-dark' id="button-addon2" onClick={sendComment}>
                    <i className="fa-solid fa-paper-plane text-white fa-xl "></i>
                </Button>
                
            </InputGroup>
      </Container>
           </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default PostCard;