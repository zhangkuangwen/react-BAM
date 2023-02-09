import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
const name = 'user';
const initialState = {
    userInfo: {}
}
const userSlice = createSlice({
    name,
    initialState,
    reducers: {
        setUserInfo(state, action){
            state.userInfo = action.payload
        },
        logout(state){
            state.userInfo = {}
        }
    }
})
export const { logout, setUserInfo } = userSlice.actions;
export default userSlice.reducer;