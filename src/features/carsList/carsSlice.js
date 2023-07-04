import { createSlice } from "@reduxjs/toolkit"

const carsSlice = createSlice({
    name: 'cars',
    initialState: {
        data: [],
        searchQuery: '',
        showModalWindow: false,
        currentEntryId: '',
        currentAction: '',
        currentPage: 1
    },
    reducers: {
        carsLoadData: (state, action) => {
            state.data = action.payload;
        },
        carsSearchQuery: (state, action) => {
            state.searchQuery = action.payload;
        },
        carsCurrentPage: (state, action) => {
            state.currentPage = action.payload;
        },
        carsShowModal: (state, action) => {
            state.showModalWindow = action.payload.showModalWindow;
            state.currentEntryId = action.payload.currentEntryId;
            state.currentAction = action.payload.currentAction;
        },
        carsDeleteItem: (state, action) => {
            state.data = state.data.filter(item => item.id !== action.payload);
        },
        carsEditItem: (state, action) => {
            const item = state.data.find(item => item.id === action.payload.id);
            if (item) {
                item.car_color = action.payload.car_color;
                item.price = action.payload.price;
                item.availability = action.payload.availability;
            }
        },
        carsAddItem: (state, action) => {
            const id = state.data[state.data.length - 1].id + 1;
            state.data.push({id, ...action.payload});  
        }
    }
});

export const { 
    carsLoadData,
    carsSearchQuery,
    carsCurrentPage,
    carsShowModal,
    carsAddItem,
    carsEditItem,
    carsDeleteItem
} = carsSlice.actions;

export default carsSlice.reducer;
