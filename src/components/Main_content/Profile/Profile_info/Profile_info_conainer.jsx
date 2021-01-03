import React from 'react';
import { connect } from 'react-redux';
import { getStatus, savePhoto, setUserProfile, updateStatus } from '../../../../redux/profileReducer';
import Profile_info from './Profile_info';
import * as axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
import loaderGif from '../../../../assets/loader.gif'
import { loaderCreator } from '../../../../redux/frendsReducer';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../../redux/Hoc/authRedirect';


class profileInfoAPI extends React.Component {

    refreshProfile() {
        let profileId = this.props.match.params.profileId;
        if (!profileId) {
            profileId = this.props.id;
        }
        this.props.togleLoader(true)
        axios.get(`https://social-network.samuraijs.com/api/1.0/profile/${profileId}`)
            .then(response => {
                this.props.togleLoader(false)
                this.props.setUserProfile(response.data)
            })

        this.props.getStatus(profileId);

    }

    componentDidMount() {
        this.refreshProfile();
    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.profileId != prevProps.match.params.profileId)
            this.refreshProfile();
    }
    render() {
        return <> {this.props.loader ? <img src={loaderGif} /> : <Profile_info profileInfo={this.props.profileInfo} status={this.props.status}
            updateStatus={this.props.updateStatus} isOwner={!this.props.match.params.profileId} savePhoto={this.props.savePhoto} />}</>
    }
}

let MapStateToProps = (state) => {

    return {
        profileInfo: state.profilePage.profileInfo,
        loader: state.frendsPage.loader,
        isAuth: state.auth.isAuth,
        status: state.profilePage.status,
        id: state.auth.id
    }
}

let MapDispatchToProps = (dispatch) => {

    return {
        setUserProfile: (profileInfo) => {
            dispatch(setUserProfile(profileInfo))
        },
        togleLoader: (loader) => {
            dispatch(loaderCreator(loader))
        },
        getStatus: (userId) => {
            dispatch(getStatus(userId))
        },
        updateStatus: (status) => {
            dispatch(updateStatus(status))
        },
        savePhoto: (file) => {
            dispatch(savePhoto(file))
        }
    }
}


export default compose(
    connect(MapStateToProps, MapDispatchToProps),
    withAuthRedirect,
    withRouter
)(profileInfoAPI);