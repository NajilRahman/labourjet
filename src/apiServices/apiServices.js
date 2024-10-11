import axios from 'axios'

const baseURL= `https://labourjet-backend.onrender.com/`

export const postData=(path,data)=>axios.post(`${baseURL}${path}`,data)

export const getData=(path)=>axios.get(`${baseURL}${path}`)


export const putData=(path,data)=>axios.put(`${baseURL}${path}`,data)

