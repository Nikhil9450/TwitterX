import React from 'react'
import classes from './Login.module.css';
import Button from '@mui/material/Button';
const Login = () => {
  return (
    <div className={classes.login_container}>
      <div className={classes.login_grid}>
        <div className={classes.grid_item1}><img className={classes.icon} src = 'Icons/twitter.png' alt='twitter icon'></img></div>
        <div className={classes.grid_item2}>
          <div className={classes.signup_card}>
            <div>
              <h1>Happening now</h1>
            </div>
            <div>
              <h2>Join today.</h2>
              <div></div>
              <p>-------------------or--------------------</p>
              <button className={classes.create_acc_btn}>Create account</button>
              <p className={classes.term_condition_para}>By signing up,you agree to the Terms of Service and Privacy Policy, including Cookie Use.</p>
            </div>

            <div>
              <h5>Already have an account?</h5>
              <button className={classes.signin_btn} >Sign in</button>
            </div>
          </div>  
        </div>
      </div>
    </div>
  )
}

export default Login