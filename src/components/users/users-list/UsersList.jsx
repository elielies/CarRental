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



    return (
        <div className="users-list" style={{display: 'flex'}}>
            {users.map(user => <UserCard key={user.id} user={user} onDelete={onDelete}/>)}
        </div>

    )
}