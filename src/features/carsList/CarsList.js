//Component CarList render table with cars list and pagination, all user actions affect the table

import { useHttp } from '../../hooks/http.hook';
import { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { carsLoadData } from './carsSlice';

import styled from "styled-components";

import ModalWindow from '../modalWindow/ModalWindow';
import Dropdown from '../dropdowm/Dropdown';
import Pagination from '../pagination/Pagination';

const Container = styled.div`
    display: grid;
    grid-template-columns: 100%;
    width: 900px;
    margin: 0 auto;
    padding: 30px;
    border-radius: 20px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow:  10px 10px 30px #bebebe, -10px -10px 30px #ffffff;
`;

const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1.5fr) 2fr 1fr 0.5fr 1fr 0.5fr 1fr;
    align-self: center;
`;

const Column = styled.span`
    align-self: center;
`;

const SeparateLine = styled.hr`
    width: 100%;
    border-top: 1px solid darkslategray;
`;

const ColumnTitle = styled.span`
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;
`;

const NoItems = styled.div`
    font-size 300%;
`;

const CarsList = () => {

    const request = useHttp();
    const dispatch = useDispatch();
    const allCars = useSelector(state => state.cars.data);
    const {searchQuery, showModalWindow, currentPage} = useSelector(state => state.cars);
    const carsPerPage = 10;
    const indexOfLastCar = currentPage * carsPerPage;
    const indexOfFirstCar = indexOfLastCar - carsPerPage;
    let totalPages;

    useEffect(() => {
        getAllCars()
        .then(data => dispatch(carsLoadData(data)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const getAllCars = async () => {
        const _apiBase = 'https://myfakeapi.com/api/cars/';
        const _token = JSON.stringify({
            "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6ImFzIiwicGFzc3dvcmQiOiIxMjMiLCJ3ZWJzaXRlIjoid3d3Lm15ZmFrZWFwaS5jb20iLCJpYXQiOjE1NzM1NDMzNjcsImV4cCI6MTU3MzU0NTE2N30.95fFJcUIOsTVLrTNxSVdk4loPQnwWx9tBGJIb19o65"
        });

        const allCars = await request(_apiBase, _token)
            .then(response => response.cars)
            .catch(error => console.log('error', error));

        return allCars;
    }

    const isIncluded = (item, query) => {
        item.shift();
        item.pop();
        return !!item.filter(column => String(column).toLowerCase().includes(String(query).toLowerCase())).length;
    }

    const renderCarsList = allCars => {
        const filteredCars = allCars.filter(item => isIncluded(Object.values(item), searchQuery))
            .map(item => {
                return (
                    <Fragment key={'Item' + item.id}>
                        <Row>
                            <Column>{item.car}</Column>
                            <Column>{item.car_model}</Column>
                            <Column>{item.car_vin}</Column>
                            <Column>{item.car_color}</Column>
                            <Column>{item.car_model_year}</Column>
                            <Column>{item.price}</Column>
                            <Column>{item.availability ? 'Yes' : 'No'}</Column>
                            <Dropdown itemId={item.id} />
                        </Row>
                        <SeparateLine />
                    </Fragment>
                    
                )
            });
        totalPages = [...Array(Math.ceil(filteredCars.length / carsPerPage)).keys()].map(arrIndex => arrIndex + 1);
        return filteredCars;
    }

    const renderedCarsList = renderCarsList(allCars).slice(indexOfFirstCar, indexOfLastCar);

    return (
        <>
            <Container>
                <Row> 
                    <ColumnTitle>Company</ColumnTitle>
                    <ColumnTitle>Model</ColumnTitle>
                    <ColumnTitle>VIN</ColumnTitle>
                    <ColumnTitle>Color</ColumnTitle>
                    <ColumnTitle>Year</ColumnTitle>
                    <ColumnTitle>Price</ColumnTitle>
                    <ColumnTitle>Availability</ColumnTitle>
                    <ColumnTitle>Actions</ColumnTitle>
                </Row>
                <SeparateLine />
                    {renderedCarsList.length ? renderedCarsList : <NoItems>There are no items in the list</NoItems>}
                <Pagination totalPages={totalPages} />
            </Container>
            {showModalWindow ? <ModalWindow /> : null}
        </>
    );
}

export default CarsList;
