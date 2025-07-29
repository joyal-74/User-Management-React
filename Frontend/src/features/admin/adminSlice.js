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


const adminSlice = createSlice({
    name: 'admin',
    initialState: {
        admin: null,
        users : [],
        totalPages : null,
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
                state.totalPages = action.payload.pages;
            })
            .addCase(fetchAllUsers.rejected, (state) => {
                state.loading = false;
            })

    },
});

export const { logout } = adminSlice.actions;
export default adminSlice.reducer;