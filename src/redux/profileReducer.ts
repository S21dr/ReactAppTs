import { profileApi } from "../Api/api";
import {PhotosType, PostDataType, ProfileInfoType} from "./types/types";


const ADD_POST = 'ADD_POST';

const SET_USER_PROFILE = 'SET_USER_PROFILE';
const SET_STATUS = 'SET_STATUS';
const SET_PHOTO = 'SET_PHOTO'



let initianalState = {
    postData: [{ message: 'privet kak dela?' }, { message: 'Super' }, { message: 'Kruto' }] as Array <PostDataType>,
    profileInfo: null as null | ProfileInfoType,
    status: '',
}

type InitianalStateType = typeof initianalState

const profileReducer = (state = initianalState, action:any):InitianalStateType => {

    switch (action.type) {
        case ADD_POST: {
            let newState = { ...state, postData: [...state.postData] };
            let newPost = {
                message: action.newMyPostText
            };
            newState.postData.push(newPost);

            return newState;
        }
        case SET_USER_PROFILE: {
            let newState = { ...state };
            newState.profileInfo = action.profileInfo;
            return newState;
        }
        case SET_STATUS: {
            let newState = { ...state, status: action.status };

            return newState;
        }
        case SET_PHOTO: {
            let newState = {
                ...state,
                profileInfo: { ...state.profileInfo, photos: action.photo } as ProfileInfoType
            }
            return newState
        }
        default: return state;
    }

};

type AddPostCreatorType ={
    type:typeof ADD_POST
    newMyPostText :string
}
export const addPostCreator = (newMyPostText:string):AddPostCreatorType => ({ type: ADD_POST, newMyPostText });

type SetUserProfile ={
    type: typeof SET_USER_PROFILE,
    profileInfo:ProfileInfoType
}
export const setUserProfile = (profileInfo:ProfileInfoType) :SetUserProfile=> ({ type: SET_USER_PROFILE, profileInfo })

type SetProfileStatus ={
    type:typeof SET_STATUS,
    status:string
}
export const setProfileStatus = (status:string) :SetProfileStatus=> ({ type: SET_STATUS, status })

type SetPhotoSuccess ={
    type:typeof SET_PHOTO,
    photo: PhotosType
}
export const setPhotoSuccess = (photo:PhotosType):SetPhotoSuccess => ({ type: SET_PHOTO, photo })

export const getStatus = (userId:number) => {
    return (dispatch:any) => {
        profileApi.getStatus(userId)
            .then((response:any) => {
                dispatch(setProfileStatus(response.data))
            })
    }
}

export const updateStatus = (status:string) => {
    return (dispatch:any) => {
        profileApi.updateStatus(status)
            .then((response:any) => {
                if (response.data.resultCode === 0)
                    dispatch(setProfileStatus(status))
            })
    }
}

export const savePhoto = (file:any) => {
    return (dispatch:any) => {
        profileApi.savePhoto(file)
            .then((response:any) => {
                if (response.data.resultCode === 0)
                    dispatch(setPhotoSuccess(response.data.data.photos))
            })
    }
}

export default profileReducer;