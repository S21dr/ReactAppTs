import { stopSubmit } from "redux-form";
import { authApi } from "../Api/api";

const SET_USER_DATA = 'SET_USER_DATA';



let initianalState = {
    id: null as null | number,
    email: null as null | string,
    login: null as null | string,
    isAuth: false,
}
type InitianalStateType = typeof initianalState
const authReducer = (state = initianalState, action:any):InitianalStateType => {

    switch (action.type) {
        case SET_USER_DATA: {
            let newState = { ...state, ...action.data };
            return newState;
        }
        default: return state;
    }
}
type AuthCreatorTypeData={
    id:null|number,
    login :null|string,
    email:null|string,
    isAuth:boolean
}
type AuthCreatorType = {
    type: typeof SET_USER_DATA,
    data: AuthCreatorTypeData
}

export const authCreator = (id:null|number, login :null|string, email:null|string, isAuth:boolean) :AuthCreatorType=> {
    return {
        type: SET_USER_DATA,
        data: { id, login, email, isAuth }
    }
};
export const authData = ():any => {
    return (dispatch:any) => {
        return authApi.authData()
            .then((response:any)=> {
                if (response.data.resultCode === 0) {
                    dispatch(authCreator(response.data.data.id, response.data.data.login, response.data.data.email, true));
                }
            })
    }
}

export const login = (email:string, password:string, rememberMe:boolean) => {
    return (dispatch:any) => {
        authApi.login(email, password, rememberMe)
            .then((response:any) => {
                if (response.data.resultCode === 0) {
                    dispatch(authData())
                } else {
                    debugger
                    let message = response.data.messages.length > 0 ? response.data.messages[0] : "some error";
                    dispatch(stopSubmit("login", { _error: message }))
                }
            })
    }
}
export const logout = () => {
    return (dispatch:any) => {
        authApi.logout()
            .then((response:any) => {
                if (response.data.resultCode === 0) {
                    dispatch(authCreator(null, null, null, false));
                }
            })
    }
}

export default authReducer;