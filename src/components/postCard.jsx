import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { postData } from '../apiServices/apiServices';
function PostCard({card,render,reRender}) {
  const id=JSON.parse(localStorage.getItem('user'))._id
    const [liked,setLiked]=useState(card.liked.includes(id))
    const [user,setUser]=useState({})  
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
                  <span><img className='img-fluid rounded-pill' style={{height:'50px',width:'50px'}} src={user?.imgUrl} alt="" /><span className='ms-2 text-black' style={{fontWeight:'bold'}}>{user?.userName}</span></span>
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
            <button className='btn '><i className="fa-regular fa-comment fa-xl"></i></button>



            </div>
          </Card.Body>
        </Card>
    </div>
  );
}

export default PostCard;