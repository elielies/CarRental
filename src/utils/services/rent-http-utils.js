import axios from "axios";
import { getLoggedUser } from "./auth-http-utils";
import { getRentVehicle } from "./vehicle-http-utils";
// import { getRentVehicle } from "./vehicle-http-utils";
import React from "react";

const apiUrl = 'http://localhost:3005/rentals';




export function getRental() {
    // return axios.get(apiUrl);

    const loggedUser = getLoggedUser();
    if(loggedUser.isAdmin){
        return axios.get(apiUrl);
    }

    // http://localhost:3002/rentals?authorId=4
    const url =  `${apiUrl}?customerId=${loggedUser.id}`
     return axios.get(url);
}

export function getRentalById(id) {
    // return axios.get(`${apiUrl}/${id}`);
    return axios.get(`${apiUrl}/${id}`);
}

export function saveRental(rentObj) {

    const loggedUser = getLoggedUser();
    const rentVehicle = getRentVehicle();

    // this will break rentals edit when commented  
    // maybe return a popup when the id exists 
    // also maybe create a separate function for updating
    // if (rentObj.id && rentObj.customerId !== loggedUser.id) - check for availabilty
    // if(rentObj.id && (rentObj.customerId === loggedUser.id)){
    // if(rentObj.id){
    //     // http://localhost:3005/tasks/3
    //     return axios.put(`${apiUrl}/${rentObj.id}`, rentObj);
    // }


    const tempId = rentObj.id;
    if(rentObj.id){
        console.log(rentObj.id)
        return axios.put(`${apiUrl}/${rentObj.id}`, rentObj);
        // return axios.put(`${apiUrl}/${rentObj.id}`, rentObj);
    }
    rentObj.id = `${rentVehicle.id}${loggedUser.id}`
    rentObj.vehicle = rentVehicle.brand;
    rentObj.vehicleId = rentVehicle.id;
    rentObj.customerId = loggedUser.id;
    rentObj.customer = `${loggedUser.firstName} ${loggedUser.lastName}`
    rentObj.startDate = new Date(rentObj.startDate).toLocaleString();
    rentObj.endDate = new Date(rentObj.endDate).toLocaleString();

    const date1 = new Date(rentObj.startDate)
    const date2 = new Date(rentObj.endDate)
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    if(diffDays < 6 && diffDays > 3){
        rentObj.price = rentObj.price - rentObj.price * 0.05
    } else if(diffDays < 11 && diffDays > 5) {
        rentObj.price = rentObj.price - rentObj.price * 0.07
    } else if(diffDays > 10){
        rentObj.price = rentObj.price - rentObj.price * 0.1
    }

    
    return axios.post(apiUrl, rentObj);
}

export function deleteRental(id) {
    return axios.delete(`${apiUrl}/${id}`);
}