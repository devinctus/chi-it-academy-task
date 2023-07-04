import { configureStore } from '@reduxjs/toolkit';
import cars from '../features/carsList/carsSlice';

export const store = configureStore({
	reducer: {
		cars
	},
	middleware: getDefaultMiddleware => getDefaultMiddleware(),
	devTools: process.env.NODE_ENV !== 'production'
});