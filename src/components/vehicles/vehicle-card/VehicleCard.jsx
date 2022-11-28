import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getLoggedUser } from "../../../utils/services/auth-http-utils";
import { rentVehicle, setRentVeh, setRentVehicle } from "../../../utils/services/vehicle-http-utils";
import React from "react";
import './VehicleCard.scss'


export function VehicleCard({vehicle, onDelete}) {

    const navigate = useNavigate();

    const onDeleteClicked = () => {
      onDelete(vehicle.id);
    }

    const navigateToUpdate = () => {
      navigate(`/vehicles/edit/${vehicle.id}`);
    }


     const rentClicked = () => {
          setRentVeh(vehicle)
            navigate(`/rentals/rent/${vehicle.id}`, {vehicle});
    }


    const renderActionButtons = () => {
      const loggedUser = getLoggedUser();

      if(loggedUser.isAdmin) {
        return <>
          <Button onClick={navigateToDetailsHandler} >Details</Button>
          <Button onClick={navigateToUpdate} className='ms-2'>Update</Button>
          <Button onClick={onDeleteClicked} className='ms-2 btn-danger'>Delete</Button>
          <Button onClick={rentClicked}className='ms-2 btn-warning'>Rent</Button>
        </>
      }else{
         return  <>
          <Button onClick={navigateToDetailsHandler} >Details</Button>
          <Button onClick={rentClicked} className='ms-2 btn-warning'>Rent</Button>
         </>
      }    
    }

    const navigateToDetailsHandler = () => {
      navigate(`/vehicles/details/${vehicle.id}`);
    }

    
      if(vehicle.count >= 1) {
        return (
          
          <div className="single-card">
            <article className="postcard dark red">
              <a className="postcard__img_link" onClick={navigateToDetailsHandler}>
                <img className="postcard__img" src={vehicle.photo} alt="Image Title"/>	
              </a>
              <div className="postcard__text">
                <div className="ms-2">
                <h1 className="postcard__title red" onClick={navigateToDetailsHandler}>{vehicle.brand} {vehicle.model}</h1>
                <div className="postcard__bar"></div>
                <div className="row details">
                            <div className="col-4  ">
                                <div>Brand</div>
                                <div>Model</div>
                                <div>Type</div>
                                <div>Fuel</div>
                                <div>Seats</div>
                                <div>Price</div>
                                <div>Year</div>
                                <div>Available</div>
                            </div>
                            <div className="col-6 ">
                                <div>{vehicle.brand}</div>
                                <div>{vehicle.model}</div>
                                <div>{vehicle.type}</div>
                                <div>{vehicle.fuelType}</div>
                                <div>{vehicle.seatCount}</div>
                                <div>{vehicle.pricePDay}</div>
                                <div>{vehicle.constructionYear}</div>
                                <div>{vehicle.count}</div>
                            </div>
                </div>
                <ul className="postcard__tagbox">
                {renderActionButtons()}
                </ul>
              </div>
              </div>
            </article>
          </div>
      )
      }
    
}