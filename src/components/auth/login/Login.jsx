import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getLoggedUser, login } from "../../../utils/services/auth-http-utils";
import { Header } from "../../header/Header";
import './Login.scss';


export function Login() {

    const [loginCreds, setLoginCreds] = useState({});
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const loggedUser = getLoggedUser();

    

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
                navigate('/vehicles')
            })
            .catch(() => {
                setError(error.message);
            })
    }

    const navigateToRegister = () => {
        navigate('/register');
    }


    return (
        <>
        <Header></Header>
        <div className="login-form-wrapper">
            <h1 className="form-title">Wellcome back!</h1>
            <h5 className="form-subtitle">Sign in to your account</h5>
            <Form className="login-form" onSubmit={onFormSubmit}>
                <span className="text-danger">
                    {error}
                </span>
                <Form.Group className="mb-3">
                    <Form.Label className="form-label">Email</Form.Label>
                    <Form.Control className="input-field" type="email" name="email" onChange={onFormControlChange} required/>
                </Form.Group>
                <Form.Group className="mb-3"> 
                    <Form.Label className="form-label">Password</Form.Label>
                    <Form.Control className="input-field" type="password" name="password" onChange={onFormControlChange} required />
                </Form.Group>
                <div className="row mt-5">
                    <div className="row btn-container">
                    {/* <div className="col-5"> */}
                        <Button className="btn btn-submit" variant="primary" type="submit" >Login</Button>
                    </div>
                    <div className="row">
                    {/* <div className="col"> */}
                        <p className="membership">Don't have an account?&nbsp;
                            <a className="sign-in-link" onClick={navigateToRegister}>Sign up</a>
                        </p>
                    </div>
                </div>
                {/* <Button className="btn btn-submit" variant="primary" type="submit" >Login</Button> */}
            </Form>
        </div>
        </>
    )
}