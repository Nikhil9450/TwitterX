import React from 'react'
import classes from './RecipeListContainer.module.css';
import Recipe from '../../Recipe';
import { useSelector,useDispatch} from 'react-redux';
import { useEffect ,useRef} from 'react';
import { fetchRecipe } from '../../../slices/SearchRecipeSlice';
import SearchIcon from '@mui/icons-material/Search';
import Loader from '../../Loader';

const RecipeListContainer = () => {
  const dispatch = useDispatch()
  const recipeList = useSelector((state) => state.recipeList.data.results);
  const allrecipeList = useSelector((state) => state.recipeList);
  const searchItemRef = useRef(null);

  useEffect(()=>{
    console.log("bookmark before----->",recipeList);
  },[recipeList])

  // if (!recipeList || !Array.isArray(recipeList)) {
  //   return <div className={classes.not_available}>Search for recipies.</div>;
  //  }
  const handleFetchData = () => {
    const searchValue=searchItemRef.current.value;
    console.log("search value-------------->",searchValue);
    dispatch(fetchRecipe({ apiKey: "bcffb3f9bbd6414aaf1fa753f147235f", query: searchValue,number:10 }));
    console.log("recipeList--------->",recipeList);
  };
  return (
    <div className={classes.main}>
      <div className={classes.search_cont}>
        <div className={classes.search_container}>
          <input type="text" ref={searchItemRef} />
          <button className={classes.search_btn} onClick={handleFetchData}>{((allrecipeList.loading)?<Loader size={30}/>:<SearchIcon style={{ marginRight:'8px' }}/>)}</button>
        </div> 
      </div>
      {recipeList && recipeList.map((element, index) => (
        <Recipe key={index} title={element.title} image={element.image} id={element.id}  />
      ))}
      {/* <Recipe title={'Pasta'} /> */}
    </div>
  )
}

export default RecipeListContainer