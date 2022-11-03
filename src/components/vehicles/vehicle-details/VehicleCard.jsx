import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getLoggedUser } from "../../../utils/services/auth-http-utils";
import { rentVehicle, setRentVeh, setRentVehicle } from "../../../utils/services/vehicle-http-utils";
import React from "react";


export function VehicleCard({vehicle, onDelete}) {

    const navigate = useNavigate();

    const onDeleteClicked = () => {
      onDelete(vehicle.id);
    }

    const navigateToUpdate = () => {
      navigate(`/vehicles/edit/${vehicle.id}`);
    }

    // fall back
    // const rentClicked2 = () => {
    //     rentVehicle(vehicle).then(() => {
    //         navigate(`/rentals/rent/${vehicle.id}`, {vehicle});
    //     })
    // }
    //

     const rentClicked2 = () => {
          setRentVeh(vehicle)
            navigate(`/rentals/rent/${vehicle.id}`, {vehicle});
            // navigate(`/rentals/rent/${vehicle.id}`, {vehicle});

          
        // rentVehicle(vehicle).then(() => {
            // navigate(`/rentals/rent/${vehicle.id}`, {vehicle});
        // })
    }


    const renderActionButtons = () => {
      const loggedUser = getLoggedUser();

      if(loggedUser.isAdmin) {
        return <>
          <Button onClick={navigateToUpdate} >Update</Button>
          <Button onClick={onDeleteClicked} className='ms-2 btn-danger'>Delete</Button>
          <Button onClick={rentClicked2}className='ms-2 btn-warning'>Rent</Button>
          {/* <Card.Link onClick={navigateToUpdate}>Update</Card.Link> */}
          {/* <Card.Link  onClick={onDeleteClicked}>Delete</Card.Link> */}
          {/* <Card.Link onClick={rentClicked2}>Rent</Card.Link> */}
        </>
      }else{
         return  <Button onClick={rentClicked2}>Rent</Button>
      }    
    }

    
      if(vehicle.count > 1) {
        return (
          <Card style={{ width: '18rem', margin: '20px' }}>
            <Card.Img variant="top" src={vehicle.photo} height="190rem"/>
            <Card.Body>
              <Card.Title>{vehicle.brand} {vehicle.model} {vehicle.constructionYear}</Card.Title>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>brand: {vehicle.brand}</ListGroup.Item>
              <ListGroup.Item>model: {vehicle.model}</ListGroup.Item>
              <ListGroup.Item>type: {vehicle.type}</ListGroup.Item>
              <ListGroup.Item>fuel: {vehicle.fuelType}</ListGroup.Item>
              <ListGroup.Item>seats: {vehicle.seatCount}</ListGroup.Item>
              <ListGroup.Item>price per day: {vehicle.pricePDay}</ListGroup.Item>
              <ListGroup.Item>available: {vehicle.count}</ListGroup.Item>
              <ListGroup.Item>contruction year: {vehicle.constructionYear}</ListGroup.Item>
            </ListGroup>
            <Card.Body>
              {renderActionButtons()}
            </Card.Body>
          </Card>
      )
      }
    
}