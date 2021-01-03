import { authData } from "./auth-reducer";

const AUTHORIZED_SUCCESS = 'AUTHORIZED_SUCCESS';

type InitianalStateType = {
    authotized:boolean
}

let initianalState:InitianalStateType = {
    authotized: false
}

const appReducer = (state = initianalState, action : any):InitianalStateType => {

    switch (action.type) {
        case AUTHORIZED_SUCCESS: {
            let newState = { ...state, authotized: true };
            return newState;
        }
        default: return state;
    }
}
type AuthotizedSuccessType= {
    type: typeof AUTHORIZED_SUCCESS
}

export const authotizedSuccess = ():AuthotizedSuccessType => {
    return {
        type: AUTHORIZED_SUCCESS
    }
};
export const authotized = () => (dispatch:any) => {
    let promise = dispatch(authData());
    Promise.all([promise]).then(() => {
        dispatch(authotizedSuccess())
    });
}





export default appReducer;