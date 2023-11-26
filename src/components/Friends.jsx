import list1 from '../assets/list1.png'
import Button from '@mui/material/Button';

const Friends = () => {
  return (
    <div className='box'>
      <h2>Friends</h2>
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

export default Friends