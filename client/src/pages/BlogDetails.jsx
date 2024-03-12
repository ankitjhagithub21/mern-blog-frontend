import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PageLoading from '../components/PageLoading'

const BlogDetails = () => {
    const {id} = useParams()
    const [loading,setLoading] = useState(false)
    const [blog,setBlog] = useState(null)
    const getBlog = async() =>{
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`,{
          credentials:'include'
        })
        const data = await res.json()
        if(data.success){
          setBlog(data.blog)
        }
        setLoading(false)
    }
    useEffect(()=>{
       getBlog()
    },[id])

    if(loading){
        return <PageLoading/>
    }
  return (
    <section>
      {
        blog ? <div className='single-blog-page'>
          <img src={`${import.meta.env.VITE_SERVER_URL}/${blog.image}`} alt="blog" />
          <h2>{blog.title}</h2>
          <p>{blog.content}</p>
        </div> : <div>
             <h2>Blog Not Found</h2>
        </div>
      }
    </section>
  )
}

export default BlogDetails