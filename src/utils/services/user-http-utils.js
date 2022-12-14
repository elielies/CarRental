import axios from "axios";
import { getLoggedUser } from "./auth-http-utils";

const apiUrl = "http://localhost:3005/users";

export function getUsers() {
    return axios.get(apiUrl);
}

export function getUserById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export async function saveUser(userObj) {
    const loggedUser = getLoggedUser();
    if(!userObj.photo) {
        userObj.photo = `https://picsum.photos/200/300?random=${Math.random()}`
    }

    const response = await getUsers();
    const users = response.data;
    const existingUser = users.find(u => u.email === userObj.email && u.id !== userObj.id)
    if(existingUser){
        throw new Error('Email already taken')
    }

    if(userObj.id) {
        return axios.put(`${apiUrl}/${userObj.id}`, userObj).then(() => {
            if(!loggedUser.isAdmin){
                localStorage.setItem('loggedUser', JSON.stringify(userObj))
            }
        })
    }

    return axios.post(apiUrl, userObj);
}

export function deleteUser(id) {
    // http://localhost:3005/users/1
    return axios.delete(`${apiUrl}/${id}`)

}