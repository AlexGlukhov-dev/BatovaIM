import {configureStore, combineReducers} from '@reduxjs/toolkit';
import appDataReducer from './slices/productsSlice';
import personalCabinetReducer from './slices/personalCabinetSlice';
import deliveryReducer from './slices/deliverySlice';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import registrationReducer from './slices/registrationSlice';
import personalDataReducer from './slices/personalDataSlice';
import loaderReducer from './slices/loaderSlice';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER,} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers(
  {
      data: appDataReducer,
      personalData: personalCabinetReducer,
      delivery: deliveryReducer,
      cart: cartReducer,
      auth: authReducer,
      registration: registrationReducer,
      personal: personalDataReducer,
      loader: loaderReducer,
  }
);

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['personal', 'cart', 'auth']
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = configureStore( {
    reducer: persistedReducer,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
          serializableCheck: {
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          }
      }),
});

export const persistor = persistStore(store);

export default store