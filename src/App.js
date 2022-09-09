import React, {useEffect, useState} from 'react';
import './App.css';
import Post from './Post';
import { auth, db } from './firebase.js';
import { Button, Input, Modal } from '@mui/material';
import { makeStyles } from "@mui/styles";
import ImageUpload from './ImageUpload';


function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
const useStyles = makeStyles({
  paper: {
    width: 400,
    position: 'absolute',
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    padding: '30px',
  },
});
function App() {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [posts,setPosts] = useState([]);
  const [open,setOpen] = useState(false);
  const [openSignIn,setOpenSignIn] = useState(false);
  const [username,setUsername] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [user,setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if(authUser){
        console.log(authUser);
        setUser(authUser);
      }else{
        setUser(null);
        console.log('user logged out');
      }
    });
    return () => {
      unsubscribe();
    }
  } ,[user, username]);

  useEffect(() => {
    db.collection('posts').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  },[]);
  const signUp = (event) => {
    event.preventDefault();
    auth
    .createUserWithEmailAndPassword(email,password)
    .then(authUser => {
      return authUser.user.updateProfile({
        displayName: username
      })
    })
    .catch(error => alert(error.message));
    setOpen(false);
  };
  const signIn = (event) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email,password)
      .catch(error => alert(error.message));
    setOpenSignIn(false);
  };
  return (
    <div className="App">
      {
        username ? (
          <ImageUpload username={username}/>
        ):(
          <h3>Sorry you need to login to upload</h3>
        )
      } 
    
      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className='app__headerImage'
                src="https://www.pngkey.com/png/full/2-27715_instagram-png-logo-instagram-word-logo-png.png"
                alt="Google Logo"
              />
            </center>
            <Input
                placeholder='Username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>
      <Modal
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img
                className='app__headerImage'
                src="https://www.pngkey.com/png/full/2-27715_instagram-png-logo-instagram-word-logo-png.png"
                alt="Google Logo"
              />
            </center>
            <Input
              placeholder='email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type='submit' onClick={signIn}>Sign In</Button>
          </form>
        </div>
      </Modal>
     <div className="app__header">
       <img
        className='app__headerImage'
        src="https://www.pngkey.com/png/full/2-27715_instagram-png-logo-instagram-word-logo-png.png"
        alt="Google Logo"
       />
     </div>
     {
        user ? (
          <Button onClick={()=>auth.signOut()}>Logout</Button>
        ):(
          <div className=''>
            <Button onClick={()=>setOpenSignIn(true)}>Sign In</Button>
            <Button onClick={()=>setOpen(true)}>Sign Up</Button>
          </div>
        )
    }
     {
       posts.map(({id,post}) => (
        <Post key={ id } userName={ post.userName } caption={ post.caption } imageUrl={ post.imageUrl }/>
       ))
     }
     

    </div>
  );
}

export default App;
