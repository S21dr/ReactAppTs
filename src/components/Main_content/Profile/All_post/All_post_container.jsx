import React from 'react';
import { connect } from 'react-redux';
import All_post from './All_post';
import s from './All_post.module.css'
import All_post_item from './All_post_item/All_post_item';

// const All_post = (props) => {
//     let postElements = props.postData.map(p => <All_post_item message={p.message} />)

//     return (
//         <div className={s.post_all}>
//             {postElements}
//         </div>
//     )
// };
let MapStateToProps = (state) => {
    return {
        postData: state.profilePage.postData,
    }
}

let MapDispatchToProps = (dispatch) => {
    return {
    }
}

const All_post_container = connect(MapStateToProps, MapDispatchToProps)(All_post);

export default All_post_container;