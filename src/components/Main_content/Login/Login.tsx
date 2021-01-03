import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../../redux/auth-reducer';
import {AppStateType} from "../../../redux/redux";
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import s from './Login.module.css'

type LoginFormOwnProps ={
}
let LoginForm:React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit, error,}) => {

    return <form onSubmit={handleSubmit}>
        <div>
            <Field name="email" component={"input"} type="text" placeholder="email" />
        </div>
        <div>
            <Field name="password" component={"input"} type="password" placeholder="password" />
        </div>
        {error &&
        <div className={s.error}>
            {error}
        </div>
        }
        <div>
            <Field name="rememberMe" component={"input"} type="checkbox" />
            Remember me
        </div>
        <button>Login</button>
    </form>
}

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(LoginForm);

type MapStateType = {
    isAuth:boolean
}
type DispatchPropsType = {
    login:(email:string, password:string, rememberMe:boolean)=>void
}
type OwnType = {
}

type LoginFormValuesType = {
    email:string,
    password:string,
    rememberMe:boolean
}
type PropsType = MapStateType & DispatchPropsType & OwnType

let Login:React.FC<PropsType> = (props) => {
    const onSubmit = (formData:LoginFormValuesType) => {
        props.login(formData.email, formData.password, formData.rememberMe);
    }
    if (props.isAuth) return <Redirect to="profile" />
    return <>
        <h1>Login</h1>
        <LoginReduxForm onSubmit={onSubmit} />
    </>
}

const mapStateToProps = (state:AppStateType):MapStateType => {
    return {
        isAuth: state.auth.isAuth
    }
}

export default connect<MapStateType,DispatchPropsType,OwnType,AppStateType>(mapStateToProps, { login })(Login);