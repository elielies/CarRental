import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { deleteUser, getUsers } from "../../../utils/services/user-http-utils";
import { getLoggedUser } from "../../../utils/services/auth-http-utils";
import { UserCard } from "../user-card/UserCard";
import './UsersList.scss';
import { Table } from "react-bootstrap";




export function UsersList() {
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();


    useEffect(() =>{
        getUsers()
            .then((response)=>{
                setUsers(response.data);
            })
    }, []);

    const onDelete = (id) => {
        deleteUser(id).then(()=> {
            setUsers((prevState) => {
                return prevState.filter(user => user.id !== id)
            });
        })
    }

    // const navigateToCreateUser = () => {
    //     navigate(`/users/create`);
    // }

  

    // const renderUsersTableBody = () => {
    //     return users.map(user => {

    //         const onEdit = () => {
    //             navigate(`/users/edit/${user.id}`)
    //         }

    //         const onDelete = () => {
    //             deleteUser(user.id).then(()=>{
    //                 setUsers((allUsers)=>{
    //                     return allUsers.filter(u => u.id !== user.id);
    //                 })
    //             })
    //         }

    //         return <tr key={user.id}>
    //             <td>{user.id}</td>
    //             <td>{user.firstName} {user.lastName}</td>
    //             <td>{user.email}</td>
    //             <td className="action-buttons">
    //             {/* {renderActionButtons()} */}
    //                 <button className="edit" onClick={onEdit}>Update</button> 
    //                 <button className="delete" onClick={onDelete}>Delete</button>
    //             </td>
    //         </tr>
    //     })
    // }


    return (
        <div>
            {/* <Button className="btn" onClick={navigateToCreateUser}>Create</Button> */}
        <div className="users-list" style={{display: 'flex'}}>
            {users.map(user => <UserCard key={user.id} user={user} onDelete={onDelete}/>)}
        </div>
        </div>

        // <div className="users-list" >
        //     <Table striped hover bordered>
        //         <thead>
        //             <tr>
        //                 <td>ID</td>
        //                 <td>Name</td>
        //                 <td>Email</td>
        //                 <td>Actions</td>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {renderUsersTableBody()}
        //         </tbody>
        //     </Table>
        // </div>
    )
}