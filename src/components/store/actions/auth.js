import * as actionTypes from './actionTypes';
import { AuthenticationDetails, CognitoUser, CognitoUserAttribute} from 'amazon-cognito-identity-js';
import userPool from '../../aws-cognito/aws-cognito';


export const authChangedHandler = (user) => {
  return {
    type: actionTypes.AUTH_CHANGED,
    payload: {
      user: user,
    },
  };
};

export const emailRegisterInit = () => {
  return {
    type: actionTypes.EMAIL_REGISTER,
  };
};

export const emailRegisterSuccess = () => {
  return {
    type: actionTypes.EMAIL_REGISTER_SUCCESS,
  };
};

export const emailRegisterFail = (error) => {
  return {
    type: actionTypes.EMAIL_REGISTER_FAIL,
    payload: {
      error: error,
    },
  };
};

export const emailRegister = (email, password) => {
  return (dispatch) => {
    dispatch(emailRegisterInit());

    const attributeList = [];
    const dataEmail = {
      Name: 'email',
      Value: email,
    };
    const attributeEmail = new CognitoUserAttribute(dataEmail);
    attributeList.push(attributeEmail);

    userPool.signUp(email, password, attributeList, null, (err, result) => {
      if (err) {
        dispatch(emailRegisterFail(err.message || 'Error during registration.'));
      } else {
        dispatch(emailRegisterSuccess());
      }
    });
  };
};

export const emailAuthInit = () => {
  return {
    type: actionTypes.EMAIL_AUTH,
  };
};

export const emailAuthSuccess = (token) => {
  return {
    type: actionTypes.EMAIL_AUTH_SUCCESS,
    payload: {
      token: token,
    },
  };
};

export const emailAuthFail = (error) => {
  return {
    type: actionTypes.EMAIL_AUTH_FAIL,
    payload: {
      error: error,
    },
  };
};

export const emailAuth = (email, password) => {
  return (dispatch) => {
    dispatch(emailAuthInit());

    const authenticationData = {
      Username: email,
      Password: password,
    };

    const authenticationDetails = new AuthenticationDetails(
      authenticationData
    );

    const userData = {
      Username: email,
      Pool: userPool,
    };

    const cognitoUser = new CognitoUser(userData);

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => {
        // Successfully authenticated
        console.log('Authentication successful', session);
      },
      onFailure: (err) => {
        // Authentication failed
        dispatch(emailAuthFail(err.message || 'Error during login.'));
      },
    });
  };
};
