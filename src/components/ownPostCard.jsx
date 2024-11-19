import { useState,useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import { putData,postData } from '../apiServices/apiServices';
import toast from 'react-hot-toast';
import { Col, Row, Button, Modal, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CommentMessage from './comment';
function OwnPostCard({post,userData,render,reRender}) {
  const id = JSON.parse(localStorage.getItem('user'))._id
  const [liked,setLiked]=useState(post.liked.includes(userData._id))
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
 
  const [commentInput,setCommentInput]=useState('')
const [comments,setComments]=useState([])
const [reload,setReload]=useState(false)

useEffect(() => {
 postData('getComment',{_id:post._id})
 .then(res=>{
  setComments(res.data)
 })
}, [reload])
//like function
const likeUpdate = (reqType) => {
  postData('likeUpdate', { _id:post._id,viewerid: userData._id, reqType })
    .then(res => {
      setLiked(!res.data.liked.includes(userData._id))
      render(res)
    })
}


//delete post
    const deletePost=()=>{
      putData('updatePost',post)
      .then(res=>{
        toast.success('post deleted successfully')
        reRender(res)
        render(res)
      })
    }

//sendComment
    const sendComment=()=>{
      postData('postComment',{_id:post._id,comment:commentInput,commenterid:id})
      .then(res=>{
        setReload(!reload)
        setCommentInput('')
        toast.success('comment added')

      })
    }
  return (
    <div >
        
        <Card className='w-100 my-2 ms-3 shadow' key={post._id}  >
       
          <Card.Img variant="bottom" style={{height:'auto',width:'auto'}}src={post.imgUrl}/>
          <Card.Body className='border-0'>
            <Card.Text className='text-start'>
              {post.description}
            </Card.Text>
            <div className='d-flex   justify-content-start align-items-start'>
            {
  liked?
  <button className='btn '  onClick={e=>likeUpdate('unlike')}><i className={`fa-${liked?'solid':'regular'} fa-heart fa-xl`} style={{color:liked?'red':'black'}} ></i><h6>{post.liked.length!==0?post.liked.length:''}</h6></button>
:         
   <button className='btn ' onClick={e=>likeUpdate('like')}><i className={`fa-${liked?'solid':'regular'} fa-heart fa-xl`} style={{color:liked?'red':'black'}} ></i>{post.liked.length!==0?post.liked.length:''}</button>

}            <button className='btn ' onClick={handleShow}><i className={`fa-regular fa-comment fa-xl`} ></i><h6>{comments.length!==0?comments.length:''}</h6></button>
 <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="fa-solid fa-circle-info fa-xl text-warning"></i>
              </button>
              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <li>
                  <a className="dropdown-item" href="#" onClick={deletePost}>
                    <i className="fa-solid fa-trash text-danger me-2"></i> Delete Post
                  </a>
                </li>
                {/* Add other actions if necessary */}
                <li><a className="dropdown-item" href="#"><i className="fa-regular fa-pen-to-square me-2 text-success"></i>edit Post</a></li>
              </ul>
            </div>
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
                    onChange={e=>setCommentInput(e.target.value)}
                    value={commentInput}
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

export default OwnPostCard;