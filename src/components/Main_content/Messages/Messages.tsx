import React ,{FC} from 'react';
import { NavLink,  } from 'react-router-dom';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import { dialogsType, messagesType} from '../../../redux/messagesReducer';
import s from './Messages.module.css';

type DialogsPropsType = {
    id:number
    name:string
}

type DialogPropsType = {
  message:string
}
const Dialogs:FC<DialogsPropsType> = (props) => {
    let path = '/messages/' + props.id
    return (
        <div>
            <NavLink to={path}>{props.name}</NavLink>
        </div>
    )
};

const Dialog:FC<DialogPropsType> = (props) => {
    
    return (
        <div>
            {props.message}
        </div>
    )
};

let MessagesForm:React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
        <Field type="text" component="input" name="newMessage" />
        <button >Send message</button>
    </form>
}
const MessagesReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: "messageForm" })(MessagesForm);


type MapStateToPropsType ={
    dialogsData:  Array<dialogsType>
    messageData: Array<messagesType>
    isAuth:boolean
}

type MapDispatchToPropsType ={
    sendMessage: (message:string)=>void
}
type OwnType = {
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnType


type LoginFormValuesType = {
    newMessage:string
}
type LoginFormOwnProps ={
}
const Messages:React.FC<PropsType> = (props) => {

    let dialogsElements = props.dialogsData.map(d => <Dialogs name={d.name} id={d.id} />)
    let messageElements = props.messageData.map(m => <Dialog message={m.message} />)


    let sendMessage = (data:LoginFormValuesType):void => {
        props.sendMessage(data.newMessage);
    }
    return (
        <div className={s.wrapper}>
            <div className={s.column}>
                {dialogsElements}
            </div>
            <div className={s.column}>
                <div>{messageElements}</div>
                <MessagesReduxForm onSubmit={sendMessage} />
            </div>
        </div>
    )
};

export default Messages;