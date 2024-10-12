import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import {  postData} from '../apiServices/apiServices';
import { Col, Row, Badge, Button, Modal, Container } from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CommentMessage from './comment';
import toast from 'react-hot-toast';
function UserPostCard({ post, userData,reRender }) {
  const id = JSON.parse(localStorage.getItem('user'))._id

  const [liked, setLiked] = useState(post.liked.includes(id))
 // modal handel
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
    postData('likeUpdate', { _id: post._id, viewerid: userData._id, reqType })
      .then(res => {
        setLiked(!liked)
        reRender(res)
      })
  }


  const sendComment=()=>{
    postData('postComment',{_id:post._id,comment:commentInput,commenterid:id})
    .then(res=>{
      console.log(res.data)
      setCommentInput('')
      toast.success('comment added')
      setReload(!reload)
    })
  }
  return (
    <div >

      <Card className='w-100 my-2 ' key={post.postid} >
        
        <Card.Img variant="bottom" style={{ height: 'auto', width: 'auto' }} src={post?.imgUrl} />
        <Card.Body className='border-0'>
          <Card.Text className='text-start'>
            {post.description}
          </Card.Text>
          <div className='d-flex   justify-content-start align-items-start'>
            {
  liked?
  <button className='btn '  onClick={e=>likeUpdate('unlike')}><i className={`fa-${liked?'solid':'regular'} fa-heart fa-xl`} style={{color:liked?'red':'black'}} ></i><h6>{post.liked.length!==0?post.liked.length:''}</h6></button>
:         
   <button className='btn ' onClick={e=>likeUpdate('like')}><i className={`fa-${liked?'solid':'regular'} fa-heart fa-xl`} style={{color:liked?'red':'black'}} ></i><h6>{post.liked.length!==0?post.liked.length:''}</h6></button>

}         
<button className='btn ' onClick={handleShow}><i className={`fa-regular fa-comment fa-xl`} ></i><h6>{comments.length!==0?comments.length:''}</h6></button>



            </div>
        </Card.Body>
      </Card>





      <Modal show={show} fullscreen={true} onHide={() => { setShow(false); }}>
        <Modal.Header closeButton>
          Comments
        </Modal.Header>
        <Modal.Body className='text-center shadow'>
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

export default UserPostCard;