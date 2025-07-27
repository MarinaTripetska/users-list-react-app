import {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector, useDispatch} from 'react-redux';
import type {RootState, AppDispatch} from '@/store';
import {fetchUserById} from "@/store/usersSlice.ts";

function UserDetailsPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();

    const {id} = useParams();
    const user = useSelector((state: RootState) =>
        state.users.list.find((u) => u.id === Number(id)));
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);

    useEffect(() => {
        if (!id) {
            throw new Error("User ID is missing");
        }

        const numericId = Number(id);

        if (isNaN(numericId)) {
            navigate('/404');
            return;
        }

        if (!user) {
            dispatch(fetchUserById(numericId));
        }
    }, [user, id, navigate, dispatch]);

    if (loading) {
        return <p>Loading user details...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!user) {
        return <p>User not found.</p>;
    }

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