import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router'; // Replaced Redirect with Navigate

import PageTitle from '../../UI/PageTitle/PageTitle';
import LoginForm from './LoginForm/LoginForm'
import commonStyle from '../../../static/style/common.module.css';

function Login(props) {
    return (
        <div className={`my-5 pt-2 container ${commonStyle.PageBody}`}>
            {props.user ? <Navigate to="/menu" /> : null} {/* Replaced Redirect with Navigate */}

            <PageTitle>
                Login
            </PageTitle>

            <LoginForm />
        </div>
    );
}

const mapStateToProps = (state) => ({
    user: state.auth.user,
});

export default connect(mapStateToProps)(Login);