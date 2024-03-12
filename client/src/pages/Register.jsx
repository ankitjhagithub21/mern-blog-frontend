import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEye,FaEyeSlash } from "react-icons/fa";
import Loader from '../components/Loader';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
const Register = () => {
    const navigate = useNavigate()
    const user = useSelector(state=>state.auth.user)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword,setShowPassword] = useState(false)
    const [loading,setLoading] = useState(false)

    const handleSubmit = async(e) => {
        e.preventDefault()
        if(username.length<5){
            toast.error("Username must be at least 5 characters long");
            return 
        }
        if(password.length<6){
            toast.error("Password must be at least 6 characters long");
            return
        }
        
        const formData= {
            username:username.toLowerCase(),
            password
        }

        try{
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            const data = await res.json()
            if(res.ok){
                setUsername('')
                setPassword('')
                toast.success(data.message)
                navigate("/login")
               
            }else{
                toast.error(data.message)
            }
        }catch(error){
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    if(user){
        return <Navigate to={"/"}/>
    }

    return (
        <div className='auth-page'>
            <div className="form-container">
                <h2>Create an account</h2>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required autoComplete='off' />
                    <div className='pass-input'>
                        <input type={showPassword ? 'text' : 'password'} placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required autoComplete='off' />

                        <button className="show-hide-pass" type='button' onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                    <button type='submit' className='form-btn'>
                        {loading ? <Loader/> :'Create'}
                    </button>
                </form>
                <p>Already have an account ? <Link to={"/login"}>Login Here</Link></p>
            </div>
        </div>
    )
}

export default Register