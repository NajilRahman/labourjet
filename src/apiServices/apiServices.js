import axios from 'axios'

// const baseURL= `http://localhost:3000/`
const baseURL= `https://labourjet-backend.onrender.com/`

export const postData=(path,data)=>axios.post(`${baseURL}${path}`,data)

export const getData=(path)=>axios.get(`${baseURL}${path}`)

export const deleteData=(path)=>axios.delete(`${baseURL}${path}`)


export const putData=(path,data)=>axios.put(`${baseURL}${path}`,data)

