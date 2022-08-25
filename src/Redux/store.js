import { configureStore } from "@reduxjs/toolkit";
import RootReducer from "./rootReducer";
import userSaga from './userSaga'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import createSagaMiddleware from 'redux-saga';

const persistConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistConfig, RootReducer);
const sagaMiddelware = createSagaMiddleware();

const store = configureStore({
  reducer: persistedReducer,
  middleware: () => [sagaMiddelware]
})

sagaMiddelware.run(userSaga);

export const persistor = persistStore(store);
export default store;