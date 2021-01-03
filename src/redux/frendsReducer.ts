import { userApi } from "../Api/api";
import { UserType} from "./types/types";

const FOLLOW = 'FOLLOW';
const UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const ON_PAGE_CHANGED = 'ON_PAGE_CHANGED';
const LOADER = 'LOADER'
const FOLLOWING_PROGRESS = 'FOLLOWING_PROGRESS'




let initianalState = {
    frends: [] as Array <UserType>,
    countSizeUsers: 10 as number,
    totalCount: 0 as number,
    pageNumberActive: 5 as number,
    loader: false,
    followingProgress: [] as Array <number>, //Array of users id
}

export type InitianalStateType = typeof initianalState

const frendsReducer = (state = initianalState, action:any) :InitianalStateType => {

    switch (action.type) {
        case FOLLOW: {

            let newState = {
                ...state, frends: state.frends.map(u => {
                    if (u.id === action.id) {

                        return { ...u, followed: true }
                    }
                    return u;
                })
            };
            return newState;
        }
        case UNFOLLOW: {
            let newState = {
                ...state, frends: state.frends.map(u => {
                    if (u.id === action.id) {
                        return { ...u, followed: false }
                    }
                    return u;
                })
            };
            return newState;
        }
        case SET_USERS: {
            let newState = {
                ...state, frends: action.response, totalCount: action.totalCount
            }

            return newState;
        }
        case ON_PAGE_CHANGED: {
            let newState = {
                ...state, pageNumberActive: action.pageNumberActive
            }
            return newState;
        }
        case LOADER: {
            let newState = {
                ...state, loader: action.loader
            }
            return newState;
        }
        case FOLLOWING_PROGRESS: {
            let newState = {
                ...state, followingProgress: action.followingProgress ? [...state.followingProgress, action.id] : state.followingProgress.filter(id => id != action.id)
            }
            return newState;
        }
        default: return state;
    }
}


type FollowCreatorType = {
    type: typeof FOLLOW,
    id:number
}
export const followCreator = (id:number):FollowCreatorType => {
    return { type: FOLLOW, id }
};

type UnfollowCreatorType = {
    type: typeof UNFOLLOW,
    id:number
}
export const unfollowCreator = (id:number):UnfollowCreatorType => {
    return {
        type: UNFOLLOW,
        id: id
    }
};

type SetUsersCreatorType = {
    type: typeof SET_USERS,
    response:Array <UserType>,
    totalCount:number
}
export const setUsersCreator = (response:Array <UserType>, totalCount:number):SetUsersCreatorType => ({ type: SET_USERS, response, totalCount });

type OnPageChangedCreatorType = {
    type: typeof ON_PAGE_CHANGED,
    pageNumberActive:number
}
export const onPageChangedCreator = (pageNumberActive:number):OnPageChangedCreatorType => ({ type: ON_PAGE_CHANGED, pageNumberActive });

type LoaderCreatorType = {
    type: typeof LOADER,
    loader :boolean
}
export const loaderCreator = (loader:boolean):LoaderCreatorType => ({ type: LOADER, loader });

type FollowingProgressCreatorType = {
    type:typeof FOLLOWING_PROGRESS,
    followingProgress:boolean,
    id:number
}
export const followingProgressCreator = (followingProgress :boolean, id :number):FollowingProgressCreatorType => ({ type: FOLLOWING_PROGRESS, followingProgress, id });

export const getUsers = (countSizeUsers :number, pageNumberActive :number) => {
    return (dispatch:any) => {
        dispatch(loaderCreator(true))
        userApi.getUsers(countSizeUsers, pageNumberActive)
            .then((response:any) => {
                dispatch(loaderCreator(false))
                dispatch(setUsersCreator(response.data.items, response.data.totalCount))
            })
    }
}
export const follow = (id :number) => {
    return (dispatch:any) => {
        dispatch(followingProgressCreator(true, id))
        userApi.follow(id)
            .then((response:any) => {
                if (response.data.resultCode === 0) {
                    dispatch(followCreator(id));
                }
                dispatch(followingProgressCreator(false, id))
            })
    }
}

export const unfollow = (id :number) => {
    return (dispatch:any) => {
        dispatch(followingProgressCreator(true, id))
        userApi.unfollow(id)
            .then((response:any) => {
                if (response.data.resultCode === 0) {
                    dispatch(unfollowCreator(id));
                }
                dispatch(followingProgressCreator(false, id))
            })
    }
}


export default frendsReducer;