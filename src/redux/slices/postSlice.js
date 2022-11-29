import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    reloadPost: false,
    reloadComment: false,
    showLeftBar: true,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        saveReloadPost: (state, action) => {
            state.reload = action.payload
        },
        saveReloadComment: (state, action) => {
            state.reload = action.payload
        },
        saveShowLeftBar: (state, action) => {
            state.showLeftBar = action.payload
        },
    }
})

export default postSlice.reducer

export const {
    saveReloadPost,
    saveReloadComment,
    saveShowLeftBar
} = postSlice.actions
