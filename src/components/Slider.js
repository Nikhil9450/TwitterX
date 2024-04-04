import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { useThemeProps } from '@mui/material';
import classes from './Slider.module.css'
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';

export default function MySlider(props) {
  const minDistance = props.minDistance;
  const [value1, setValue1] = React.useState([props.minSelected, props.maxSelected]);

const handleChange1 = (event, newValue, activeThumb) => {
  if (!Array.isArray(newValue)) {
    return;
  }

  if (activeThumb === 0) {
    setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
  } else {
    setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
  }
  props.onChange(newValue);
};

      function valuetext(value) {
        return value;
      }
  return (
    <Card sx={{ maxWidth: '100%',borderRadius:"1rem",background:"#ffffff9c" }}>
    <CardContent>
      <Typography gutterBottom variant="h5" component="div" style={{display:'flex', justifyContent:'space-between',alignItems:'center'}}>
      <label  className='slider_label' style={{color:'#4e4e4e',fontSize:'large'}}>{props.label}<span style={{fontSize:'small'}}> (in grams)</span></label>
      <div className={classes.unit_container} style={{display:'flex', fontSize:'small'}}>
        <p>{value1[0]} gm</p>
        <p> -{value1[1]} gm</p>
      </div>
      </Typography>
        <Box sx={{background:'#f2f2f2ba', padding:'1rem 2rem',borderRadius:'1rem'}} >
          <Slider
            getAriaLabel={() => 'Minimum distance'}
            value={value1}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            min={props.min}
            max={props.max}
          />
      </Box>
    </CardContent>
  </Card>
  );
}