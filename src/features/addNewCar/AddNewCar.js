//Component render button "Add a new car"

import { useDispatch } from "react-redux";
import { carsShowModal } from '../carsList/carsSlice';
import Button from "../button/Button";


const AddNewCar = () => {
    const dispatch = useDispatch();

    return (
        <Button onClick={() => dispatch(carsShowModal({
            showModalWindow: true,
            currentEntryId: null,
            currentAction: 'add'
        }))}>
            Add a new car
        </Button>
    )
}

export default AddNewCar;
