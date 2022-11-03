import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { deleteVehicle, getVehicles, rentVehicle } from "../../../utils/services/vehicle-http-utils";
import { VehicleCard } from "../vehicle-details/VehicleCard";
import React from "react";
import './VehiclesList.scss';


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

    


    return (
        <div className="vehicles-list" style={{display: 'flex'}}>
            {vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onDelete={onDelete} />)}
            {/* {vehicles.map(vehicle => <VehicleCard key={vehicle.id} vehicle={vehicle} onDelete={onDelete} onRent={onRent}/>)} */}
        </div>
    )
}