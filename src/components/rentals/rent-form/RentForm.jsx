import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getLoggedUser } from "../../../utils/services/auth-http-utils";
import { getRentalById, saveRental } from "../../../utils/services/rent-http-utils";
import { getRentedVeh, getRentVehicle, getVehicleById, rentVehicle } from "../../../utils/services/vehicle-http-utils";
import React from "react";

export  function RentForm() {

    const navigate = useNavigate();
    const params = useParams();
    // const rentalVeh = getRentVehicle();
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
            // getRentalById(params.id).then( (response) => {
                getRentalById(editId).then( (response) => {
                setCurrentRental(response.data)
            })
        }
    }, [params.id])

    

    const onFormChange = (event) => {
        setCurrentRental((prevState)=>{
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    // const onFormSubmit = (event) => {
    //     event.preventDefault();  
        
    //     saveRental(currentRental).then(()=>{
    //         navigate('/vehicles');
    //     })
    // }


    const onFormSubmit = (event) => {
        event.preventDefault();  
        rentVehicle(rentalVeh).then(() => {
            saveRental(currentRental).then(()=>{
                navigate('/vehicles');
            })
        })
        
    }


    let price2 = rentalVeh.pricePDay
    console.log(rentalVeh.pricePDay)

    const priceCalc = () => {
        if(diffDays < 6 && diffDays > 3){
            price2 = price2 - price2 * 0.05
        } else if(diffDays < 11 && diffDays > 5) {
            price2 = price2 - price2 * 0.07
        } else if(diffDays > 10){
            // console.log(diffDays + " days")
            price2 = price2 - price2 * 0.1
        }
    }
    const date1 = new Date(currentRental.startDate)
    const date2 = new Date(currentRental.endDate)
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    priceCalc();


    const onPriceChange = (event) => {
        setCurrentRental((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    return (
        <div className="task-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Vehicle</Form.Label>
                    <Form.Control type="text" name="vehicle" onChange={onFormChange} value={`${rentalVeh.brand} ${rentalVeh.model}`}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Start date</Form.Label>
                    <Form.Control type="date" name="startDate" onChange={onFormChange} value={currentRental.startDate}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>End date</Form.Label>
                    <Form.Control type="date" name="endDate" onChange={onFormChange} value={currentRental.endDate}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price</Form.Label>
                    <Form.Control type="number" name="price" onChange={onPriceChange} value={price2} ></Form.Control>
                </Form.Group>
                <Button type="submit">Rent</Button>
            </Form>
        </div>
    )
}