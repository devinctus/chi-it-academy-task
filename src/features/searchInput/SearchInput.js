//Component search input and deliver user's search term to the store

import { useDispatch } from 'react-redux';
import { carsSearchQuery, carsCurrentPage } from '../carsList/carsSlice';

import { styled } from 'styled-components';

const SearchWrapper = styled.div`
    border-radius: 15px;
    padding: 8px;
    margin: 5px 0;
    box-shadow: 9px 9px 16px rgba(189, 189, 189, 0.6),
        -9px -9px 16px rgba(255, 255, 255, 0.5);
`;

const SearchOuter = styled.div`
    display: flex;
    width: 300px;
    border-radius: 10px;
    box-shadow: inset 10px 10px 15px -10px #c3c3c3,
        inset -10px -10px 15px -10px #ffffff;
`;

const SearchInner = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    flex: 1;
    & input {
        width: 100%;
        height: 40px;
        border: none;
        background: inherit;
        outline: none;
        text-align-last: center;
        font-size: 200%;
    }
`;

const SearchInput = () => {

    const dispatch = useDispatch();

    const saveQuery = event => {
        dispatch(carsSearchQuery(event.target.value));
        dispatch(carsCurrentPage(1));
    }
    
    return (
        <SearchWrapper>
            <SearchOuter>
                <SearchInner>
                    <input id="search-box" onChange={saveQuery} placeholder="Search" />
                </SearchInner>
            </SearchOuter>
        </SearchWrapper>
    )
}

export default SearchInput;
