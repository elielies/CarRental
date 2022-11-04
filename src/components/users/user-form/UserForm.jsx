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
        // address: '',
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

    const navigateToLogin = () => {
        navigate('/login');
    }

    return (
        <div className="">
        <div className="user-form-wrapper row">
            <div className="col">
            <h1 className="form-title">Register</h1>
            <Form className="user-form" onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="formBasicFName">
                    <Form.Label className="form-label">First Name</Form.Label>
                    <Form.Control className="input-field" type="text" name="firstName" placeholder="Enter first name" onChange={onFormControlChange} value={currentUser.firstName} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicLName">
                    <Form.Label className="form-label">Last Name</Form.Label>
                    <Form.Control className="input-field" type="text" name="lastName" placeholder="Enter last name" onChange={onFormControlChange} value={currentUser.lastName} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control className="input-field" type="email" name="email" placeholder="Enter email" onChange={onFormControlChange} value={currentUser.email} required/>
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control type="text" name="address" placeholder="Enter address" onChange={onFormControlChange} value={currentUser.address}/>
                </Form.Group> */}
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control className="input-field" type="password" name="password" placeholder="Password" onChange={onFormControlChange} value={currentUser.password} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoto">
                    <Form.Label className="form-label">Photo</Form.Label>
                    <Form.Control className="input-field" type="text" name="photo" placeholder="Enter photo" onChange={onFormControlChange} value={currentUser.photo}/>
                </Form.Group>
                {/* <Form.Group className="mb-3" controlId="formBasicPhoto">
                    <Form.Label>Is Admin</Form.Label>
                    <Form.Check name="isAdmin" onChange={onCheckboxChange} checked={ parseBool(currentUser.isAdmin) }/>
                </Form.Group> */}
                <div className="row mt-5">
                    <div className="col-5">
                        <Button className="btn btn-submit" variant="primary" type="submit" >REGISTER</Button>
                    </div>
                    <div className="col">
                        <p id="membership">Already a member?&nbsp;
                            <a className="sign-in-link" onClick={navigateToLogin}>Sign in</a>
                        </p>
                    </div>
                </div>
                
            </Form>
            </div>
            <div className="col underlay">
                {/* <div className="underlay"></div> */}
                <div>
                    <h3>Rent-A-Car</h3>
                    {/* <img src="https://i.pinimg.com/originals/3c/a4/f5/3ca4f59bd88a1a064e8463a33c104b0b.png"></img> */}
                    {/* <img src="register-car.jpg"></img> */}
                </div>
            </div>
        </div>
        </div>
    )
}