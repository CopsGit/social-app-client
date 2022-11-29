import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    reload: false,
    showLeftBar: true,
}

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        saveReload: (state, action) => {
            state.reload = action.payload
        },
        saveShowLeftBar: (state, action) => {
            state.showLeftBar = action.payload
        },
    }
})

export default postSlice.reducer

export const {
    saveReload,
    saveShowLeftBar
} = postSlice.actions
