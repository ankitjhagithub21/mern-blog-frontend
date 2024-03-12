import React ,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import PageLoading from '../components/PageLoading'
import Blogs from './Blogs'
import { login,setLoading } from '../redux/slices/authSlice'
const Home = () => {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.auth.loading)
  const user = useSelector(state => state.auth.user)
  const getUser = async () => {
    dispatch(setLoading(true))
    const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`, {
      credentials: 'include'
    })
    if (res.ok) {
      const data = await res.json()
      dispatch(login(data.user))
    }
    dispatch(setLoading(false))
  }

  useEffect(() => {
    if (user == null) {
      getUser()
    }
  }, [])

  if (loading) {
    return <PageLoading />
  }
  if (!user) {
    return <Navigate to={"/login"} />
  }
  return (
    <div>
      {user && <Blogs />}
    </div>
  )
}

export default Home