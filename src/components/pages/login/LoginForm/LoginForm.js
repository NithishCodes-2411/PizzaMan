
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import userPool from '../../../../aws-cognito/aws-cognito';

import Input from '../../../UI/Input/Input';
import Button from '../../../UI/Button/Button';
import ErrorDisplay from '../../../Util/ErrorDisplay/ErrorDisplay';
import Spinner from '../../../UI/Spinner/Spinner';
import { Redirect } from 'react-router';

import * as actions from '../../../../store/actions/actions';

const LoginForm = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const updateHandler = async (event) => {
    event.preventDefault();

    if (email.length > 0 && password.length > 0) {
      try {
        const authenticationData = {
          Username: email,
          Password: password,
        };

        const authenticationDetails = new AuthenticationDetails(authenticationData);

        const userData = {
          Username: email,
          Pool: userPool,
        };

        const cognitoUser = new CognitoUser(userData);

        await new Promise((resolve, reject) => {
          cognitoUser.authenticateUser(authenticationDetails, {
            onSuccess: (session) => {
              props.emailAuthSuccess(session.getIdToken().getJwtToken());
              resolve();
            },
            onFailure: (err) => {
              props.emailAuthFail(err.message);
              reject(err);
            },
            newPasswordRequired: (userAttributes, requiredAttributes) => {
              console.log("New password required for the user");
              resolve();
            },
          });
        });
      } catch (error) {
        console.error('Error during authentication1:', error);
      }
    } else {
      props.emailAuthFail('Please fill up all fields');
    }
  };

  return (
    <div>
      {props.registered ? <Redirect to="/login" /> : null}
      {props.isLoading ? (
        <Spinner />
      ) : (
        <>
          <form onSubmit={updateHandler}>
            <Input val={email} onChangeFunc={setEmail} placeholder="Email" type="email" />
            <Input val={password} onChangeFunc={setPassword} placeholder="Password" type="password" />
            {props.error ? <ErrorDisplay>{props.error}</ErrorDisplay> : null}

            <p className="font-weight-bold my-2">
              Not yet registered? <Link to="/register">Register</Link>
            </p>

            <Button>Login</Button>
          </form>
          {/* <div align="center">
            <strong>OR</strong>
          </div> */}
        </>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.auth.isLoading,
  error: state.auth.error,
});

const mapDispatchToProps = (dispatch) => ({
  emailAuthSuccess: (token) => dispatch(actions.emailAuthSuccess(token)),
  emailAuthFail: (error) => dispatch(actions.emailAuthFail(error)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
