import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Card } from "react-bootstrap";
import { ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router";
import { getLoggedUser } from "../../../utils/services/auth-http-utils";
import './UserCard.scss';

export function UserCard({user, onDelete}) {

    const navigate = useNavigate();

    const onDeleteClicked = () => {
      onDelete(user.id);
    }

    const navigateToUpdate = () => {
      navigate(`/users/edit/${user.id}`);
    }

    

    const renderActionButtons = () => {
      const loggedUser = getLoggedUser();


      if(loggedUser.isAdmin && loggedUser.id !== user.id) {
        return <>
        <div className="text-center">
        <Button className="btn user-btn me-3" onClick={navigateToUpdate}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Button>
        <Button className="btn user-btn btn-danger" onClick={onDeleteClicked}><FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></Button>
        </div>
      </>
      }

      if (loggedUser.id === user.id) {
        return <div className="text-center">
        <Button className="btn user-btn" onClick={navigateToUpdate}><FontAwesomeIcon icon={faEdit}></FontAwesomeIcon></Button>
        </div>

      }
    }

    return (
        <Card style={{ width: '18rem', margin: '20px'}}>
          <Card.Img className="user-card-img" variant="top" src={user.photo} height="350px"/>
          <Card.Body>
            <Card.Title className="user-title">{user.firstName} {user.lastName}</Card.Title>
          </Card.Body>
          <ListGroup className="card-detail list-group-flush">
            <ListGroup.Item>email: {user.email}</ListGroup.Item>
            <ListGroup.Item>phone: {user.phone}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            {renderActionButtons()}
          </Card.Body>
        </Card>


    )
}