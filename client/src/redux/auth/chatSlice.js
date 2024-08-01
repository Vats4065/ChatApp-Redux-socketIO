import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    chat: null,
    message: null,
    loading: false,
    error: null,
    potentialChat: null,
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        createChatStart(state) {
            state.loading = true;
            state.error = null;
        },
        createChatSuccess(state, action) {
            state.loading = false;
            state.chat = action.payload;
        },
        createChatFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        getChatStart(state) {
            state.loading = true;
            state.error = null;
        },
        getChatSuccess(state, action) {
            state.loading = false;
            state.chat = action.payload;
        },
        getChatFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
        sendMessageStart(state) {
            state.loading = true;
            state.error = null;
        },
        sendMessageSuccess(action, state) {
            state.loading = false;
            state.message = action.payload;
        },
        sendMessageFailure(state, action) {
            state.loading = false;
            state.error = action.payload;
        },
    },
})

export const { createChatStart, createChatSuccess, createChatFailure, getChatStart, getChatSuccess, getChatFailure, sendMessageStart, sendMessageSuccess } = chatSlice.actions;

export const createChat = (credentials) => async (dispatch) => {
    dispatch(createChatStart());
    try {
        const response = await fetch('http://localhost:5000/api/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        });
        if (!response.ok) {
            throw new Error('Failed to create chat');
        }
        const data = await response.json();
        dispatch(createChatSuccess(data));
    } catch (error) {
        dispatch(createChatFailure(error.message));
    }
}

export const getChat = (credentials) => async (dispatch) => {
    dispatch(getChatStart(credentials));
    try {
        const response = await fetch(`http://localhost:5000/api/chat/${credentials}`, {
            method: 'GET',
        });

        if (!response.ok) {
            throw new Error('Failed to get chat');
        }
        const data = await response.json();


        dispatch(getChatSuccess(data));
    } catch (error) {
        dispatch(getChatFailure(error.message));
    }
}

export default chatSlice.reducer;