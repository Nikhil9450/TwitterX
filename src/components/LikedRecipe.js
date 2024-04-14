// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardHeader from '@mui/material/CardHeader';
// import CardMedia from '@mui/material/CardMedia';
// import CardContent from '@mui/material/CardContent';
// import CardActions from '@mui/material/CardActions';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';

// import DeleteIcon from '@mui/icons-material/Delete';
// import Button from '@mui/material/Button';

import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { getFirestore,deleteDoc,doc,setDoc,getDoc,updateDoc } from 'firebase/firestore';
import { auth } from "../firebase";
import Loader from './Loader';
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from 'react';
import Box from '@mui/material/Box';
import { useMediaQuery } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
export default function LikedRecipe(props) {
  const user = auth.currentUser;
  const userId = user ? user.uid : '';
  const [loading, setLoading] = useState(false);
  const db = getFirestore();
  const isMobile = useMediaQuery('(max-width:550px)');

  // const DeleteLikedRecipe = async (recipeId) => {
  //   // setLoading(true);
  //   console.log("recipe to be deleted---------->",recipeId);
  //   try {
  //     const db = getFirestore();
  //     const recipeDoc = doc(db, 'users', userId, 'Liked_recipes', recipeId);
  //     await deleteDoc(recipeDoc);
  //     console.log('Recipe deleted successfully:', props.data.id);
  //     // setLoading(false);
  //     // After deletion, fetch and update the recipes list
  //     props.refreshafterDeletion();
  //   } catch (error) {
  //     // setLoading(false);
  //     console.error('Error deleting recipe:', error);
  //   }
  // };

  const DeleteLikedRecipe = async (recipeId) => {
    setLoading(true);
    try {
      if (!user) {
        console.error('User not signed in');
        return;
      }
  
      const likedRecipesRef = doc(db, 'users', user.uid, 'Liked_recipes', 'documentId'); // Replace 'documentId' with actual document ID
      const docSnapshot = await getDoc(likedRecipesRef);
  
      if (!docSnapshot.exists()) {
        setLoading(false);
        console.error('Liked_recipes document not found');
        return;
      }
  
      const existingData = docSnapshot.data();
      if (!existingData || !existingData.recipeIds) {
        setLoading(false);
        console.error('Invalid data structure in Liked_recipes document');
        return;
      }
  
      const updatedRecipeIds = existingData.recipeIds.filter(id => id !== recipeId);
      await setDoc(likedRecipesRef, { recipeIds: updatedRecipeIds }, { merge: true });
      console.log(`Deleted ID ${recipeId} from Firestore`);
      setLoading(false);
      props.refreshFunction();

    } catch (error) {
      setLoading(false);
      console.error('Error deleting ID from Firestore:', error);
    }
  };
  
  

  const summary = (text, limit) => {
    if (text.split(' ').length > limit) {
      return text.split(' ').slice(0, limit).join(' ') + '...';
    }
    return text;
  };

  const createMarkup = (size) => {
    return { __html: summary(props.data.summary, size) }; // Invoke summary function here
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} style={isMobile?{display:'none'}:{display:'block'}}>
        <CardMedia
          sx={{
            position: 'relative', // Ensure relative positioning for absolute positioning within
            height: 140,
          }}
          image={props.data.image}
          title="green iguana"
        >
          {(loading?
            <Loader
              sx={{
                position: 'absolute',
                top: '8px', // Adjust as needed for precise positioning
                right: '8px', // Adjust as needed for precise positioning
                // zIndex: 1000, // Ensure the loader is above the image
              }}
              size={30}
              style={{ color: '#ff5a5a' }} // Optional: Customize loader color
            />
        :
          <DeleteIcon
            sx={{
              position: 'absolute',
              top: '8px', // Adjust as needed for precise positioning
              right: '8px', // Adjust as needed for precise positioning
              // zIndex: 1001, // Ensure the button is above the loader
              color: '#ff5a5a',
              cursor: 'pointer',
            }}
            onClick={() => DeleteLikedRecipe(props.data.id)}
          />
          )}
        </CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '16px' }}>
            {props.data.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }} dangerouslySetInnerHTML={createMarkup(30)}>
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">More Details</Button>
        </CardActions>
      </Card>
      {/* mobile card */}
      <Card style={isMobile?{display:'flex',justifyContent:'space-between'}:{display:'none'}}>

      <Box sx={{ display: 'flex', flexDirection: 'column' ,width:'100%'}}>
        <div style={{margin:'5px 0px 0px 5px'}}>
        {(loading?<Loader style={{color:'#ff5a5a'}} size={20} />:<CloseIcon style={{color:'black',cursor:'pointer'}} onClick={()=>DeleteLikedRecipe(props.data.id)} />)}
        </div>
        <CardContent sx={{ flex: '1 0 auto' ,width:'100%',padding:'0px 30px'}}>

          <Typography component="div" variant="h5" sx={{fontSize:'12px',textAlign:'center',padding:'0px'}}>
            {props.data.title}
          </Typography>

        </CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          {/* <IconButton aria-label="previous"> */}
            <Button size="small" style={{fontSize:'10px'}}>More Details</Button>
          {/* </IconButton> */}
          {/* <IconButton aria-label="play/pause"> */}
          {/* </IconButton> */}
          {/* <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
            </IconButton> */}
        </Box>
      </Box>
      <CardMedia
        component="img"
        sx={{ width: 151 }}
        image={props.data.image}
        alt="recipe_image"
      />
    </Card>
    </>


    // <Card sx={{ maxWidth: 345 }}>
    //   <CardMedia
    //     sx={{ height: 140 }}
    //     image={props.data.image}
    //     title="green iguana"
    //   />
    //   <CardContent>
    //     <Typography gutterBottom variant="h5" component="div" style={{ fontSize: '16px' }} >
    //       {props.data.title}
    //     </Typography>
    //     <Typography variant="body2" color="text.secondary" style={{ fontSize: '12px' }}   dangerouslySetInnerHTML={createMarkup()}>
    //     </Typography>
    //   </CardContent>
    //   <CardActions>
    //     {/* <Button size="small">Share</Button> */}
    //     <Button size="small">More Details</Button>
    //     {(loading?<Loader style={{color:'#ff5a5a'}} size={30} />:<DeleteIcon style={{color:'#ff5a5a',cursor:'pointer'}} onClick={()=>DeleteLikedRecipe(props.data.id)} />)}

    //   </CardActions>
    // </Card>
  );
}
