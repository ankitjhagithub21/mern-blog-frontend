import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast"
import { useNavigate, useParams } from 'react-router-dom'
import PageLoading from '../components/PageLoading'

const UpdateBlog = () => {
    const { id } = useParams()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [blog, setBlog] = useState(null)


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {

            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(blog)
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
            toast.error("Blog not updated.");
            console.log(error);
        }finally{
            setLoading(false)
        }
    };

    const getBlog = async () => {
        setLoading(true)
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
            credentials: 'include'
        })
        const data = await res.json()
        if (data.success) {
            setBlog(data.blog)
        }
        setLoading(false)
    }
    useEffect(() => {
        getBlog()
    }, [id])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog({
            ...blog,
            [name]: value
        })
    }

    if (loading) {
        return <PageLoading />
    }

    if (!blog) {
        return <p>Blog not found.</p>
    }
    return (
        <div className='blog-page'>
            <h2>Update blog</h2>
            <form onSubmit={handleSubmit} className='blog-form'>
                <input type="text" placeholder='Enter title' name='title' value={blog.title} onChange={handleChange} required autoComplete='off' />
                <textarea placeholder='Enter content' name="content" value={blog.content} onChange={handleChange} rows="10" required autoComplete='off'></textarea>

                <button type='submit'>Save Changes</button>
            </form>
        </div>
    )
}

export default UpdateBlog