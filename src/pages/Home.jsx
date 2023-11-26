import Grid from '@mui/material/Grid';
import GroupList from '../components/GroupList';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import Mygroups from '../components/Mygroups';
import UserList from '../components/UserList';
import Block from '../components/Block';

// import Button from '@mui/material/Button';
// import { getAuth, signOut } from "firebase/auth";
// import { useNavigate } from 'react-router-dom';
// import { useDispatch,useSelector } from 'react-redux';
// import { loggedUser } from '../slices/userSlice';
// import { useEffect } from 'react';



const Home = () => {
  // const auth = getAuth();

  // let navigate = useNavigate()
  // let dispatch = useDispatch()

  // let userInfo = useSelector(state=>state.activeUser.value)
  // console.log(userInfo)

  // let handleLogout =()=>{
  //   signOut(auth).then(() => {
  //     navigate("/login")
  //     dispatch(loggedUser(null))
  //     localStorage.removeItem("null")
  //   })
  // }

  // useEffect(()=>{
  //   if(userInfo == null){
  //     navigate("/login")
  //   }
  // },[])

  return (
    // userInfo == null
    // ?
    // <h1>Please Login</h1>
    // :
    // // <Button onClick={handleLogout} variant="contained">Logout</Button>

    <Grid container spacing={2}>
        <Grid item xs={4}>
         <GroupList/>
         <FriendRequest/>
        </Grid>
        <Grid item xs={4}>
          <Friends/>
          <Mygroups/>
        </Grid>
        <Grid item xs={4}>
          <UserList/>
          <Block/>
        </Grid>
      </Grid>
  )
}

export default Home