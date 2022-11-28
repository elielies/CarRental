import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteVehicle, getVehicles, rentVehicle } from "../../../utils/services/vehicle-http-utils";
import { VehicleCard } from "../vehicle-card/VehicleCard";
import React from "react";
import './VehiclesList.scss';
import { Button } from "react-bootstrap";
import { getLoggedUser } from "../../../utils/services/auth-http-utils";


export function VehiclesList() {
    const [vehicles, setVehicles] = useState([]);
    const navigate = useNavigate();
    

    useEffect(() =>{
        getVehicles()
            .then((response)=>{
                setVehicles(response.data);
            })
    }, []);

    const onDelete = (id) => {
        deleteVehicle(id).then(()=> {
            setVehicles((prevState) => {
                return prevState.filter(vehicle => vehicle.id !== id)
            });
        })
    }

    const renderCreateBtn = () => {
        const loggedUser = getLoggedUser();
        if(loggedUser.isAdmin){
            return <Button onClick={navigateToCreateVehicleHandler} className="mb-5 btn btn-add-new">Create new vehicle</Button>
        } 
    }

    const navigateToCreateVehicleHandler = () => {
            navigate(`/vehicles/create`);
    }

    return (
        <div className="vehicles-list" style={{display: 'flex'}}>
            {renderCreateBtn()}
            {vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onDelete={onDelete} />)}
        </div>
    )
}