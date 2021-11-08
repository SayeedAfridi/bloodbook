import { persistReducer } from 'redux-persist'
import { combineReducers } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'],
}

const rootReducer = combineReducers({})

export default persistReducer(persistConfig, rootReducer)
