const ADD_MESSAGE = 'ADD_MESSAGE';

export type dialogsType = {
    name:string,
    id:number
}

export type messagesType = {
    message:string,
    id:number
}

let initianalState = {

    dialogsData: [{ name: 'Dima', id: 1 }, { name: 'Yana', id: 2 }, { name: 'Vlad', id: 3 }] as Array<dialogsType>,
    messageData: [{ message: 'Privet', id: 1 }, { message: 'Poka', id: 2 }, { message: 'Poka', id: 3 }] as Array<messagesType>,

}

type InitianalStateType = typeof initianalState

const messagesReducer = (state = initianalState, action:any):InitianalStateType => {

    switch (action.type) {
        case ADD_MESSAGE: {
            let newState = { ...state, messageData: [...state.messageData] };
            let newMessage = {
                message: action.sendMessage,
                id: 4
            };
            newState.messageData.push(newMessage);
            debugger
            return newState;
        }
        default: return state;

    }
}

export type AddMessageCreatorType = {
    type:typeof ADD_MESSAGE,
    sendMessage:string
}

export const addMessageCreator = (sendMessage:string):AddMessageCreatorType => ({ type: ADD_MESSAGE, sendMessage })

export default messagesReducer;
