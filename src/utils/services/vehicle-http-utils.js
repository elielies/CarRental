import { getLoggedUser } from "./auth-http-utils";
import axios from "axios";
import { VehicleCard } from "../../components/vehicles/vehicle-card/VehicleCard";
import React from "react";


const apiUrl = 'http://localhost:3005/vehicles';

let rentVeh = '';
let setRentV = '';

export function getRentVehicle() {
    return rentVeh;
}

export function getRentedVeh() {
    return setRentV;
}

export function setRentVeh(vehObj) {
    setRentV = vehObj;
    // return setRentV;
}

export function getVehicles() {
    return axios.get(apiUrl);
}

export function getVehicleById(id) {
    return axios.get(`${apiUrl}/${id}`);
}

export function saveVehicle(vehObj) {

    if(!vehObj.photo) {
        vehObj.photo = `https://picsum.photos/200/300?random=${Math.random()}`
    }


    if(vehObj.id){
        // http://localhost:3005/tasks/3
        return axios.put(`${apiUrl}/${vehObj.id}`, vehObj);
    }


    const loggedUser = getLoggedUser();
    // vehObj.createdDate = new Date().toLocaleString();
    // vehObj.authorId = loggedUser.id;
    // vehObj.authorName = `${loggedUser.firstName} ${loggedUser.lastName}`

    return axios.post(apiUrl, vehObj);
}

export function deleteVehicle(id) {
    return axios.delete(`${apiUrl}/${id}`);
}

export function rentVehicle(vehObj) {
    let availabilty = vehObj.count;
    availabilty--;
    rentVeh = vehObj;
    return axios.patch(`${apiUrl}/${vehObj.id}`, {count: availabilty});
}