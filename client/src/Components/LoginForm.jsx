import { Box, Button, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import axios from 'axios';


function LoginForm() {
    const [form,setForm] = useState()
  
    const handleLogin =()=>{
        axios.post('http://localhost:8000/signup',{...form})
        .then((res)=>{
            console.log(res);
        })
        .catch((err)=>{
            
        })
     }
  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
       
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete='off'
      >
        <Typography component='h1' variant='h5'>
          Login
        </Typography>
        <TextField
            required
            id='standard-basic'
            label='Email'
            variant='standard'
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          /><br />
            <TextField
            required
            id='standard-basic'
            label='Password'
            variant='standard'
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          /><br />
          <Button variant='contained' onClick={handleLogin}> Login</Button>
      </Box>
    </div>
  );
}

export default LoginForm;
