import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router";
import { deleteUser, getUsers } from "../../../utils/services/user-http-utils";
import { UserCard } from "../user-card/UserCard";
import './UsersList.scss';


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

    const navigateToCreateUser = () => {
        navigate(`/users/create`);
    }


    return (
        <div>
            <Button className="btn" onClick={navigateToCreateUser}>Create</Button>
        <div className="users-list" style={{display: 'flex'}}>
            {users.map(user => <UserCard key={user.id} user={user} onDelete={onDelete}/>)}
        </div>
        </div>
    )
}