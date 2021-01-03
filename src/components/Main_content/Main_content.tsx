import React from 'react';
import { Route } from 'react-router-dom';
import Friends_container from './Frends/Frends_container'
import Login from './Login/Login';
import s from './Main_content.module.css'

import Messages_container from './Messages/Messages_container';
import Profile from './Profile/Profile';
import News from "./News/News";
import Music from "./Music/Music";
import Settings from "./Setting/Settings";

const Main_content:React.FC = () => {
    return (
        <div className={s.main_content}>
            <img className={s.main_content_img} src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/full%20page/img(11).jpg" alt="profile_bg" />
            <Route path='/profile/:profileId?' render={() => <Profile />} />
            <Route path='/messages' render={() => <Messages_container />} />
            <Route path='/frends' render={() => <Friends_container />} />
            <Route path='/login' render={() => <Login />} />
            <Route path='/news' render={() => <News />} />
            <Route path='/music' render={() => <Music />} />
            <Route path='/setting' render={() => <Settings />} />
        </div>

    )
};

export default Main_content;