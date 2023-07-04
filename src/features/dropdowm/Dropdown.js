//Component create dropdown menu with 2 user's actions (edit and delete)

import { useDispatch } from 'react-redux';
import { carsShowModal } from '../carsList/carsSlice';
import styled from "styled-components";

const DropdownContent = styled.div`
    visibility: hidden;
    opacity: 0;
    transition: visibility ease 0s, opacity ease 1s;
    position: absolute;
    z-index: 1;
    background: #f1f3f6;
    border-radius: 5px;
    width: 80px;
    padding: 10px;
    letter-spacing: 3px;
    box-shadow: 
        inset 0 0 15px rgba(55, 84, 170,0),
        inset 0 0 20px rgba(255, 255, 255,0),
        7px 7px 15px rgba(55, 84, 170,.15),
        -7px -7px 20px rgba(255, 255, 255,1),
        inset 0px 0px 4px rgba(255, 255, 255,.2);
`;

const Wrapper = styled.div`
    position: relative;
    display: inline-block;
    &:hover ${DropdownContent} {
        visibility: visible;
        opacity: 1;
    }
`;

const DropdownBtn = styled.div`
    background: #f1f3f6;
    border-radius: 5px;
    width: 80px;
    padding: 5px;
    letter-spacing: 1px;
    box-shadow: 
        inset 0 0 15px rgba(55, 84, 170,0),
        inset 0 0 20px rgba(255, 255, 255,0),
        7px 7px 15px rgba(55, 84, 170,.15),
        -7px -7px 20px rgba(255, 255, 255,1),
        inset 0px 0px 4px rgba(255, 255, 255,.2);
`;

const Option = styled.div`
    cursor: pointer;
    text-align: center;
    letter-spacing: 1px;
    &:hover {
        font-weight: bold;
        color: #8B0000;
        background: #D3D3D3;
    }
`;

const Dropdown = ({itemId}) => {

    const dispatch = useDispatch();

    const doAction = (showModal, id, actionType) => {
        dispatch(carsShowModal({
            showModalWindow: showModal,
            currentEntryId: id,
            currentAction: actionType
        }));
    }

    return (
        <Wrapper>
            <DropdownBtn>
                Actions &#8595;
            </DropdownBtn>
            <DropdownContent>
                <Option onClick={() => doAction(true, itemId, 'edit')}>Edit</Option>
                <Option onClick={() => doAction(true, itemId, 'delete')}>Delete</Option>
            </DropdownContent>
        </Wrapper>
    )
}

export default Dropdown;
