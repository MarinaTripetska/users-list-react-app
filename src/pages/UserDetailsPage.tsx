import {useEffect} from "react";
import {useNavigate, useParams} from "react-router";
import {useSelector, useDispatch} from 'react-redux';
import type {RootState, AppDispatch} from '@/store';
import {fetchUserById} from "@/store/usersSlice.ts";
import {SpinnerCircular} from 'spinners-react';
import toast from "react-hot-toast";


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

    useEffect(() => {
        if (error) {
            toast.error(error, {
                duration: 4000,
                position: 'top-center',
            });
        }
    }, [error]);


    if (!user) {
        return;
    }

    return (
        <section className="section">
            <div className="container">
                <div className="user-details">
                    {loading &&
                        <div className="spinner-overlay">
                            <SpinnerCircular/>
                        </div>
                    }

                    {!user &&
                        <p>User not found.</p>
                    }

                    {user &&
                        <>
                            <h1 className="section-title user-title">
                                {user.firstName} {user.lastName}
                            </h1>

                            <img
                                loading="lazy"
                                width="150"
                                height="auto"
                                src={user.image}
                                alt={`${user.firstName} ${user.lastName}'s avatar`}
                            />

                            <p>Email: {user.email}</p>
                            <p>Phone: {user.phone}</p>
                            <p>Username: {user.username}</p>

                            <button className="primary-btn" onClick={() => navigate("/users")}>Back</button>
                        </>
                    }

                </div>
            </div>
        </section>
    );
}

export default UserDetailsPage;