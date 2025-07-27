import {useEffect} from "react";
import {useNavigate, useParams, Navigate} from "react-router";
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


    const isValidId = !isNaN(Number(id))
    if (!isValidId) {
        return <Navigate to="/404" replace />;
    }

    useEffect(() => {
        if (!user && id) {
            dispatch(fetchUserById(Number(id)));
        }
    }, [dispatch, id, user]);

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