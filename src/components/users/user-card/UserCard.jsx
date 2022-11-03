import { Card } from "react-bootstrap";
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
        <Card.Link onClick={navigateToUpdate}>Update</Card.Link>
        <Card.Link  onClick={onDeleteClicked}>Delete</Card.Link>
      </>
      }

      if (loggedUser.id === user.id) {
        return <Card.Link onClick={navigateToUpdate}>Update</Card.Link>
      }
    }

    return (
        <Card style={{ width: '18rem', margin: '20px' }}>
          <Card.Img variant="top" src={user.photo} />
          <Card.Body>
            <Card.Title>{user.firstName} {user.lastName}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>address: {user.address}</ListGroup.Item>
            <ListGroup.Item>email: {user.email}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            {renderActionButtons()}
          </Card.Body>
        </Card>
    )
}