

import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { loggedUser } from '../slices/userSlice';
import { useEffect } from 'react';



const Logout = () => {
  const auth = getAuth();

  let navigate = useNavigate()
  let dispatch = useDispatch()

  let userInfo = useSelector(state=>state.activeUser.value)
  console.log(userInfo)

  let handleLogout =()=>{
    signOut(auth).then(() => {
      navigate("/login")
      dispatch(loggedUser(null))
      localStorage.removeItem("user")
    })
  }

  useEffect(()=>{
    if(userInfo == null){
      navigate("/login")
    }
  },[])

  return (
    userInfo == null
    ?
    <h1>Please Login</h1>
    :
    <Button onClick={handleLogout} variant="contained">Logout</Button>

    
  )
}

export default Logout