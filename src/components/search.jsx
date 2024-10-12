import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Recommendation from './Recommendation';
import { getData, postData } from '../apiServices/apiServices';
function Search({userData,render}) {
    
    const [search,setSearch]=useState('')
    const [find,setFind]=useState([])
    const searchUser=()=>{
        postData('findUser',{search})
        .then(res=>{
           setFind(res.data)
        })
    }

  
    
    return (
        <div className='p-2'>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Search Nearest Labour"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    onChange={e=>setSearch(e.target.value)}
                />
                <Button variant="outline-secondary" id="button-addon2" onClick={searchUser}>
                    <i className="fa-solid fa-magnifying-glass text-black "></i>
                </Button>
            </InputGroup>
            <div id='scroller' sm={12} md={6} className=' bg-white   p-1 ' style={{ maxHeight: '100vh ', overflowX: 'hidden', overflowY: 'scroll' }}>
            <Row>
                {
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
