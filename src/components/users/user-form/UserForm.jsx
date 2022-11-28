import { useEffect } from "react";
import { useState } from "react";
import { Form } from "react-bootstrap";
import {Button} from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getLoggedUser } from "../../../utils/services/auth-http-utils";
import { parseBool } from "../../../utils/services/bool-utils";
import { getUserById, saveUser } from "../../../utils/services/user-http-utils";
import './UserForm.scss';

export function UserForm() {


    const emptyUser = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        phone: '',
        photo: '',
        isAdmin: false
    }
    const [currentUser, setCurrentUser] = useState({
       emptyUser
    });
    const navigate = useNavigate();
    const params = useParams();
    const [error, setError] = useState('');


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

    const checkboxHandler = (event) => {
        setCurrentUser((prevState) => {
            return {
                ...prevState,
                isAdmin: event.target.checked.toString()
            }
        })
    }

    const renderAdminHandler = () => {
        const loggedUser = getLoggedUser();

        if (!loggedUser || !loggedUser.isAdmin || loggedUser.id === currentUser.id)
            return '';

        return <Form.Group className="mb-3" controlId="formBasicEmail">
            <div className="row">
                <div className="col-3">
                    <Form.Label>Make Admin</Form.Label>
                </div>
                <div className="col">
                    <Form.Check name="isAdmin" onChange={checkboxHandler} checked={parseBool(currentUser.isAdmin)} />
                </div>
            </div>
        </Form.Group>
    }

    


    const submitHandler = (event) => {
        event.preventDefault();
        saveUser(currentUser).then(()=>{
            navigate('/users');
        }).catch(error => {
            setError(error.message)
        });
    }

    const navigateToLogin = () => {
        navigate('/login');
    }

    return (
        <div className="">
        <div className="user-form-wrapper row ">
            <h1 className="user-form-title">Register</h1>
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
                    <span className="error-message text-danger">{error}</span>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhone">
                    <Form.Label className="form-label">Phone</Form.Label>
                    <Form.Control className="input-field" type="text" name="phone" placeholder="Enter phone" onChange={onFormControlChange} value={currentUser.phone} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control className="input-field" type="password" name="password" placeholder="Password" onChange={onFormControlChange} value={currentUser.password} required/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPhoto">
                    <Form.Label className="form-label">Photo</Form.Label>
                    <Form.Control className="input-field" type="text" name="photo" placeholder="Enter photo" onChange={onFormControlChange} value={currentUser.photo}/>
                </Form.Group>
                {renderAdminHandler()}
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
        </div>
    )
}