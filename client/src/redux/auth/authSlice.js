import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    userById: null,
    user: null,
    loading: false,
    error: null,
    // state: loading | ready | error

};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerStart(state) {
            state.loading = true;
            state.error = null;
        },
        registerSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        registerFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getUserByIdStart(state) {
            state.loading = true
            state.error = null
        },

        getUserByIdSuccess(state, action) {
            state.loading = false
            state.userById = action.payload
        },
        getUserByIdFailure(state, action) {
            state.loading = false
            state.error = action.payload
        },

        loginStart(state) {
            state.loading = true;
            state.error = null;
        },
        loginSuccess(state, action) {
            state.loading = false;
            state.user = action.payload;
        },
        loginFailure(state, action) {
            state.loading = false;
            state.error = action.payload;

        },



    },
});

export const { registerStart, registerFailure, registerSuccess, loginStart, loginSuccess, loginFailure, getUserByIdFailure, getUserByIdStart, getUserByIdSuccess } = authSlice.actions;

export const loginUser = (credentials) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const response = await fetch('http://localhost:5000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();

        dispatch(loginSuccess(data?.user));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};


export const registerUser = (credentials) => async (dispatch) => {
    dispatch(registerStart());
    try {
        const response = await fetch("http://localhost:5000/api/user/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
        if (!response.ok) {
            throw new Error('Registration failed')
        }
        const data = await response.json()
        dispatch(registerSuccess(data))
    } catch (error) {
        dispatch(registerFailure(error.message))
    }

}


export const getUserById = (credentials) => async (dispatch) => {

    dispatch(getUserByIdStart())
    try {
        const response = await fetch(`http://localhost:5000/api/user/user/${credentials}`)
        if (!response.ok) {
            throw new Error('Failed to get user')
        }
        const data = await response.json()

        dispatch(getUserByIdSuccess(data.user))

    } catch (error) {
        dispatch(getUserByIdFailure(error.message))
    }
}

export default authSlice.reducer;
