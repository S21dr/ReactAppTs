import React from 'react';
import s from './All_post_item.module.css'

const All_post_item = (props) => {
    return (
        <div className={s.post_all_item}>
            <div className={s.post_all_item_img}>
                <img src="https://image.shutterstock.com/image-vector/man-icon-vector-260nw-1040084344.jpg" />
            </div>
            <div className={s.post_all_item_content}>
                <p>{props.message}</p>
            </div>
        </div>
    )
};

export default All_post_item;