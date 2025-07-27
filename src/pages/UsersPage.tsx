import { useEffect, useState } from 'react';
import {useNavigate} from "react-router";
import UsersApiService from "@/services/UsersApiService.ts";
import type { User } from "@/types/UsersApiResponse.ts";

function UsersPage() {
    const api = UsersApiService.create();
    const navigate = useNavigate();


    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState<string>("");

    useEffect(() => {
        const fetchUsers = async () =>{
            setLoading(true);
            try {
                const users = await api.getAllUsers();
                setUsers(users);
            } catch(e) {
                if(e instanceof Error){
                    setError(e.message + "Failed to load users.")
                }
            }
        }

        fetchUsers().finally(() => setLoading(false));
    }, []);




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