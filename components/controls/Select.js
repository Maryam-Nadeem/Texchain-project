import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText,makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root:{
      
  },
  form:{
      marginLeft:'15px',
      width:'90%',
      marginTop:'12px'
  }
  }));

export default function Select(props) {
    const classes=useStyles();

    const { name, label, value,error=null, onChange, options } = props;

    return (
        <FormControl variant="outlined" className={classes.form}
        {...(error && {error:true})}>
            <InputLabel>{label}</InputLabel>
            <MuiSelect
            className={classes.root}
                label={label}
                name={name}
                value={value}
                onChange={onChange}>
                <MenuItem value=""></MenuItem>
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}