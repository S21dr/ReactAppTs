import React, {FC} from 'react';
import { NavLink } from 'react-router-dom';
import s from './Frends.module.css';
import {UserType} from "../../../redux/types/types";


type PropsType = {
    frends:Array<UserType>
    totalCount:number
    countSizeUsers:number
    pageNumberActive:number
    followingProgress: Array <number>
    unfollow:(id:number)=>void
    follow:(id:number)=>void
    onPageChanged:(page:number)=>void

}
let Frends:FC<PropsType> = (props) => {
    
    let users = props.frends.map((u) => {
        return (

            <div key={u.id}>
                <div>
                    <NavLink to={`profile/${u.id}`}><img className={s.imgProfile} src={u.photos.small ? u.photos.small : "https://cdn.iconscout.com/icon/premium/png-512-thumb/profile-1506810-1278719.png"} alt="" /></NavLink>
                    <NavLink to={`profile/${u.id}`} className={s.link}> {u.name}</NavLink>
                    {/*<p>{u.photos}</p>*/}
                    <p>{u.status}</p>
                </div>
                {/* <div>
            <span>{u.location.city}</span>&nbsp;
            <span>{u.location.country}</span>
        </div> */}
                <span>
                    {u.followed ?
                        <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                            props.unfollow(u.id)
                        }}>UnFollow</button>

                        : <button disabled={props.followingProgress.some(id => id === u.id)} onClick={() => {
                            props.follow(u.id)
                        }}>Follow</button>}
                </span>
            </div >
        )
    })
    let pageCount = props.totalCount / props.countSizeUsers;
    let pageCountTotal = [];
    for (let i = 1; i < pageCount; i++) {
        let pageNumberActive = props.pageNumberActive === i ? s.activePage : null;
        pageCountTotal.push(<span
            className={pageNumberActive + ' ' + s.page}
            onClick={() => { props.onPageChanged(i) }}> {i} </span >);
    }

    return (
        <div>
            {pageCountTotal}
            {users}
        </div>
    );
}

export default Frends;