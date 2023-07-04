//Component create buttons

import styled, { css } from "styled-components";

const StyledButton = styled.button`
    border: none;
    cursor: pointer;
    background-color: #eeeeee;
    width: ${({$small}) => $small ? '120' : '200'}px;
    height: ${({$small}) => $small ? '50' : '60'}px;
    border-radius: 10px;
    color: darkslategray;
    font-weight: 700;
    letter-spacing: 3px;

    ${({$close}) => $close && css`
        width: 40px;
        height: 30px;
        position: absolute;
        top: 5px;
        right: 5px;
        color: #8B0000;
    `}

    box-shadow: -7px -7px 20px 0px #fff9,
                -4px -4px 5px 0px #fff9,
                7px 7px 20px 0px #0002,
                4px 4px 5px 0px #0001,
                inset 0px 0px 0px 0px #fff9,
                inset 0px 0px 0px 0px #0001,
                inset 0px 0px 0px 0px #fff9,
                inset 0px 0px 0px 0px #0001;
    transition: box-shadow 0.6s cubic-bezier(.79,.21,.06,.81);

    &:hover {
    box-shadow: 0px 0px 0px 0px #fff9,
                0px 0px 0px 0px #fff9,
                0px 0px 0px 0px #0001,
                0px 0px 0px 0px #0001,
                inset -7px -7px 20px 0px #fff9,
                inset -4px -4px 5px 0px #fff9,
                inset 7px 7px 20px 0px #0003,
                inset 4px 4px 5px 0px #0001;
    }
`;

const Button = ({children, small, closeWindow, onClick}) => {

    return (
        <StyledButton 
        $small={small} 
        $close={closeWindow}
        onClick={onClick}>
            {children}
        </StyledButton>
    );
}

export default Button;
