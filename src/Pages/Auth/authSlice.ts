import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
// import api from '../../lib/api'; // REMOVE this top-level import

// Types for the user and auth state
interface User {
  sub: string;
  email: string;
  name?: string;
  [key: string]: any;
}

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  user: User | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// On app load, get token from localStorage
const storedToken = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null;

const initialState: AuthState = {
  accessToken: storedToken,
  refreshToken: null,
  isAuthenticated: false,
  user: null,
  status: 'idle',
  error: null,
};

// Async thunk for logging in
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (
    credentials: { email?: string; username?: string; password: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const api = (await import('../../lib/api')).default;
      const response = await api.post('/auth/login', credentials);
      const { access_token, refresh_token } = response.data;
      if (typeof window !== 'undefined') {
        localStorage.setItem('accessToken', access_token);
      }
      // Fetch user info after login
      await dispatch(fetchUser(access_token));
      return { accessToken: access_token, refreshToken: refresh_token };
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Login failed');
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (
    data: { username: string; email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const api = (await import('../../lib/api')).default;
      await api.post('/auth/register', data);
      return true;
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.message || 'Registration failed');
    }
  }
);

// Async thunk for fetching user info
export const fetchUser = createAsyncThunk(
  'auth/fetchUser',
  async (accessToken: string, { rejectWithValue }) => {
    try {
      const api = (await import('../../lib/api')).default;
      // Temporarily set the token for this request
      const response = await api.get('/auth/userinfo', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      return response.data as User;
    } catch (err: any) {
      return rejectWithValue('Failed to fetch user info');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.isAuthenticated = false;
      state.user = null;
      state.status = 'idle';
      state.error = null;
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(loginUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) => {
        state.status = 'succeeded';
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Register
      .addCase(registerUser.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      // Fetch user
      .addCase(fetchUser.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUser.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.status = 'succeeded';
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
