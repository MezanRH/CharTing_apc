import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { getDatabase, ref, onValue } from "firebase/database";
import TextField from '@mui/material/TextField';
import { useSelector } from 'react-redux';

const UserList = () => {
  const db = getDatabase();

  let [userList,setUserList] = useState([])
  let [searchUserList,setSearchUserList] = useState([])

  let userInfo = useSelector((state)=>state.activeUser.value)
  
  useEffect(()=>{
    const userRef = ref(db, 'users');
    onValue(userRef, (snapshot) => {

      let arr = []

    snapshot.forEach(item=>{
      if(item.key != userInfo.uid){

        arr.push(item.val())
      }
      
      // console.log(item.key)
    })
    setUserList(arr)

});
  },[])

  let handleSearch = (e)=>{
    // console.log(e.target.value)

    let user = userList.filter(item=>item.username.toLowerCase().includes(e.target.value.toLowerCase()))

    console.log(user)

    setSearchUserList(user)

    // userList.filter(item=>{
    //   console.log(item.username.toLowerCase().includes(e.target.value.toLowerCase()))
    // })

  }

  return (
    <div className='box'>
      <h2>User List</h2>
      <TextField onChange={handleSearch} id="outlined-basic" label="Search user" variant="outlined" />
      {
        searchUserList.length > 0 ?

        searchUserList.map(item=>(
          <div className='list' key={item.uId}>
            <img src={item.profile_picture} />
            <h3>{item.username}</h3>
            <Button variant="contained">Join</Button>
          </div>
          ))

        :
         searchUserList == userList ? 


        userList.map(item=>(
        <div className='list' key={item.uId}>
          <img src={item.profile_picture} />
          <h3>{item.username}</h3>
          <Button variant="contained">Join</Button>
        </div>
        ))

        :
        <h1>No search found</h1>
      }

      
    </div>
  )
}

export default UserList