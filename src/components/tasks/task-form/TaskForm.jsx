import { useEffect } from "react";
import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate, useParams } from "react-router";
import { getTaskById, saveTask } from "../../../utils/services/task-http-utils";
import './TaskForm.scss';

export  function TaskForm() {

    const navigate = useNavigate();
    const params = useParams();


    const [currentTask, setCurrentTask] = useState({
        title: '',
        description: '',
        status: 'pending'
    })

    useEffect(() => {
        if(params.id) {
            getTaskById(params.id).then( (response) => {
                setCurrentTask(response.data)
            })
        }
    }, [params.id])

    

    const onFormChange = (event) => {
        setCurrentTask((prevState)=>{
            return {
                ...prevState,
                [event.target.name]: event.target.value
            }
        });
    }

    const onFormSubmit = (event) => {
        event.preventDefault();   
        saveTask(currentTask).then(()=>{
            navigate('/tasks');
        })
    }

    return (
        <div className="task-form-wrapper">
            <Form onSubmit={onFormSubmit}>
                <Form.Group>
                    <Form.Label>Title</Form.Label>
                    <Form.Control type="text" name="title" onChange={onFormChange} value={currentTask.title}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control type="text" name="description" onChange={onFormChange} value={currentTask.description}></Form.Control>
                </Form.Group>
                <Form.Group>
                    <Form.Label>Status</Form.Label>
                    <Form.Select  name="status" onChange={onFormChange} value={currentTask.status}>
                        <option value="Pending">pending</option>
                        <option value="InProgress">in progress</option>
                        <option value="Done">done</option>
                    </Form.Select>
                </Form.Group>
                <Button type="submit">Save task</Button>
            </Form>
        </div>
    )
}