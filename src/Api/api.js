import * as axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: { 'API-KEY': 'a05eebd7-af21-4521-b5d7-10d633f7d696' }
});

export const userApi = {
    getUsers(countSizeUsers, pageNumberActive) {
        return instance.get(`users?count=${countSizeUsers}&page=${pageNumberActive}`)
    },
    follow(id) {
        return instance.post(`follow/${id}`, {})

    },
    unfollow(id) {
        return instance.delete(`follow/${id}`)
    }
}
export const profileApi = {
    getStatus(userId) {
        return instance.get(`/profile/status/${userId}`)
    },
    updateStatus(status) {
        return instance.put(`/profile/status/`, { status })
    },
    savePhoto(file) {

        let formData = new FormData();
        formData.append("image", file);

        return instance.put(`/profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
    }
}
export const authApi = {
    login(email, password, rememberMe) {
        return instance.post(`/auth/login`, { email, password, rememberMe })
    },
    logout() {
        return instance.delete(`/auth/login`)
    },
    authData() {
        return instance.get(`/auth/me`)
    }
}