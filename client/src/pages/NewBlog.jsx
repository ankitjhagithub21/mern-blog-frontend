import React, { useState } from 'react'
import toast from "react-hot-toast"
import { useNavigate } from 'react-router-dom'

const NewBlog = () => {
  const [title,setTitle] = useState('')
  const [content,setContent] = useState('')
  const [image,setImage] = useState(null)
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate()
  
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('image', image);
  
    try {
      setLoading(true);
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/upload`, {
        method: "POST",
        credentials: 'include',
        body: formData
      });
  
      if (res.ok) {
        const data = await res.json();
        toast.success(data.message);
        navigate("/")
        
      } else {
        const errorData = await res.json();
        toast.error(errorData.message);
      }
  
    } catch (error) {
      toast.error("Blog not uploaded.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='blog-page'>
      <h2>Create a new blog</h2>
      <form onSubmit={handleSubmit} className='blog-form' encType='multipart/form-data'>
        <input type="text" placeholder='Enter title' value={title} onChange={(e)=>setTitle(e.target.value)} required autoComplete='off'/>
        <textarea placeholder='Enter content' value={content} onChange={(e)=>setContent(e.target.value)}  rows="10" required autoComplete='off'></textarea>
        <input type="file" onChange={(e)=>setImage(e.target.files[0])} required autoComplete='off'/>
        <button type='submit'>{loading? 'Uploading...':'Upload'}</button>
      </form>
    </div>
  )
}

export default NewBlog