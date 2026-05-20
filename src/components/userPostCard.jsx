import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { postData } from '../apiServices/apiServices';
import { Col, Row, Badge, Button, Modal, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import CommentMessage from './comment';
import toast from 'react-hot-toast';

function UserPostCard({ post, userData, reRender }) {
  const id = JSON.parse(localStorage.getItem('user'))._id;

  const [liked, setLiked] = useState(post.liked.includes(id));
  // modal handel
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [commentInput, setCommentInput] = useState('');
  const [comments, setComments] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    postData('getComment', { _id: post._id })
      .then(res => {
        setComments(res.data);
      });
  }, [reload]);

  //like function
  const likeUpdate = (reqType) => {
    postData('likeUpdate', { _id: post._id, viewerid: id, reqType })
      .then(res => {
        setLiked(res.data.liked.includes(id));
        reRender(res);
      });
  };

  const sendComment = () => {
    postData('postComment', { _id: post._id, comment: commentInput, commenterid: id })
      .then(res => {
        setCommentInput('');
        toast.success('comment added');
        setReload(!reload);
      });
  };

  return (
    <div>
      <Card className='w-100 my-4 border-0 shadow-lg' key={post._id}>
        {post?.imgUrl && (
          <div style={{ width: '100%', maxHeight: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <img src={post.imgUrl} alt="Post content" style={{ maxHeight: '500px', maxWidth: '100%', objectFit: 'contain' }} />
          </div>
        )}
        <Card.Body className='border-0 pt-3'>
          <Card.Text className='text-start mb-3' style={{ fontSize: '0.95rem', lineHeight: '1.5' }}>
            {post.description}
          </Card.Text>
          <div className='d-flex justify-content-start align-items-center gap-3 mt-2'>
            {liked ? (
              <button className={`btn btn-light d-flex justify-content-center align-items-center gap-2 action-btn`} style={{ borderRadius: '25px', width: '75px', height: '42px', padding: '0' }} onClick={e => likeUpdate('unlike')}>
                <i className={`fa-solid fa-heart fa-lg`} style={{ color: '#ef4444' }}></i>
                {post.liked.length > 0 && <span style={{ fontWeight: '600', color: '#fff' }}>{post.liked.length}</span>}
              </button>
            ) : (
              <button className={`btn btn-light d-flex justify-content-center align-items-center gap-2 action-btn`} style={{ borderRadius: '25px', width: '75px', height: '42px', padding: '0' }} onClick={e => likeUpdate('like')}>
                <i className={`fa-regular fa-heart fa-lg`} style={{ color: '#9ca3af' }}></i>
                {post.liked.length > 0 && <span style={{ fontWeight: '600', color: '#fff' }}>{post.liked.length}</span>}
              </button>
            )}
            <button className={`btn btn-light d-flex justify-content-center align-items-center gap-2 action-btn`} style={{ borderRadius: '25px', width: '75px', height: '42px', padding: '0' }} onClick={handleShow}>
              <i className={`fa-regular fa-comment fa-lg`} style={{ color: '#9ca3af' }}></i>
              {comments.length > 0 && <span style={{ fontWeight: '600', color: '#fff' }}>{comments.length}</span>}
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

export default UserPostCard;