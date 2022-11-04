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
        <Card style={{ width: '18rem', margin: '20px'}}>
          {/* <Card.Img variant="top" src={user.photo}/> */}
          <Card.Body>
            <Card.Title>{user.firstName} {user.lastName}</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            {/* <ListGroup.Item>address: {user.address}</ListGroup.Item> */}
            <ListGroup.Item>email: {user.email}</ListGroup.Item>
          </ListGroup>
          <Card.Body>
            {renderActionButtons()}
          </Card.Body>
        </Card>


        // <div className="card">
        // // <div class="col-md-3 ">
    		// //     <div class="card profile-card-3">
    		// //         <div class="background-block">
    		// //             <img src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&h=650&w=940" alt="profile-sample1" class="background"/>
    		// //         </div>
    		// //         <div class="profile-thumb-block">
    		// //             <img src="https://randomuser.me/api/portraits/men/41.jpg" alt="profile-image" class="profile"/>
    		// //         </div>
    		// //         <div class="card-content">
        // //             <h2>Justin Mccoy<small>Designer</small></h2>
        // //             <div class="icon-block"><a href="#"><i class="fa fa-facebook"></i></a><a href="#"> <i class="fa fa-twitter"></i></a><a href="#"> <i class="fa fa-google-plus"></i></a></div>
        // //             </div>
        // //         </div>
        // //         <p class="mt-3 w-100 float-left text-center"><strong>Modren Profile Card</strong></p>
    		// // </div>
        // // </div>
    )
}