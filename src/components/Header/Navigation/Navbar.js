import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import { signOut } from "firebase/auth";
import {auth} from "../../../firebase"
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { bookmarkEventHandler } from '../../../slices/ButtonEventSlice';
import { useState, useEffect,useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import SplitButton from '../../Dropdown';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../Loader';
import { fetchRecipe } from '../../../slices/SearchRecipeSlice';
import { setUserName } from '../../../slices/UserSlice';
import TuneIcon from '@mui/icons-material/Tune';
import { setSearchItem } from '../../../slices/SearchedItemSlice';
// import { useEffect } from 'react';
const Navbar = () => {
  // const [loader,setLoader]=useState(false);
  const dispatch = useDispatch()
  const bookmark = useSelector((state) => state.bookmark);
  const [userEmail, setUserEmail] = useState(null);
  const searchItemRef = useRef(null);
  const allrecipeList = useSelector((state) => state.recipeList);
  const userName = useSelector((state) => state.userName.Name);
  const [loading, setLoading] = useState(false);
  // useEffect(()=>{
  //   console.log("bookmark before----->",bookmark);
  // })
  const handleFetchData = () => {
    const searchValue=searchItemRef.current.value;
    console.log("search value-------------->",searchValue);
    setLoading(true);
    dispatch(setSearchItem(searchValue));
    dispatch(fetchRecipe({ apiKey: "bcffb3f9bbd6414aaf1fa753f147235f", query: searchValue,number:10 }))
    .then(()=>{
      setLoading(false)
    })
    // console.log("recipeList--------->",recipeList);
  };
  useEffect(() => {
    const auth = getAuth(); // Get the Firebase Auth instance
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Check if a user is signed in
      if (user) {
        // User is signed in
        const displayName = user.displayName; // Get the user's display name
        console.log("user------------>",user);
        dispatch(setUserName(displayName));
        setUserEmail(user.email); 
      } else {
        // No user is signed in
        // setUserName(null); // Clear the user's name from the state
        dispatch(setUserName(null));
        setUserEmail(null);
      }
    });

    // Cleanup function to unsubscribe from the auth state listener
    return () => unsubscribe();
  }, []); 
  console.log("userName-------------------->",userName)
  const userSignOut=()=>{
    signOut(auth).then(()=>{
       console.log('sign out successful.'); 
    }).catch(error=>console.log(error))
  }
  function bookmarkeventHandlerOpen(){
    dispatch(
      bookmarkEventHandler({ value: true })
    );
    console.log("bookmark---------------->",bookmark)
  }
  let options=['Logout'];
  // function bookmarkeventHandlerClose(){
  //   dispatch(
  //     bookmarkEventHandler({ value: false })
  //   );
  //   console.log("bookmark---------------->",bookmark)
  // }


  // const search_function=async()=>{
  //   try {
  //     const response = await fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=bcffb3f9bbd6414aaf1fa753f147235f&query=noodles");
  //     const data = await response.json();
  //     console.log("result--------->", data.results);
  //   } catch (error) {
  //     console.error("Failed to fetch the response:", error);
  //   }
  // }
  return (
    <header>
        <Link to="/"> <div className={classes.logo}><img className={classes.icon} src = 'Icons/Colored_LOGO.png' alt='twitter icon'></img><p>Meal Mastermind</p></div> </Link>
        <div className={classes.search_cont}>
        <div className={classes.search_container}>
          <input type="text" ref={searchItemRef} />
          <button className={classes.search_btn} onClick={handleFetchData}>{((loading)?<Loader size={30}/>:<SearchIcon style={{ marginRight:'8px' }}/>)}</button>
        </div> 
      </div>
        <nav className={classes.nav}>
          <div className={classes.bookmark_container}>
            <Link to="/add_filter"><button className={classes.addFilter_btn}><TuneIcon style={{ color: 'rgb(213 81 28)',fontSize: '1.5rem',marginRight:'8px' }}/> ADD FILTER</button></Link>
            <Link to="/add_recipe"><button className={classes.addRecipe_btn}><PostAddOutlinedIcon style={{ color: 'rgb(213 81 28)',fontSize: '1.5rem',marginRight:'8px' }}/> ADD RECIPE</button></Link>
            <button className={classes.bookmark_btn} onClick={bookmarkeventHandlerOpen}><BookmarkBorderIcon style={{ color: 'rgb(213 81 28)',fontSize: '1.5rem',marginRight:'8px' }}/> BOOKMARKS</button>
            {/* <button className={classes.addRecipe_btn}><PostAddOutlinedIcon style={{ color: 'orange',fontSize: '1.6rem',marginRight:'8px' }}/> ADD RECIPE</button> */}
            {/* <button className={classes.bookmark_btn}><BookmarkBorderIcon style={{ color: 'orange',fontSize: '1.5rem',marginRight:'8px' }}/> BOOKMARKS</button> */}
            <SplitButton username={userName} options={options} handleclick={userSignOut} email={userEmail}/>
            {/* <button className={classes.signout_btn} onClick={userSignOut}>LOGOUT</button> */}
          </div>
        </nav>
    </header>
  )
}

export default Navbar