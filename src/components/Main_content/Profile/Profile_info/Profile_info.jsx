import React from 'react';
import s from './Profile_info.module.css'
import ProfileStatus from './Profile_status';

const Profile_info = (props) => {
    const onPhotoSelected = (e) => {
        if (e.target.files.length) {
            props.savePhoto(e.target.files[0]);
        }
    }

    return (
        <div className={s.profile}>
            <div className={s.profile_img}>
                <img src={!props.profileInfo ? "https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/19339625881548233621-512.png" : props.profileInfo.photos.large ? props.profileInfo.photos.large : "https://upload-icon.s3.us-east-2.amazonaws.com/uploads/icons/png/19339625881548233621-512.png"} />
                {props.isOwner && <input type={"file"} onChange={onPhotoSelected} />}
            </div>
            <div className={s.profile_info}>
                <h1>{!props.profileInfo ? "" : props.profileInfo.fullName}</h1>
                <p>About me: {!props.profileInfo ? "" : props.profileInfo.aboutMe}</p>
                <p>lookingForAJob: {!props.profileInfo ? "" : props.profileInfo.lookingForAJob ? <span>Yes</span> : <span>No</span>}</p>
                <p>lookingForAJobDescription: {!props.profileInfo ? "" : props.profileInfo.lookingForAJobDescription}</p>
                <p>Status: <ProfileStatus status={props.status} updateStatus={props.updateStatus} /></p>
            </div>
        </div>
    )
};

export default Profile_info;