import React from 'react';
import { connect } from 'react-redux';
import { follow,   getUsers, onPageChangedCreator, unfollow,  } from '../../../redux/frendsReducer';
import Frends from './Frends';
import loaderGif from '../../../assets/loader.gif'
import { withAuthRedirect } from '../../../redux/Hoc/authRedirect';
import { compose } from 'redux';
import {UserType} from "../../../redux/types/types";
import {AppStateType} from "../../../redux/redux";

type MapStateType = {
    frends:Array<UserType>
    totalCount:number
    countSizeUsers:number
    pageNumberActive:number
    followingProgress: Array <number>
    loader: boolean
    isAuth:boolean
}
type DispatchPropsType = {
    unfollow:(id:number)=>void
    follow:(id:number)=>void
    onPageChanged:(page:number)=>void
    getUsers:(countSizeUsers:number, pageNumberActive:number)=>void
}
type OwnType = {
}

type PropsType = MapStateType & DispatchPropsType & OwnType

class frendsApiComponent extends React.Component<PropsType> {
    componentDidMount() {
        this.props.getUsers(this.props.countSizeUsers, this.props.pageNumberActive);
    }
    onPageChanged = (number:number) => {
        this.props.getUsers(this.props.countSizeUsers, number);
        this.props.onPageChanged(number);
    }
    render() {
        return <>
            {this.props.loader ? <img src={loaderGif} /> : <Frends frends={this.props.frends}
                unfollow={this.props.unfollow}
                follow={this.props.follow}
                totalCount={this.props.totalCount}
                countSizeUsers={this.props.countSizeUsers}
                onPageChanged={this.onPageChanged}
                pageNumberActive={this.props.pageNumberActive}

                followingProgress={this.props.followingProgress}
            />}
        </>
    }
}

let MapStateToProps = (state:AppStateType):MapStateType => {
    return {
        frends: state.frendsPage.frends,
        totalCount: state.frendsPage.totalCount,
        countSizeUsers: state.frendsPage.countSizeUsers,
        pageNumberActive: state.frendsPage.pageNumberActive,
        loader: state.frendsPage.loader,
        followingProgress: state.frendsPage.followingProgress,
        isAuth: state.auth.isAuth
    }
}

let MapDispatchToProps = (dispatch:any):DispatchPropsType => {
    return {
        follow: (id:number) => {
            dispatch(follow(id));
        },
        unfollow: (id:number) => {
            dispatch(unfollow(id));
        },
        onPageChanged: (pageNumber:number) => {
            dispatch(onPageChangedCreator(pageNumber))
        },
        getUsers: (countSizeUsers:number, pageNumberActive:number) => {
            dispatch(getUsers(countSizeUsers, pageNumberActive))
        },
    }
}


export default compose<React.ComponentType>(connect<MapStateType,DispatchPropsType,OwnType,AppStateType>(MapStateToProps, MapDispatchToProps),
    withAuthRedirect
)(frendsApiComponent);