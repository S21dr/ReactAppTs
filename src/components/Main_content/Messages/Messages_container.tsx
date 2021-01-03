import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withAuthRedirect } from '../../../redux/Hoc/authRedirect';

import {addMessageCreator, dialogsType, messagesType,} from '../../../redux/messagesReducer';
import Messages from './Messages';
import {AppStateType} from "../../../redux/redux";


type MapStateToPropsType ={
    dialogsData:  Array<dialogsType>
    messageData: Array<messagesType>
    isAuth:boolean
}

type MapDispatchToPropsType ={
    sendMessage: (message:string)=>void
}
type OwnType ={
}
let MapStateToProps = (state:AppStateType):MapStateToPropsType => {
    return {
        dialogsData: state.messagesPage.dialogsData,
        messageData: state.messagesPage.messageData,
        isAuth: state.auth.isAuth
    }
}

let MapDispatchToProps = (dispatch:any):MapDispatchToPropsType => {
    return {
        sendMessage: (sendMessage) => {
            dispatch(addMessageCreator(sendMessage));
        },
    }
}

export default compose<React.ComponentType>(
    withAuthRedirect,
    connect<MapStateToPropsType,MapDispatchToPropsType,OwnType,AppStateType>(MapStateToProps, MapDispatchToProps)
)(Messages);