import Grid from '@mui/material/Grid';
import GroupList from '../components/GroupList';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import Mygroups from '../components/Mygroups';
import UserList from '../components/UserList';
import Block from '../components/Block';


const Home = () => {
  

  return (
    

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