import React, {FC} from 'react';
import All_post_container from './All_post/All_post_container';
import My_post_container from './My_post/My_post_container';
import Profile_info_container from './Profile_info/Profile_info_conainer';


const Profile:FC = () => {

    return (
        <div >
            <Profile_info_container />
            <My_post_container />
            <All_post_container />
        </div>
    )
};

export default Profile;