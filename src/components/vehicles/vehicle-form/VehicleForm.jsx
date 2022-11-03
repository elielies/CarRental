import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getVehicleById, saveVehicle } from "../../../utils/services/vehicle-http-utils";
import React from "react";

export  function VehicleForm() {

    const navigate = useNavigate();
    const params = useParams();


    const [curVehicle, setCurVehicle] = useState({
        // set temps here for the dropdowns
        type: "economy",
        brand: "",
        model: "",
        constructionYear: "",
        fuelType: "petrol",
        seatCount: "",
        picture: "",
        pricePDay: "",
        count: ""
    })

    useEffect(() => {
        if(params.id) {
            getVehicleById(params.id).then( (response) => {
                setCurVehicle(response.data)
            })
        }
    }, [params.id])

    

    const onFormChange = (event) => {
        setCurVehicle((prevState)=>{
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();   
        saveVehicle(curVehicle).then(()=>{
            navigate('/vehicles');
        })
    }

    return (
        <div className="vehicle-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Type</Form.Label>
                    <Form.Select  name="type" onChange={onFormChange} value={curVehicle.type}>
                        <option value="economy">economy</option>
                        <option value="estate">estate</option>
                        <option value="luxury">luxury</option>
                        <option value="SUV">SUV</option>
                        <option value="cargo">cargo</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Brand</Form.Label>
                    <Form.Control type="text" name="brand" onChange={onFormChange} value={curVehicle.brand}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Model</Form.Label>
                    <Form.Control type="text" name="model" onChange={onFormChange} value={curVehicle.model}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Contruction Year</Form.Label>
                    <Form.Control type="text" name="constructionYear" onChange={onFormChange} value={curVehicle.constructionYear}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Fuel Type</Form.Label>
                    <Form.Select  name="fuelType" onChange={onFormChange} value={curVehicle.fuelType}>
                        <option value="petrol">petrol</option>
                        <option value="diesel">diesel</option>
                        <option value="hybrid">hybrid</option>
                        <option value="electric">electric</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Number of seats</Form.Label>
                    <Form.Control type="number" name="seatCount" onChange={onFormChange} value={curVehicle.seatCount}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="text" name="photo" onChange={onFormChange} value={curVehicle.photo}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Price per Day</Form.Label>
                    <Form.Control type="number" name="pricePDay" onChange={onFormChange} value={curVehicle.pricePDay}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Count</Form.Label>
                    <Form.Control type="number" name="count" onChange={onFormChange} value={curVehicle.count}></Form.Control>
                </Form.Group>
                <Button type="submit">Save vehicle</Button>
            </Form>
        </div>
    )
}