import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getVehicleById, saveVehicle } from "../../../utils/services/vehicle-http-utils";
import React from "react";
import './VehicleForm.scss';


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
        <>
        <div className="vehicle-form-wrapper">
            <h1 className="form-title">Add Vehicle</h1>
            <Form className="form" onSubmit={onFormSubmit}>
                <div className="row">
                    <div className="col">
                        <Form.Group>
                            <Form.Label className="form-label" >Brand</Form.Label>
                            <Form.Control className="input-field" type="text" name="brand" onChange={onFormChange} value={curVehicle.brand} placeholder="Brand name"></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group>
                            <Form.Label className="form-label">Model</Form.Label>
                            <Form.Control className="input-field" type="text" name="model" onChange={onFormChange} value={curVehicle.model} placeholder="Model"></Form.Control>
                        </Form.Group>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col">
                    <Form.Group>
                        <Form.Label className="form-label">Type</Form.Label>
                        <Form.Select className="input-field" name="type" onChange={onFormChange} value={curVehicle.type} placeholder="Vehicle type">
                            <option value="economy">economy</option>
                            <option value="estate">estate</option>
                            <option value="luxury">luxury</option>
                            <option value="SUV">SUV</option>
                            <option value="cargo">cargo</option>
                        </Form.Select>
                    </Form.Group>
                    </div>
                    <div className="col">
                    <Form.Group>
                        <Form.Label className="form-label">Fuel Type</Form.Label>
                        <Form.Select className="input-field" name="fuelType" onChange={onFormChange} value={curVehicle.fuelType}  placeholder="Fuel type">
                            <option value="petrol">petrol</option>
                            <option value="diesel">diesel</option>
                            <option value="hybrid">hybrid</option>
                            <option value="electric">electric</option>
                        </Form.Select>
                        </Form.Group>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Form.Group>
                            <Form.Label className="form-label">Construction Year</Form.Label>
                            <Form.Control className="input-field" type="text" name="constructionYear" onChange={onFormChange} value={curVehicle.constructionYear}  placeholder="Year"></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group>
                            <Form.Label className="form-label">Number of seats</Form.Label>
                            <Form.Control className="input-field" type="number" name="seatCount" onChange={onFormChange} value={curVehicle.seatCount}  placeholder="Seat Count"></Form.Control>
                        </Form.Group>
                    </div>
                    <div className="col">
                        <Form.Group >
                            <Form.Label className="form-label">Availability</Form.Label>
                            <Form.Control className="input-field" type="number" name="count" onChange={onFormChange} value={curVehicle.count}  placeholder="Count"></Form.Control>
                        </Form.Group>
                    </div>
                </div>
                
                
                
                <Form.Group>
                    <Form.Label className="form-label">Photo</Form.Label>
                    <Form.Control className="input-field" type="text" name="photo" onChange={onFormChange} value={curVehicle.photo}  placeholder="Car photo"></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label className="form-label">Price per Day</Form.Label>
                    <Form.Control className="input-field" type="number" name="pricePDay" onChange={onFormChange} value={curVehicle.pricePDay}  placeholder="Price"></Form.Control>
                </Form.Group>
                
                <Button className=" btn form-btn" type="submit">Save vehicle</Button>
            </Form>
        </div>
        </>
    )
}