// aws-cognito/aws-cognito.js

import { CognitoUserPool } from 'amazon-cognito-identity-js';
import config from './config';

const poolData = {
  UserPoolId: config.userPoolId,
  ClientId: config.clientId,
};

const userPool = new CognitoUserPool(poolData);

export default userPool;
