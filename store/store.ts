'use client'
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';


import userReducer from './slices/userSlice'

import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createNoopStorage = () => {
    return {
        getItem(_key: any) {
            return Promise.resolve(null);
        },
        setItem(_key: any, value: any) {
            return Promise.resolve(value);
        },
        removeItem(_key: any) {
            return Promise.resolve();
        },
    };
};

const storage = typeof window !== "undefined" ? createWebStorage("local") : createNoopStorage();

// 🔐 Persist config
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user'], // only persist deviceData (optional)
};

// 🧠 Combine reducers
const rootReducer = combineReducers({
    userReducer
});

// 💾 Create persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 🏪 Configure store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);

// 🧾 Types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ✅ Debug
// console.log('✅ Store initialized', store.getState());
