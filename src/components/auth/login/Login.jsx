import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { login } from "../../../utils/services/auth-http-utils";
import './Login.scss';


export function Login() {

    const [loginCreds, setLoginCreds] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();

    

    const onFormControlChange = (event) => {
        setLoginCreds((prevState) => {
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        })
    }

    

    const onFormSubmit = (event) => {
        event.preventDefault();
        login(loginCreds)
            .then(() => {
                navigate('/users')
            })
            .catch(() => {
                setError(error.message);
            })
    }


    return (
        <div className="login-form-wrapper">
            <Form className="login-form" onSubmit={onFormSubmit}>
                <span className="text-danger">
                    {error}
                </span>
                <Form.Group>
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" onChange={onFormControlChange} required/>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={onFormControlChange} required />
                </Form.Group>
                <Button type="submit">Login</Button>
            </Form>
        </div>
    )
}