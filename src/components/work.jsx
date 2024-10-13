import React, { useEffect, useState } from 'react'
import WorkCard from './workCard'
import { Row,Col } from 'react-bootstrap'
import { postData } from '../apiServices/apiServices'
import Loading from './spinner'
function Work({render}) {
  const id=JSON.parse(localStorage.getItem('user'))._id
  const [works,setWorks]=useState([])
  const [loading,setLoading]=useState(true)
  const [reRender,setReRender]=useState('')
  useEffect(()=>{
    postData('getWorksData',{id})
    .then(res=>{
      setWorks(res.data.reverse())
      console.log(res.data)
      setLoading(false)
    })
  },[reRender])
  return (
    <div id='scroller' sm={12} md={6} className=' bg-white  p-5 ' style={{ maxHeight: '100vh ',height:'100vh', overflowX: 'hidden', overflowY: 'scroll' }}>
        <h1 className='text-black'>Work Details</h1>
     <Row>
       {loading?      <div style={{height:'80vh'}}  className='d-flex justify-content-center align-items-center'><Loading/></div>

        :works.map(obj=>(
          <Col sm={12} md={6}>     
          <WorkCard workData={obj} render={setReRender} />
         </Col>
        ))
       }
     </Row>
    </div>
  )
}

export default Work
