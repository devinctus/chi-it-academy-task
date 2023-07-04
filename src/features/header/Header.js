//Component render block of information at the top the page with search panel and button "Add a new car"

import SearchInput from "../searchInput/SearchInput";
import AddNewCar from "../addNewCar/AddNewCar";

import { styled } from "styled-components";

const Container = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    justify-content: center;
    justify-items: center;
    align-content: center;
    align-items: center;
    width: 900px;
    margin: 20px auto;
    padding: 30px;
    border-radius: 20px;
    background: linear-gradient(145deg, #cacaca, #f0f0f0);
    box-shadow:  10px 10px 30px #bebebe, -10px -10px 30px #ffffff;
    & span {
        font-size: 150%;
        font-weight: bold;
    }
`;

const Header = () => {
    return (
        <Container>
            <span>CHI IT Academy Task</span>
            <SearchInput />
            <AddNewCar />
        </Container>
    );
}

export default Header;
