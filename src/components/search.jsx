import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Recommendation from './Recommendation';
import { getData, postData } from '../apiServices/apiServices';
import Loading from './spinner';
function Search({userData,render}) {
    
    const [search,setSearch]=useState('')
    const [find,setFind]=useState([])
    const [loading,setLoading]=useState(false)
    const searchUser=()=>{
        setLoading(true)
        postData('findUser',{search})
        .then(res=>{
           setFind(res.data)
           setLoading(false)
        })
    }

  
    
    return (
        <div className='p-2'>
            <InputGroup className="mb-4 shadow-sm" style={{ borderRadius: '10px', overflow: 'hidden' }}>
                <Form.Control
                    placeholder="Search specialists (e.g. plumber, designer, state...)"
                    aria-label="Search specialists"
                    aria-describedby="button-addon2"
                    onChange={e=>setSearch(e.target.value)}
                    style={{ borderRight: 'none' }}
                />
                <Button className="btn btn-primary d-flex align-items-center justify-content-center" id="button-addon2" onClick={searchUser}>
                    <i className="fa-solid fa-magnifying-glass text-white"></i>
                </Button>
            </InputGroup>
            <div id='scroller' className='p-1' style={{ maxHeight: '75vh', overflowX: 'hidden', overflowY: 'auto' }}>
            <Row>
                {   loading?<div style={{height:'100vh'}}  className='d-flex justify-content-center align-items-center'><Loading/></div>
                    :
                    find.length>0?
                    find.map(obj=>(
                        <Col sm={12} md={4}><Recommendation userData={obj} render={render} /></Col>
                    ))
                    :<h3 className='text-center'>No user Founded</h3>
                }
            </Row>
            </div>
            
        </div>
    )
}

export default Search
