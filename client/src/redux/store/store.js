import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice'
import chatReducer from '../auth/chatSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        chat: chatReducer,
    },
});