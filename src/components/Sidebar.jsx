import React, { useState, createRef } from 'react'
import { FaHome } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { CiSettings } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import { getAuth, updateProfile } from "firebase/auth";


// const defaultSrc =
//   "https://raw.githubusercontent.com/roadmanfong/react-cropper/master/example/img/child.jpg";

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

const Sidebar = () => {

  const auth = getAuth();

  const storage = getStorage();
  // let userInfo = useSelector((state)=>console.log(state.activeUser.value.displayName))
  let userInfo = useSelector((state)=>state.activeUser.value)
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [image, setImage] = useState("");
  const [cropData ,setCropData] = useState("#");
  const cropperRef = createRef();


  const onChange = (e) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(files[0]);
  };

  const getCropData = () => {
    if (typeof cropperRef.current?.cropper !== "undefined") {
      // setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
      // console.log(cropperRef.current?.cropper.getCroppedCanvas().toDataURL())
      // const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
      const message4 = cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
      const storageRef = ref(storage, userInfo.uid);

      uploadString(storageRef, message4, 'data_url').then((snapshot) => {
      // console.log('Uploaded a data_url string!', snapshot);
      getDownloadURL(storageRef).then((downloadURL) => {
        console.log('File available at', downloadURL);
        updateProfile(auth.currentUser, {
          photoURL: downloadURL
        }).then(()=>{
          console.log("user")
          dispatch
        })
      });
  
});
    }
  };

  return (
    <div className='sidebar'>
        <h3>{userInfo.displayName}</h3>
      <div onClick={handleOpen}>
        <img src={userInfo.photoURL} className='profilimg'/>
      </div>
      <div className='icons'>
        <Link to="/page/home" className='active'>
          <FaHome className='icon '/><br/>
        </Link>
        <Link to="/page/msg">
          <FaMessage className='icon'/><br/>
        </Link>
        <Link to="/page/notification">
          <IoIosNotifications className='icon'/><br/>
        </Link>
        <Link to="/page/setting">
          <CiSettings className='icon'/>
        </Link>
      </div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Upload your profile
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {image ?
          <div className='previewbox'>
          <div
            className="img-preview"
          />
        </div>
          :
          <img src={userInfo.photoURL} className='profilimg'/>
          }
            <input type='file' onChange={onChange}/>
          {image && 
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
          guides={true}
        />
        }
        
        {image &&
        <Button variant="outlined" onClick={getCropData}>Upload</Button>
        }
          </Typography>
        </Box>
      </Modal>
    </div>
  )
}

export default Sidebar