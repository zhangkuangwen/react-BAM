import { configureStore, combineReducers } from '@reduxjs/toolkit';

import user from './user';
const reducer = combineReducers({
    user,
});
export const store = configureStore({
    reducer,
});