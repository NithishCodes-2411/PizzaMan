
import { useState } from "react";
// import { Redirect } from "react-router-dom"; // Uncommented this line
import Input from "../../UI/Input/Input";
import commonStyle from "../../static/styles/common.module.css"; 
import { Link } from 'react-router-dom';
import Button from '../../UI/Button/Button';
import { AuthenticationDetails, CognitoUser } from 'amazon-cognito-identity-js';
import userPool from '../../../aws-cognito/aws-cognito';

function Login(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const updateHandler = async (e) => {
            e.preventDefault();
            try {

                    if (email.length > 0 && password.length > 0) {

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
                                        console.log(session.getAccessToken().getJwtToken());
                                        // props.emailAuthSuccess(session.getIdToken().getJwtToken());
                                        resolve();
                                    },
                                    onFailure: (err) => {
                                        console.error("Error authenticating user:", err);
                                        // props.emailAuthFail(err.message);
                                        reject(err);
                                    },
                                    newPasswordRequired: (userAttributes, requiredAttributes) => {
                                        console.log("New password required for the user");
                                        resolve();
                                    },
                                    });
                              }).then(() => {
                                    console.log("User authenticated successfully");
                                    // Redirect to menu or perform any other action
                                    // props.history.push('/menu');
                              }).catch((err) => {
                                    console.error("Error authenticating user:", err);
                              });
             
                    }

            }catch(err) {
                console.log(err);
            }

        
    }
    return (
        <div className={`my-5 pt-2 container ${commonStyle.PageBody}`}>
            {/* {props.user ? <Redirect to="/menu" /> : null} */}
            {/* <PageTitle></PageTitle> */}
            <h1 className="display-6 mb-0">Login</h1>
            <form onSubmit={updateHandler}>
                <Input placeholder="Username" type="email" onChangeFunc={setEmail} val={email} />
                <Input placeholder="Password" type="password" onChangeFunc={setPassword} val={password} />
                <p className="font-weight-bold my-2">
                    Not yet registered? <Link to="/register">Register</Link>
                </p>
                <Button>Login</Button>
            </form>

        </div>
    );
}

export default Login;