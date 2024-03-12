import React from 'react'
import { BrowserRouter, Routes, Route} from "react-router-dom"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { Toaster } from "react-hot-toast"
import "./App.css"
import { useSelector } from "react-redux"
import Navbar from './components/Navbar'
import NewBlog from './pages/NewBlog'
import BlogDetails from './pages/BlogDetails'
import UpdateBlog from './pages/UpdateBlog'

const App = () => {

  const user = useSelector(state=>state.auth.user)  
 
  
  return (
    <BrowserRouter>
    {user && <Navbar/>}
      <Toaster />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/new' element={<NewBlog />} />
        <Route path='/blogs/:id' element={<BlogDetails />} />
        <Route path='/blogs/update/:id' element={<UpdateBlog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App