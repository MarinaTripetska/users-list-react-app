import {useNavigate, useParams} from "react-router";
import {useSelector} from 'react-redux';
import type {RootState} from '@/store';

function UserDetailsPage() {
    const navigate = useNavigate();

    const {id} = useParams();
    const user = useSelector((state: RootState) => {
            const result = state.users.list.find((u) => u.id === Number(id))
            if (result) {
                return result
            }
            throw new Error(`Could not find user with id ${id}`)
        }
    );

    return (
        <div>
            <h1>
                {user.firstName} {user.lastName}
            </h1>
            <p>Email: {user.email}</p>
            <p>Phone: {user.phone}</p>
            <p>Username: {user.username}</p>

            <button onClick={() => navigate("/users")}>Back</button>
        </div>
    );
}

export default UserDetailsPage;