import {configureStore} from '@reduxjs/toolkit'

import postReducer from "./slices/postSlice";

export default configureStore({
    reducer: {
        post: postReducer,
    }
})