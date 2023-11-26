import React from 'react'
import list1 from '../assets/list1.png'
import Button from '@mui/material/Button';

const Block = () => {
  return (
    <div className='box'>
      <h2>Blocked Users</h2>
      <div className='list'>
        <img src={list1} />
        <h3>Friends Reunion</h3>
        <Button variant="contained">Join</Button>
      </div><div className='list'>
        <img src={list1} />
        <h3>Friends Reunion</h3>
        <Button variant="contained">Join</Button>
      </div><div className='list'>
        <img src={list1} />
        <h3>Friends Reunion</h3>
        <Button variant="contained">Join</Button>
      </div><div className='list'>
        <img src={list1} />
        <h3>Friends Reunion</h3>
        <Button variant="contained">Join</Button>
      </div><div className='list'>
        <img src={list1} />
        <h3>Friends Reunion</h3>
        <Button variant="contained">Join</Button>
      </div><div className='list'>
        <img src={list1} />
        <h3>Friends Reunion</h3>
        <Button variant="contained">Join</Button>
      </div>
    </div>
  )
}

export default Block