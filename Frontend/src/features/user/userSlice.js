import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';

export const registerUser = createAsyncThunk(
    'user/register',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/users/register', userData);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error || 'Something went wrong');
        }
    }
);

export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/users/login', userData);

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error || 'Something went wrong');
        }
    }
);

export const fetchCurrentUser = createAsyncThunk(
    'user/me',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/users/me');
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                return null;
            }
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch user');
        }
    }
);

export const logoutUser = createAsyncThunk(
    'user/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/users/logout');
            return response.data.user;
        } catch (error) {
            // console.log(error)
            // return rejectWithValue(error.response?.data?.error || 'Failed to logout user');
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            //register
            .addCase(registerUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
            })
            // login
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
            })
            // fetch user
            .addCase(fetchCurrentUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentUser.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user || null; 
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
            })

    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;