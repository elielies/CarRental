import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getLoggedUser } from "../../../utils/services/auth-http-utils";
import { getRentalById, saveRental } from "../../../utils/services/rent-http-utils";
import { getRentedVeh, getRentVehicle, getVehicleById, rentVehicle } from "../../../utils/services/vehicle-http-utils";
import React from "react";
import './RentForm.scss';


export  function RentForm() {

    const navigate = useNavigate();
    const params = useParams();
    const rentalVeh = getRentedVeh();
    const loggedUser = getLoggedUser();
    
    const [currentRental, setCurrentRental] = useState({
        startDate: '',
        endDate: '',
        price: rentalVeh.pricePDay
    })

    useEffect(() => {
        if(params.id) {
            const editId = `${params.id}${loggedUser.id}`
                getRentalById(editId).then( (response) => {
                setCurrentRental(response.data)
            })
        }
    }, [params.id])

    

    const onFormChangeHandler = (event) => {
        setCurrentRental((prevState)=>{
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    // const onFormSubmitHandler = (event) => {
    //     event.preventDefault();  
    //     rentVehicle(rentalVeh).then(() => {
    //         saveRental(currentRental).then(()=>{
    //             navigate('/vehicles');
    //         })
    //     })
    // }


    const onFormSubmitHandler = (event) => {
        event.preventDefault();  
        if(!currentRental.id){
            rentVehicle(rentalVeh).then(() => {
                saveRental(currentRental).then(()=>{
                    navigate('/vehicles');
                })
            }) 
        } else{
            saveRental(currentRental).then(()=>{
                navigate('/vehicles');
            })
        }
        
    }


    let price2 = rentalVeh.pricePDay

    const priceCalc = () => {
        if(diffDays < 6 && diffDays > 3){
            price2 = price2 - price2 * 0.05
        } else if(diffDays < 11 && diffDays > 5) {
            price2 = price2 - price2 * 0.07
        } else if(diffDays > 10){
            price2 = price2 - price2 * 0.1
        }
    }
    const date1 = new Date(currentRental.startDate)
    const date2 = new Date(currentRental.endDate)
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    priceCalc();


    const onPriceChangeHandler = (event) => {
        setCurrentRental((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }


    const navigateToVehicles = () =>{
        navigate('/vehicles');
    }

    return (
        <div className="rent-form-wrapper">
            <div className="row">
                <div className="col-6">
                <h1 className="form-title">Rent vehicle</h1>
                </div>
                <div className="col btn-back-container">
                <Button className="btn btn-back" onClick={navigateToVehicles}>Back to vehicles</Button>
                </div>
            </div>
            <Form  className="form" onSubmit={onFormSubmitHandler}>
                <Form.Group>
                    <Form.Label className="form-label">Vehicle</Form.Label>
                    <Form.Control className="input-field" type="text" name="vehicle" onChange={onFormChangeHandler} value={`${rentalVeh.brand} ${rentalVeh.model}`}></Form.Control>
                </Form.Group>
                <div className="row">
                    <div className="col">
                        <Form.Group>
                            <Form.Label className="form-label">Start date</Form.Label>
                            <Form.Control className="input-field" type="date" name="startDate" onChange={onFormChangeHandler} value={currentRental.startDate}></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group>
                            <Form.Label className="form-label">End date</Form.Label>
                            <Form.Control className="input-field" type="date" name="endDate" onChange={onFormChangeHandler} value={currentRental.endDate}></Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <Form.Group>
                    <Form.Label className="form-label">Price</Form.Label>
                    <Form.Control className="input-field" type="number" name="price" onChange={onPriceChangeHandler} value={price2} ></Form.Control>
                </Form.Group>
                <Button className=" btn form-btn" type="submit">Rent</Button>
            </Form>
        </div>
        
    )
}