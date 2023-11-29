import { useState } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import RegImg from '../assets/registrationimg.webp'
import Google from '../assets/Google.png'
import { styled } from '@mui/material/styles';
// import Alert from '@mui/material/Alert';
import { toast } from 'react-toastify';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, GoogleAuthProvider,sendPasswordResetEmail } from "firebase/auth";
import { ColorRing } from 'react-loader-spinner'
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { getDatabase, push, ref, set } from "firebase/database";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


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

const Registation = () => {

  const db = getDatabase();

  let nagivate = useNavigate()

  const auth = getAuth();

  let [loader,setLoder] = useState(false)
  
  let [regdata,setRegdata] = useState({
    email: "",
    remail: "",
    fullname: "",
    password: ""
  })

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    createUserWithEmailAndPassword(auth, regdata.email, regdata.password).then((userCredential) => {
      console.log(userCredential.user.uid)
      sendEmailVerification(auth.currentUser)
  .then(() => {
    set(push(ref(db, 'users')), {
      username: regdata.fullname,
      email: userCredential.user.email,
      profile_picture : "https://firebasestorage.googleapis.com/v0/b/binodon-706c0.appspot.com/o/avata.jpg?alt=media&token=a30b0498-9ebf-4ecc-bd3b-7740f3dea871"
    });
  
    setRegdata({
      email: "",
      fullname: "",
      password: ""
    })
    setLoder(false)
    nagivate("/login")
  });
      console.log(userCredential)
      // setRegdata({
      //   email: "",
      //   fullname: "",
      //   password: ""
      // })
      // setLoder(false)
      // nagivate("/login")
    })
    .catch((error) => {
      const errorCode = error.code;
      setLoder(false)
      console.log(errorCode)
      if(errorCode.includes("email")){
        toast("Email alrady used ")
      }
      if(errorCode.includes("password")){
        toast("please enterd a password atlist 6 caracter")
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

  let handleSingin = ()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then(()=>{
      nagivate("/login")
    })
  }

  let handleForgotpass = ()=>{
    sendPasswordResetEmail(auth, regdata.remail)
     .then(() => {
    console.log("done")
     })
     .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode,errorMessage)
     });
  }

  return (
    <Grid container spacing={2}>
        
      <Grid item xs={6}>
        <div className='regBox'>
          <h1>Get started with easily register</h1>
          <p>Free register and you can enjoy it</p>
          <div>
            <img src={Google} alt="Google" onClick={handleSingin}/>
            <MyInput onChange={handleChange} name='email' id="outlined-basic" label="Email Address" variant="outlined" value={regdata.email} />
            {/* {errordata.emailError &&
            <Alert severity="error">
              {errordata.emailError}
            </Alert>
            } */}
          </div>
          <div>
            <MyInput onChange={handleChange} name='fullname' id="outlined-basic" label="Full Name" variant="outlined" value={regdata.fullname} />
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
          <MyButton onClick={handleSubmit} variant="contained">Sing up</MyButton>
          <Button onClick={handleOpen}>Forgot password ?</Button>
          </>
          }

        </div>
      </Grid>
      <Grid item xs={6}>
        <img className='regImg' src={RegImg} />
      </Grid>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Recover Your Password
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <MyInput onChange={handleChange} name='remail' type='text' id="outlined-basic" label='Email' variant="outlined" value={regdata.remail} />
          <MyButton onClick={handleForgotpass} variant="contained">Recover</MyButton>
          </Typography>
        </Box>
      </Modal>

    </Grid>
  )
}

export default Registation