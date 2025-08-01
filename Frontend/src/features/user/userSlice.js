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
            // console.log(response)
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
            // console.log(response)
            return response.data;
        } catch (error) {
            if (error.response?.status === 401) {
                return rejectWithValue('Unauthorized');
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
            // console.log(response)
            return response.data.user;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.error || 'Failed to logout user');
        }
    }
);

export const updateUserProfile = createAsyncThunk(
    'user/updateProfile',
    async (updatedData, { rejectWithValue }) => {
        try {
            // console.log(updatedData)
            const response = await axiosInstance.put('/users/me', updatedData);
            if (!response) {
                throw new Error('No response received from server');
            }
            return response.data;
        } catch (err) {
            const errorData = err.response?.data?.error || err.message || 'Failed to update profile';
            return rejectWithValue(errorData);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: null,
        loading: false,
        isLoggedIn: false,
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
                state.user = action.payload.user || null;
                state.isLoggedIn = true;
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
                state.isLoggedIn = true;
            })
            .addCase(fetchCurrentUser.rejected, (state) => {
                state.loading = false;
                state.isLoggedIn = false;
            })
            // update profile
            .addCase(updateUserProfile.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUserProfile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload?.user || null;
            })
            .addCase(updateUserProfile.rejected, (state, action) => {
                state.loading = false;
            });

    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;