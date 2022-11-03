import { useEffect } from "react";
import { useState } from "react";
import { Table } from "react-bootstrap";
import { useNavigate } from "react-router";
import { deleteRental, getRental } from "../../../utils/services/rent-http-utils";
import React from "react";

const wrapperStyles = {
    margin: '5rem'
};

export function RentalList() {
    const [rentals, setRental] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getRental()
            .then((response) =>{
                setRental(response.data)
            })
    }, [])

    const renderTableBody = () => {
        return rentals.map(rental => {

            const onEdit = () => {
                navigate(`/rentals/edit/${rental.id}`)
            }

            const onDelete = () => {
                deleteRental(rental.id).then(()=>{
                    setRental((allRentals)=>{
                        return allRentals.filter(r => r.id !== rental.id);
                    })
                })
            }

            return <tr key={rental.id}>
                <td>{rental.id}</td>
                <td>{rental.vehicle}</td>
                <td>{rental.customer}</td>
                <td>{rental.price}</td>
                <td>{rental.startDate   }</td>
                <td>{rental.endDate}</td>
                <td className="action-buttons">
                    <button className="edit" onClick={onEdit}>Edit</button>
                    <button className="delete" onClick={onDelete}>Delete</button>
                </td>
            </tr>
        })
    }


    return (
        <div className="tasks-list" style={wrapperStyles}>
            <Table striped hover bordered>
                <thead>
                    <tr>
                        <td>ID</td>
                        <td>Vehicle</td>
                        <td>Customer</td>   
                        <td>Price</td>
                        <td>Start Date</td>
                        <td>End Date</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {renderTableBody()}
                </tbody>
            </Table>
        </div>
    )
}