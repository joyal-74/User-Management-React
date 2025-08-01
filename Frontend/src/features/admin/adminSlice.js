import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../api/axiosInstance';


export const loginAdmin = createAsyncThunk(
    'admin/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/login', userData);

            return response.data;
        } catch (err) {
            return rejectWithValue(err.response.data.error || 'Something went wrong');
        }
    }
);

export const fetchCurrentAdmin = createAsyncThunk(
    'admin/me',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/me');
            console.log(response)
            return response.data;
        } catch (error) {
            console.log(error.message)
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch admin');
        }
    }
);


export const fetchAllUsers = createAsyncThunk(
    'admin/users',
    async ({ page = 1, limit = 6 } = {}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/users?page=${page}&limit=${limit}`);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data?.error || 'Failed to fetch users');
        }
    }
);


export const logoutAdmin = createAsyncThunk(
    'admin/logout',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get('/admin/logout');
            return response.data.user;
        } catch (error) {
            console.log(error)
            return rejectWithValue(error.response?.data?.error || 'Failed to logout user');
        }
    }
);

export const deleteUser = createAsyncThunk(
    'user/deleteuser',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/admin/delete/${userId}`);
            return response.data;
        } catch (err) {
            const errorData = err.response?.data?.error || err.message || 'Failed to delete profile';
            return rejectWithValue(errorData);
        }
    }
);


export const searchUser = createAsyncThunk(
    'user/searchuser',
    async ({ query='', page = 1, limit = 6 } = {}, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/admin/search?query=${query}&page=${page}&limit=${limit}`);

            return response.data;
        } catch (err) {
            const errorData = err.response?.data?.error || err.message || 'Failed to fetch users';
            return rejectWithValue(errorData);
        }
    }
);


export const editUser = createAsyncThunk(
    'user/edituser',
    async ({ userId, updatedData }, { rejectWithValue }) => {
        try {
            console.log(updatedData)
            const response = await axiosInstance.put('/admin/edit', updatedData);
            console.log(response)
            return response.data;
        } catch (err) {
            const errorData = err.response?.data?.error || err.message || 'Failed to update profile';
            return rejectWithValue(errorData);
        }
    }
);


export const addUser = createAsyncThunk(
    'user/adduser',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post('/admin/add', userData);
            return response.data;
        } catch (err) {
            const errorData = err.response?.data?.error || err.message || 'Failed to add user';
            return rejectWithValue(errorData);
        }
    }
);


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: null,
        users: [],
        totalPages: null,
        loading: false,
    },
    reducers: {
        logout: (state) => {
            state.admin = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // login
            .addCase(loginAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(loginAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload.admin;
            })
            .addCase(loginAdmin.rejected, (state, action) => {
                state.loading = false;
            })
            // fetch Admin
            .addCase(fetchCurrentAdmin.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchCurrentAdmin.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload?.admin || null;
            })
            .addCase(fetchCurrentAdmin.rejected, (state) => {
                state.loading = false;
            })
            // fetch all users data
            .addCase(fetchAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload?.users || null;
                state.totalPages = action.payload?.pages;
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.loading = false;
            })
            // search users
            .addCase(searchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(searchUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload?.users || null;
                state.totalPages = action.payload.pages;
            })
            .addCase(searchUser.rejected, (state) => {
                state.loading = false;
            })
            //edit user
            .addCase(editUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(editUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload?.users || null;
            })
            .addCase(editUser.rejected, (state) => {
                state.loading = false;
            })
            // delete user
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload?.users || null;
            })
            .addCase(deleteUser.rejected, (state) => {
                state.loading = false;
            })
            // add user
            .addCase(addUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload?.users || null;
            })
            .addCase(addUser.rejected, (state) => {
                state.loading = false;
            })

    },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;