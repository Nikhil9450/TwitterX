import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import { signOut } from "firebase/auth";
import {auth} from "../../../firebase"
import SearchIcon from '@mui/icons-material/Search';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import { useSelector, useDispatch } from 'react-redux'
import { bookmarkEventHandler } from '../../../slices/ButtonEventSlice';
import { useEffect } from 'react';
const Navbar = () => {
  const dispatch = useDispatch()
  const bookmark = useSelector((state) => state.bookmark);
  const recipeList = useSelector((state) => state.recipeList);
  // useEffect(()=>{
  //   console.log("bookmark before----->",bookmark);
  // })
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
  function bookmarkeventHandlerClose(){
    dispatch(
      bookmarkEventHandler({ value: false })
    );
    console.log("bookmark---------------->",bookmark)

  }

  const handleFetchData = () => {
    dispatch(fetchRecipe({ apiKey: "bcffb3f9bbd6414aaf1fa753f147235f", query: "noodles" }));
    console.log("recipeList--------->",recipeList);
  };


  const search_function=async()=>{
    try {
      const response = await fetch("https://api.spoonacular.com/recipes/complexSearch?apiKey=bcffb3f9bbd6414aaf1fa753f147235f&query=noodles");
      const data = await response.json();
      console.log("result--------->", data.results);
    } catch (error) {
      console.error("Failed to fetch the response:", error);
    }
  }
  return (
    <header>
        <Link to="/"> <div className={classes.logo}><img className={classes.icon} src = 'Icons/Colored_LOGO.png' alt='twitter icon'></img><p>Meal Mastermind</p></div> </Link>

        <div className={classes.search_container}>
              <input type="text" />
              <button className={classes.search_btn} onClick={handleFetchData}><SearchIcon style={{ marginRight:'8px' }}/> SEARCH</button>
        </div> 
        <nav>
          <div className={classes.bookmark_container}>
            <Link to="/add_recipe"><button className={classes.addRecipe_btn}><PostAddOutlinedIcon style={{ color: 'orange',fontSize: '1.6rem',marginRight:'8px' }}/> ADD RECIPE</button></Link>
            <button className={classes.bookmark_btn} onClick={bookmarkeventHandlerOpen}><BookmarkBorderIcon style={{ color: 'orange',fontSize: '1.5rem',marginRight:'8px' }}/> BOOKMARKS</button>
            {/* <button className={classes.addRecipe_btn}><PostAddOutlinedIcon style={{ color: 'orange',fontSize: '1.6rem',marginRight:'8px' }}/> ADD RECIPE</button> */}
            {/* <button className={classes.bookmark_btn}><BookmarkBorderIcon style={{ color: 'orange',fontSize: '1.5rem',marginRight:'8px' }}/> BOOKMARKS</button> */}
            <button className={classes.signout_btn} onClick={userSignOut}>LOGOUT</button>
          </div>
        </nav>
    </header>
  )
}

export default Navbar