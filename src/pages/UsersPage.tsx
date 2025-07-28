import {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllUsers, fetchUsersByName} from '@/store/usersSlice';
import toast from 'react-hot-toast';
import type {RootState, AppDispatch} from '@/store';
import {SpinnerCircular} from 'spinners-react';

function UsersPage() {
    const navigate = useNavigate();

    const users = useSelector((state: RootState) => state.users.list);
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);
    const dispatch = useDispatch<AppDispatch>();

    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        if (search.trim().length > 0) {
            dispatch(fetchUsersByName(search.trim()));
        } else {
            dispatch(fetchAllUsers());
        }
    }, [search, dispatch]);

    useEffect(() => {
        if (error) {
            toast.error(error, {
                duration: 4000,
                position: 'top-center',
            });
        }
    }, [error]);

    return (
        <section className="section">
            <div className="container">
                <h1 className="section-title users-title">Users</h1>

                <input
                    type="text"
                    id="search-users-input"
                    aria-label="Search users"
                    placeholder="Search users..."
                    className="users-search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div role="status" aria-live="polite">
                    {loading &&
                        <div className="spinner-overlay">
                            <SpinnerCircular/>
                        </div>
                    }

                    {!loading && !error && users.length === 0 && (
                        <p className="users-info">No users found.</p>
                    )}
                </div>

                {users.length > 0 &&
                    <ul className="users-list">
                        {users.map((user) => (
                            <li key={user.id} className="users-card">
                                <h3>
                                    {user.firstName} {user.lastName}
                                </h3>

                                <img
                                    loading="lazy"
                                    width="150"
                                    height="auto"
                                    src={user.image}
                                    alt={`${user.firstName} ${user.lastName}'s avatar`}
                                />

                                <button className="primary-btn" onClick={() => navigate(`/users/${user.id}`)}>
                                    Details
                                </button>
                            </li>
                        ))}
                    </ul>
                }

            </div>
        </section>
    )
}

export default UsersPage;