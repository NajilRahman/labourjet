import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { putData,postData } from '../apiServices/apiServices';
import toast from 'react-hot-toast';

function OwnPostCard({post,userData,render,reRender}) {
  const [liked,setLiked]=useState(post.liked.includes(userData._id))
 
//like function
const likeUpdate = (reqType) => {
  postData('likeUpdate', { _id:post._id,viewerid: userData._id, reqType })
    .then(res => {
      setLiked(!res.data.liked.includes(userData._id))
      console.log(res.data.liked)
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
  return (
    <div >
        
        <Card className='w-100 my-2 ' key={post._id}  style={{minHeight:'350px'}}>
       
          <Card.Img variant="bottom" style={{height:'200px',width:'auto'}}src={post.imgUrl}/>
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

}            <button className='btn '><i className="fa-regular fa-comment fa-xl"></i></button>
            <button className='btn ' onClick={deletePost}><i className="fa-solid fa-trash fa-xl text-danger "></i></button>


            </div>
          </Card.Body>
        </Card>
    </div>
  );
}

export default OwnPostCard;