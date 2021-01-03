import React from 'react';
import { connect } from 'react-redux';
import { addPostCreator, } from '../../../../redux/profileReducer';
import My_post from './My_post';
import {AppStateType} from "../../../../redux/redux";

type MapStateToPropsType ={
}
type MapDispatchToPropsType = {
    addPost:(newMyPostText:string)=>void
}
type OwnType = {}
let MapStateToProps = (state:AppStateType):MapStateToPropsType => {
 return {}
}

let MapDispatchToProps = (dispatch:any):MapDispatchToPropsType => {
    return {
        addPost: (newMyPostText:string) => {
            dispatch(addPostCreator(newMyPostText));
        },
    }
}

const My_post_container = connect<MapStateToPropsType,MapDispatchToPropsType,OwnType,AppStateType>(MapStateToProps, MapDispatchToProps)(My_post);

export default My_post_container;