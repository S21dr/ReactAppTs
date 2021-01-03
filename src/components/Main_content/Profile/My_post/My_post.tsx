import React, {FC} from 'react';
import {Field, InjectedFormProps, reduxForm} from 'redux-form';
import s from './My_post.module.css'

let NewMyPost:FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps>
    = ({handleSubmit}) => {
    return <form onSubmit={handleSubmit}>
        <Field type="text" name="newMyPostText" component="input" />
        <button className={s.send} >send</button>
    </form>
}
const NewMyPostForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: "ProfileNewMyPost" })(NewMyPost);

type PropsType = {
    addPost:(newText:string)=>void
}
type LoginFormOwnProps ={
}
type LoginFormValuesType ={
    newMyPostText:string
}

const My_post:FC<PropsType> = (props) => {

    let addPost = (data:LoginFormValuesType) => {

        props.addPost(data.newMyPostText);
    }

    return (
        <div className={s.my_post}>
            <h2>My posts</h2>
            <NewMyPostForm onSubmit={addPost} />
        </div>
    )
};

export default My_post;