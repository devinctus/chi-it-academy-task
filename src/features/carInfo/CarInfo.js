// CarInfo component render all content inside modal "Edit" and "Add"

import { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';

import Button from '../button/Button';
import { styled } from 'styled-components';

const Fields = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    color: #8B0000;
    text-align: center;
    font-size: 80%;
    justify-content: center;
    & input, select {
        width: 250px;
        height: 25px;
        margin: 0 auto;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        text-align-last: center;
    }
`;

const Buttons = styled.div`
    display: flex;
    gap: 50px;
    margin-top: 30px;
    justify-content: center;
`;

const CarInfo = ({cancelAction, editEntry, addEntry}) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        mode: 'onChange'
    });

    const {currentAction, currentEntryId, data} = useSelector(state => state.cars);
    const [car] = currentAction === 'edit' ? data.filter(car => car.id === currentEntryId) : ['New'];
    const inputsSettings = [
        {
            name: 'car',
            type: 'text',
            placeHolder: 'Company',
            maxLength: 40,
            min: null,
            max: null,
            pattern: null,
            patternErrorMessage: null
        },
        {
            name: 'car_model',
            type: 'text',
            placeHolder: 'Model',
            maxLength: 50,
            min: null,
            max: null,
            pattern: null,
            patternErrorMessage: null
        },
        {
            name: 'car_vin',
            type: 'text',
            placeHolder: 'VIN Number',
            maxLength: '17',
            min: null,
            max: null,
            pattern: /^\b[(A-H|J-N|P|R-Z|0-9)]{17}\b$/gm,
            patternErrorMessage: 'Enter a valid VIN Number (without Q, I, O)'
        },
        {
            name: 'car_color',
            type: 'text',
            placeHolder: 'Color',
            maxLength: 30,
            min: null,
            max: null,
            pattern: /^[A-Za-z]+$/i,
            patternErrorMessage: 'Only letters are allowed'
        },
        {
            name: 'car_model_year',
            type: 'number',
            placeHolder: 'Year',
            maxLength: 4,
            min: 1950,
            max: 2023,
            pattern: null,
            patternErrorMessage: null
        },
        {
            name: 'price',
            type: 'number',
            placeHolder: 'Price, $, min step is 0.01',
            maxLength: 8,
            min: 1,
            max: 99999,
            pattern: null,
            patternErrorMessage: null
        },
    ];

    const onSubmit = data => {
        currentAction === 'edit' ? editEntry(data) : addEntry(data);
    }

    const createInput = (value, {name, type, placeHolder, maxLength, min, max, pattern, patternErrorMessage}) => {
        const isDisable = currentAction === 'edit' && name !== 'car_color' && name !== 'price';
        const required = isDisable ? false : { value: true, message: 'This field is required'};
        
        return (
            <Fragment key={name + value.id}>
                <input key={name}
                    disabled={isDisable}
                    type={type}
                    step={name === 'price' ? '0.01' : 0}
                    placeholder={placeHolder}
                    defaultValue={name === 'price' && currentAction === 'edit' ? +value[name].slice(1) : value[name]}
                    {...register(name, {
                        required,
                        maxLength: { value: maxLength, message: `Max length is ${maxLength} symbols` },
                        min: min && {value: min, message: `Min ${name.replaceAll('_', ' ')} is ${min}`},
                        max: max && {value: max, message: `Max ${name.replaceAll('_', ' ')} is ${max}`},
                        pattern: pattern && {value: pattern, message: patternErrorMessage}
                    })}
                />
                {errors?.[name]?.message}
            </Fragment>
        );
    }

    const renderedInputs = (car, inputsSettings) => {
        return inputsSettings.map(input => createInput(car, {...input}));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fields>
                {[...renderedInputs(car, inputsSettings)]}
                <select defaultValue={currentAction === 'edit' && !car.availability  ? 'Not available' : 'Available' } 
                    {...register("availability", { required: true}) }>
                    <option value="Available">Available</option>
                    <option value="Not available">Not available</option>
                </select>
            </Fields>
            <Buttons>
                <Button small type="submit">Save</Button>
                <Button small onClick={cancelAction}>Cancel</Button>
            </Buttons>
        </form>
    );
}

export default CarInfo;
