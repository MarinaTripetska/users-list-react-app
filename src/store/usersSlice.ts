import {createSlice, createAsyncThunk, type PayloadAction} from '@reduxjs/toolkit';
import type {User} from '@/types/UsersApiResponse';
import UsersApiService from '@/services/UsersApiService';

type UsersState = {
    list: User[];
    loading: boolean;
    error: string | null;
};

const initialState: UsersState = {
    list: [],
    loading: false,
    error: null,
};

const api = UsersApiService.create();

export const fetchAllUsers = createAsyncThunk<User[]>(
    'users/fetchAll',
    async (_, {rejectWithValue}) => {
        try {
            return await api.getAllUsers();
        } catch (e: any) {
            return rejectWithValue(e.message ?? 'Unknown error');
        }
    }
);

export const fetchUserById = createAsyncThunk<User, number>(
    'users/fetchById',
    async (id, {rejectWithValue}) => {
        try {
            return await api.getUserById(id);
        } catch (e: any) {
            return rejectWithValue(e.message ?? 'Unknown error');
        }
    }
);

export const fetchUsersByName = createAsyncThunk<User[] | null, string>(
    'users/fetchByName',
    async (name: string, { rejectWithValue }) => {
        try {
           return await api.getUsersByName(name);
        } catch (err) {
            return rejectWithValue((err as Error).message);
        }
    }
);

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllUsers.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.list = action.payload;
                state.error = null;
                state.loading = false;

            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            //add by search
            .addCase(fetchUsersByName.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            .addCase(fetchUsersByName.fulfilled, (state, action: PayloadAction<User[] | null>) => {
                if(action.payload){
                    state.list = action.payload;
                }
                state.error = null;
                state.loading = false;
            })
            .addCase(fetchUsersByName.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            })
            //add one user
            .addCase(fetchUserById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUserById.fulfilled, (state, action: PayloadAction<User>) => {
                state.error = null;

                const user = action.payload;
                const index = state.list.findIndex(u => u.id === user.id);
                if (index >= 0) {
                    state.list[index] = user;
                } else {
                    state.list.push(user);
                }

                state.loading = false;
            })
            .addCase(fetchUserById.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default usersSlice.reducer;
