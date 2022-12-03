import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    reloadPost: false,
    reloadComment: false,
    showLeftBar: true,
    curStoryIndex: 0,
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
        saveCurStoryIndex: (state, action) => {
            state.curStoryIndex = action.payload
        },
    }
})

export default postSlice.reducer

export const {
    saveReloadPost,
    saveReloadComment,
    saveShowLeftBar,
    saveCurStoryIndex
} = postSlice.actions
