import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { parseBool } from "../../../utils/services/bool-utils";
import { getUserById, saveUser } from "../../../utils/services/user-http-utils";
import './UserForm.scss';

export function UserForm() {


    const emptyUser = {
        firstName: '',
        lastName: '',
        email: '',
        address: '',
        password: '',
        photo: '',
        isAdmin: false
    }
    const [currentUser, setCurrentUser] = useState({
       emptyUser
    });
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        if(params.id) {
            getUserById(params.id)
                .then((response)=> {
                    setCurrentUser(response.data);
                }) 
        } else {
            setCurrentUser(emptyUser)
        }
    }, [params.id])

    const onFormControlChange = (event) => {

        const target = event.target;
        let prop = 'value';
        if(target.name === 'isAdmin'){
            prop = 'checked';
        }

        setCurrentUser((prevState) =>{
            return {
                ...prevState,
                [event.target.name]: event.target[prop]
            }
        })
    }

    const onCheckboxChange = (event) => {
        setCurrentUser((prevState) =>{
            return {
                ...prevState,
                isAdmin: event.target.checked.toString()
            }
        })
    }


    const submitHandler = (event) => {
        event.preventDefault();
        saveUser(currentUser).then(()=>{
            navigate('/users');
        });
    }

    return (
        <div className="user-form-wrapper">
            <Form className="user-form" onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" name="firstName" placeholder="Enter first name" onChange={onFormControlChange} value={currentUser.firstName} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="text" name="lastName" placeholder="Enter last name" onChange={onFormControlChange} value={currentUser.lastName} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" onChange={onFormControlChange} value={currentUser.email} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter address" onChange={onFormControlChange} value={currentUser.address}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" onChange={onFormControlChange} value={currentUser.password} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoto">
                    <Form.Label>Photo</Form.Label>
                    <Form.Control type="text" name="photo" placeholder="Enter photo" onChange={onFormControlChange} value={currentUser.photo}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoto">
                    <Form.Label>Is Admin</Form.Label>
                    <Form.Check name="isAdmin" onChange={onCheckboxChange} checked={ parseBool(currentUser.isAdmin) }/>
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Submit
                </Button>
            </Form>
        </div>
    )
}