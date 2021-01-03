import React from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { authData, logout } from '../../redux/auth-reducer';
import {AppStateType} from "../../redux/redux";

type AuthType ={
    id:  null | number,
    email: null | string,
    login:  null | string,
    isAuth: false,
}

type MapStateType = {
    auth:AuthType
}
type DispatchPropsType = {
    authData:()=>void
    logout:()=>void
}
type OwnType = {
}

type PropsType = MapStateType & DispatchPropsType & OwnType

class Header_container extends React.Component<PropsType> {
    componentDidMount() {
        this.props.authData();

    }
    render() {
        return <Header {...this.props} />
    }
};

const mapStateToProps = (state:AppStateType):MapStateType => {

    return { auth: state.auth }
}

//<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}, State = DefaultState>
export default connect<MapStateType,DispatchPropsType,OwnType,AppStateType>(mapStateToProps, { authData, logout })(Header_container);