import { useState,useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RegImg from '../assets/registrationimg.webp'
import { styled } from '@mui/material/styles';
// import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import { getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loggedUser } from '../slices/userSlice';


const MyInput = styled(TextField)({
  width: '90%',
  marginBottom:'20px',
});

const MyButton = styled(Button)({

backgroundColor: 'red',
width: '90%',
padding: '20px 0',
borderRadius: '86px'
});

const Login = () => {

  let nagivate = useNavigate()
  let dispatch = useDispatch()
  let userInfo = useSelector(state=>state.activeUser.value)
  // console.log(userInfo)


  const auth = getAuth();

  let [loader,setLoder] = useState(false)
  
  let [regdata,setRegdata] = useState({
    email: "",
    password: ""
  })

  // let [errordata,setErrordata] = useState({
  //   emailError:"",
  //   fullnameError:"",
  //   passwordError:""
  // })

  let handleChange = (e)=>{
    // console.log(e.target.name , e.target.value)
    setRegdata({...regdata,[e.target.name]: e.target.value})
    // console.log(regdata)
  }

  let handleSubmit = ()=>{
    setLoder(true)
    signInWithEmailAndPassword(auth, regdata.email, regdata.password).then((userCredential) => {
      console.log(userCredential)
      dispatch(loggedUser(userCredential.user))
      localStorage.setItem("user",JSON.stringify(userCredential.user))
      if(userCredential.user.emailVerified){
        setRegdata({
          email: "",
          password: ""
        })
        setLoder(false)
        nagivate("/logout")
      }else{
        toast("please varify your email")
        setLoder(false)
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      setLoder(false)
      console.log(errorCode)
      if(errorCode.includes("login")){
        toast("Your system is hacked")
      }
    });


    // if(regdata.email == ""){
    //   toast.error("Please give an email")
    //   // setErrordata({...errordata,emailError:"Please give an email"})
    // }else{
    //   let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    //   // console.log(pattern.test(regdata.email))
    //   if(!pattern.test(regdata.email)){
    //     toast.error("Please give an valid email")
    //   }
    // }
    // if(regdata.fullname == ""){
    //   toast.error("Please give an Fullname")
    //   // setErrordata({...errordata,emailError:"Please give an Fullname"})
    // }
    // if(regdata.password == ""){
    //   toast.error("Please give an password")
    //   // setErrordata({...errordata,emailError:"Please give an password"})
    // }
    // // else{
    // //   // let uptoEightcaracter = /(?=.{8,})/
    // //   // let spacialCaracter = /(?=.*[0-9])/
    // //   // let number = /(?=.*[0-9])/
    // //   // let uppercase = /(?=.*[A-Z])/
    // //   // let lowercase = /(?=.*[a-z])/
    // //   var regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    // //   if(!regularExpression.test(regdata.password)){
    // //     toast.error("Please add capital lowercase number and specual character")
    // //   }
    // // }
  }

  useEffect(()=>{
    if(userInfo != null){
      nagivate("/logout")
    }
  },[])

  return (
    <Grid container spacing={2}>
        
      <Grid item xs={6}>
        <div className='regBox'>
          <h1>Get started with easily register</h1>
          <p>Free register and you can enjoy it</p>
          <div>
            <MyInput onChange={handleChange} name='email' id="outlined-basic" label="Email Address" variant="outlined" value={regdata.email} />
            {/* {errordata.emailError &&
            <Alert severity="error">
              {errordata.emailError}
            </Alert>
            } */}
          </div>
          
          <div>
            <MyInput onChange={handleChange} name='password' type='password' id="outlined-basic" label="Password" variant="outlined" value={regdata.password} />
          </div>
          {loader 
          ? 
          <ColorRing
          visible={true}
          height="80"
          width="80"
          ariaLabel="blocks-loading"
          wrapperStyle={{}}
          wrapperClass="blocks-wrapper"
          colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
          />
          :
          <>
          <MyButton onClick={handleSubmit} variant="contained">Contained</MyButton>
          </>
          }

        </div>
      </Grid>
      <Grid item xs={6}>
        <img className='regImg' src={RegImg} />
      </Grid>
    </Grid>
  )
}

export default Login