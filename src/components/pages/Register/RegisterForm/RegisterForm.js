

import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import ErrorDisplay from '../../../Util/ErrorDisplay/ErrorDisplay';
import Spinner from '../../../UI/Spinner/Spinner';
import * as actions from '../../../../store/actions/auth';
import { Navigate } from 'react-router';
import userPool from '../../../../aws-cognito/aws-cognito'; // Import your user pool

function RegisterForm(props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const updateHandler = (event) => {
    event.preventDefault();

    if (email.length > 0 && password.length > 0 && passwordConfirm.length > 0) {
      if (password === passwordConfirm) {
        props.emailRegister(email, password);
      } else {
        props.emailRegisterFail('Password and Password Confirmation must match');
      }
    } else {
      props.emailRegisterFail('Please fill up all fields');
    }
  };

  return (
    <div>
      {props.registered ? <Navigate to="/login" /> : null}
      {props.isLoading ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={updateHandler}>
            <Input val={email} onChangeFunc={setEmail} placeholder="Email" type="email" />
            <Input val={password} onChangeFunc={setPassword} placeholder="Password" type="password" />
            <Input val={passwordConfirm} onChangeFunc={setPasswordConfirm} placeholder="Confirm Password" type="password" />
            {props.error ? <ErrorDisplay>{props.error}</ErrorDisplay> : null}

            <p className="font-weight-bold mt-2">
              Already registered? <Link to="/login">Login</Link>
            </p>

            <Button>Register</Button>
          </form>
        </>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
  registered: state.auth.registered,
});

const mapDispatchToProps = (dispatch) => ({
  emailRegister: (email, password) => dispatch(actions.emailRegister(email, password)),
  emailRegisterFail: (error) => dispatch(actions.emailRegisterFail(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
