import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { FaPowerOff } from "react-icons/fa";
import {useDispatch} from "react-redux"
import { logout, setSearchTerm } from '../redux/slices/authSlice';
import toast from "react-hot-toast"

const Navbar = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [query,setQuery] = useState('')
  const handleLogout = async() =>{
   const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,{
    credentials:'include'
   })
   if(res.ok){
    const data = await res.json()
    toast.success(data.message)
    dispatch(logout()) 
    navigate("/")
   }
  }
  const  handleSubmit = (e) =>{
    e.preventDefault()
  
      dispatch(setSearchTerm(query))
      navigate("/")
   
  }
  return (
    <nav className='navbar'>
       
            <img src="logo.png" alt="logo" id='logo' width={47} onClick={()=>navigate("/")} />
        
        <form className='nav-center' onSubmit={handleSubmit}>
            <FaSearch/>
            <input type="text" placeholder='Search blogs' onChange={(e)=>setQuery(e.target.value)} value={query} />
        </form>
        <div className='nav-right'>
            <Link to={"/new"}>New Blog</Link>
            <button onClick={handleLogout}>
            <FaPowerOff size={16} />
            </button>
        </div>
    </nav>
  )
}

export default Navbar