import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Stack from '@mui/material/Stack';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { Button, Typography } from '@mui/material';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

 
function SignUpForm() {
  const [value, setValue] = useState();
  const [form, setForm] = useState('');
  const [emaildisable, setEmailDisable] = useState('');
  const [verified, setVerified] = useState();
  const [error,setError] = useState('');
  const navigate= useNavigate()

  const handleChange = (newValue) => {
    // setValue(newValue);
    setForm({ ...form, dob: newValue });
  };

  //password validation

  let hasSixChar = form.password ? form.password.length >= 6 : false;
  let hasLowerChar = /(.*[a-z].*)/.test(form.password);
  let hasUpperChar = /(.*[A-Z].*)/.test(form.password);
  let hasNumber = /(.*[0-9].*)/.test(form.password);
  let hasSpecialChar = /(.*[^a-zA-Z0-9].*)/.test(form.password);
  //email validation
  const hasEmail =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      form.email
    );

  const handleSubmit = () => {
    axios
      .post('http://localhost:8000/signup', { ...form })
      .then((res) => {
        navigate('/login')
        console.log(res);
      })
      .catch((err) => {
        setError(err)
        console.log(err);
      });
  };

  const handleOTP = () => {
    setEmailDisable(true);
    axios
      .post('http://localhost:8000/otp', { email: form.email })
      .then((res) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const verifyOtp = () => {
    axios
      .post('http://localhost:8000/verifyOtp', { otp: form.otp })
      .then((res) => {
        console.log(res);
        setVerified('verified');
      })
      .catch((err) => {
        console.log(err);
        setEmailDisable(false);
        setVerified('not verified');
      });
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <form>
        <Box
          component='form'
          sx={{
            '& > :not(style)': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete='off'
        >
          <Typography component='h1' variant='h5'>
            Sign Up
          </Typography>
          <br/>
          {/* {error &&  */}
           <span style={{ color: 'red' }}> {error}</span> 
           {/* } */}
          <br />
          <TextField
            required
            id='standard-basic'
            label='First Name'
            variant='standard'
            onChange={(e) => {
              setForm({ ...form, fName: e.target.value });
            }}
          />
          <TextField
            id='standard-basic'
            label='Last Name'
            variant='standard'
            onChange={(e) => {
              setForm({ ...form, lName: e.target.value });
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3}>
              <DesktopDatePicker
                label='Date Of Birth'
                inputFormat='MM/dd/yyyy'
                // value={value}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} />}
              />
            </Stack>
          </LocalizationProvider>
          <TextField
            disabled={emaildisable}
            id='standard-basic'
            label='Email'
            variant='standard'
            onChange={(e) => {
              setForm({ ...form, email: e.target.value });
            }}
          />
          {emaildisable && verified != 'verified' ? (
            <>
              <TextField
                id='standard-basic'
                label='Enter OTP'
                variant='standard'
                onChange={(e) => {
                  setForm({ ...form, otp: e.target.value });
                }}
              />
              {verified != 'verified' ? (
                <Button
                  disabled={!hasEmail}
                  variant='outlined'
                  onClick={verifyOtp}
                >
                  Verify
                </Button>
              ) : (
                ''
              )}
            </>
          ) : (
            <>
              {verified != 'verified' ? (
                <Button
                  disabled={!hasEmail}
                  variant='outlined'
                  onClick={handleOTP}
                >
                  Verify Email
                </Button>
              ) : (
                ''
              )}
            </>
          )}
          <br />
          {form.email &&
            (hasEmail ? (
              ''
            ) : (
              <small style={{ color: 'red' }}>Enter a valid Email</small>
            ))}
          <br />

          <TextField
            id='standard-basic'
            label='Password'
            variant='standard'
            onChange={(e) => {
              setForm({ ...form, password: e.target.value });
            }}
          />
          {form.password && (
            <div className='ml-1' style={{ columns: '2' }}>
              <div>
                <small
                  style={hasSixChar ? { color: 'green' } : { color: 'red' }}
                >
                  Atleast six characters
                </small>
              </div>

              <div>
                <small
                  style={hasLowerChar ? { color: 'green' } : { color: 'red' }}
                >
                  One lowercase letter
                </small>
              </div>

              <div>
                <small
                  style={hasUpperChar ? { color: 'green' } : { color: 'red' }}
                >
                  One uppercase letter
                </small>
              </div>

              <div>
                <small
                  style={hasSpecialChar ? { color: 'green' } : { color: 'red' }}
                >
                  One special character
                </small>
              </div>

              <div>
                <small
                  style={hasNumber ? { color: 'green' } : { color: 'red' }}
                >
                  One number
                </small>
              </div>
            </div>
          )}
          <TextField
            id='standard-basic'
            label='Confirm Password'
            variant='standard'
            onChange={(e) => {
              setForm({ ...form, cPassword: e.target.value });
              console.log(form);
            }}
          />
          <br />

          {form.password &&
            form.cPassword &&
            (form.cPassword === form.password ? (
              <span style={{ color: 'green' }}>Password does match</span>
            ) : (
              ''
            ))}
          <br />
          <Button
            onClick={handleSubmit}
            disabled={
              !form.fName ||
              !form.lName ||
              !hasSixChar ||
              !hasLowerChar ||
              !hasUpperChar ||
              !hasSpecialChar ||
              !(form.cPassword === form.password) ||
              !hasNumber ||
              !form.email ||
              !form.dob ||
              !form.otp
            }
            variant='contained'
          >
            SignUp
          </Button>
        </Box>{' '}
      </form>
    </div>
  );
}

export default SignUpForm;
