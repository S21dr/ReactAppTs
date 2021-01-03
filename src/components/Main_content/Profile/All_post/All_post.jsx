import React from 'react';
import s from './All_post.module.css'
import All_post_item from './All_post_item/All_post_item';

const All_post = (props) => {
    let postElements = props.postData.map(p => <All_post_item message={p.message} />)

    return (
        <div className={s.post_all}>
            {postElements}
        </div>
    )
};


export default All_post;