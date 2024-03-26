// Dropdown.js

import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import { TextField } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Select from '@mui/material/Select';
import classes from './Select.module.css';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
      border:"none"
    },
  },
};

const Dropdown = (props) => {
  const { value, onChange, options, title } = props;

  return (
    <div>
      <FormControl sx={{ width:'100%' }}>
        <InputLabel id="demo-multiple-checkbox-label" style={{ background: 'white' }}>
          {title}
        </InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={value}
          onChange={onChange}
          input={<OutlinedInput label="Tag" />}
          // input={<TextField id="filled-basic" label="Tag" variant="filled" />}
          renderValue={(selected) => selected.join(', ')}
          MenuProps={MenuProps}
          style={{background:"white", borderRadius:"1rem"}}
        >
          {options.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox checked={value.indexOf(option) > -1} />
              <ListItemText primary={option.toUpperCase()} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default Dropdown;
