import { Navigate, useNavigate } from "react-router";
import { UsersList } from "../../components/users/users-list/UsersList";
import { getLoggedUser } from "../services/auth-http-utils";

export function NonAuthenticatedRoute ({children}) {
    const navigate = useNavigate();
    const user = getLoggedUser();

    if(user) {
       return <Navigate to='/users'></Navigate>
    }

    return children;
}

