import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

export default function LikeCheckbox() {
  return (
    <div>
      <Checkbox  icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
    </div>
  );
}
