//Component is used on each user's action (add a new car, delete and edit) and applies functions to process user's actions

import { useDispatch, useSelector } from "react-redux";
import { carsShowModal, carsAddItem,carsEditItem, carsDeleteItem } from "../carsList/carsSlice";
import styled from "styled-components";

import Button from "../button/Button";
import CarInfo from "../carInfo/CarInfo";

const Wrapper = styled.div`
    position: absolute;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    backdrop-filter: blur(15px);
`;

const Modal = styled.div`
    position: relative;
    width: 400px;
    height: ${({$small}) => $small ? '200' : '600'}px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50%;
    margin-top: -300px;
    left: 50%;
    margin-left: -200px;
    border: 1px solid white;
    border-radius: 1rem;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow:  10px 10px 30px #bebebe, -10px -10px 30px #ffffff;
`;
const Flex = styled.div`
    display: flex;
    gap: 30px;
`;

const Question = styled.span`
    font-size: 200%;
    color: darkslategray;
    margin: 30px;
    text-align: center;
`;

const ModalWindow = () => {
    const dispatch = useDispatch();
    const {currentEntryId, currentAction} = useSelector(state => state.cars);

    const message = currentAction === 'delete' ? 'Are you sure you want to delete this entry?' :
        currentAction === 'edit' ? 'Edit this car information' : 'Add a new car' ;

    const cancelAction = () => {
        dispatch(carsShowModal({showModalWindow: false, currentEntryId: '', currentAction: ''}));
    }

    const deleteEntry = () => {
        dispatch(carsDeleteItem(currentEntryId));
        dispatch(carsShowModal({showModalWindow: false, currentEntryId: '', currentAction: ''}));
    }

    const editEntry = data => {
        const {car_color, price, availability} = data;
        dispatch(carsEditItem({
            id: currentEntryId,
            car_color,
            price: '$' + price,
            availability: availability === 'Available'
        }));
        dispatch(carsShowModal({showModalWindow: false, currentEntryId: ''}));
    }

    const addEntry = data => {
        const {car, car_model, car_vin, car_color, car_model_year, price, availability} = data;
        dispatch(carsAddItem({
            car,
            car_model,
            car_vin,
            car_color,
            car_model_year,
            price: '$' + price,
            availability: availability === 'Available'
        }));
        dispatch(carsShowModal({showModalWindow: false, currentEntryId: ''}));
    }

    return (
        <Wrapper>
            <Modal $small={currentAction === 'delete'}>
                <Question>
                    {message}
                </Question>
                {currentAction === 'delete' ? 
                <Flex>
                    <Button small onClick={deleteEntry}>Yes</Button>
                    <Button small onClick={cancelAction}>No</Button>
                </Flex> :
                <Flex>
                    <CarInfo cancelAction={cancelAction} editEntry={editEntry} addEntry={addEntry} />
                </Flex> }
                <Button closeWindow onClick={cancelAction}>
                    {String.fromCodePoint(9932)}
                </Button>
            </Modal>
        </Wrapper>
    );
}

export default ModalWindow;
