import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageLoading from '../components/PageLoading'
import { FaTrash, FaEye, FaEdit } from "react-icons/fa"
import toast from "react-hot-toast"
import { useSelector } from 'react-redux'

const Blogs = () => {
  const [loading, setLoading] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [filteredBlogs, setFilteredBlogs] = useState([])
  const searchTerm = useSelector(state => state.auth.searchTerm)
  const navigate = useNavigate()

  const getBlogs = async () => {
    setLoading(true)
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs`, {
      credentials: 'include'
    })
    if (res.ok) {
      const data = await res.json()
      setBlogs(data.blogs)
      setFilteredBlogs(data.blogs) // Set filtered blogs initially
    }
    setLoading(false)
  }

  const removeBlog = async (id) => {
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
      method: "DELETE",
      credentials: 'include'
    })
    if (res.ok) {
      const data = await res.json()
      const updatedBlogs = blogs.filter(blog => blog._id !== id)
      setBlogs(updatedBlogs)
      setFilteredBlogs(updatedBlogs) // Update filtered blogs after removal
      toast.success(data.message)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    // Filter blogs based on searchTerm
    if (searchTerm) {
      const filtered = blogs.filter(blog =>
        blog.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredBlogs(filtered)
    } else {
      setFilteredBlogs(blogs)
    }
  }, [searchTerm, blogs])

  return (
    <section className='blog-section'>
      <h2>Your Blogs</h2>
      {loading && <PageLoading />}
      {!loading && filteredBlogs.length === 0 && <p>Blog not found.</p>}
      <div className='blog-container'>
        {filteredBlogs.map((blog) => (
          <div key={blog._id} className='blog'>
            <img src={`${import.meta.env.VITE_SERVER_URL}/${blog.image}`} alt='blog' />
            <h4 onClick={() => navigate(`/blogs/${blog._id}`)}>{blog.title}</h4>
            <div className='blog-icons'>
              <FaTrash color='red' onClick={() => removeBlog(blog._id)} />
              <FaEdit color='green' onClick={() => navigate(`/blogs/update/${blog._id}`)} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Blogs
