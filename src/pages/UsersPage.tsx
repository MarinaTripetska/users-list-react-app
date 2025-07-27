import {useEffect, useState} from 'react';
import {useNavigate} from "react-router";
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllUsers} from '@/store/usersSlice';
import type {RootState, AppDispatch} from '@/store';

function UsersPage() {
    const navigate = useNavigate();

    const users = useSelector((state: RootState) => state.users.list);
    const loading = useSelector((state: RootState) => state.users.loading);
    const error = useSelector((state: RootState) => state.users.error);
    const dispatch = useDispatch<AppDispatch>();

    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    return (
        <main>
            <div>
                <h1>Users page</h1>

                <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <div>
                    {loading && <p>Loading...</p>}

                    {error && <p>{error}</p>}

                    <div>
                        {users.map((user) => (
                            <div key={user.id}>
                                <h3>
                                    {user.firstName} {user.lastName}
                                </h3>

                                <button onClick={() => navigate(`/users/${user.id}`)}>
                                    Details
                                </button>
                            </div>
                        ))}
                    </div>

                </div>
            </div>
        </main>
    )
}

export default UsersPage;