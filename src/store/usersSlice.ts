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
                state.loading = false;
            })
            .addCase(fetchAllUsers.rejected, (state, action) => {
                state.error = action.payload as string;
                state.loading = false;
            });
    },
});

export default usersSlice.reducer;
