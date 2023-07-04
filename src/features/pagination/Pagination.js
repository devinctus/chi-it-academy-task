//Component create pagination at the bottom of the page

import { useDispatch, useSelector } from 'react-redux';
import { carsCurrentPage } from '../carsList/carsSlice';

import styled from "styled-components";

const StyledPagination = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
    & span {
        cursor: pointer;
        margin: 0 30px;
    }
`;

const PaginationItem = styled.span`
    font-size: ${({$currentPage}) => $currentPage ? '200' : '100'}%;
`;

const Pagination = ({totalPages}) => {

    const dispatch = useDispatch();
    const {currentPage} = useSelector(state => state.cars);

    const renderPagination = (totalPages) => {
        return totalPages.map(pageNum => {
            return (
                <PaginationItem $currentPage={pageNum === currentPage} key={'Page' + pageNum} onClick={() => dispatch(carsCurrentPage(pageNum))}>
                    {pageNum}
                </PaginationItem>
            )
        });
    }

    const inRange = (x, min, max) => {
        return ((x-min)*(x-max) <= 0);
    }

    const visiblePagination = (pagination) => {
        const countSibling = 3;
        if(pagination.length <= countSibling * 2 + 1) {
            return pagination;
        } else {
            const arr = pagination.filter(item => {
                return inRange(item.props.children, currentPage - countSibling, currentPage + countSibling);
            });
            if (currentPage - countSibling > 1 ) {
                if (currentPage === 5) {
                    arr.unshift(pagination[0]);
                } else {
                    arr.unshift(pagination[0], '...');
                }
            }
            if (currentPage + countSibling < pagination.length) {
                if (pagination.length - currentPage === 4) {
                    arr.push(pagination[pagination.length - 1]);
                } else {
                    arr.push('...', pagination[pagination.length - 1]);
                }
            }
            return [...arr];
        }
    }

    return (
        <StyledPagination>
            {visiblePagination(renderPagination(totalPages))}
        </StyledPagination>
    );
}

export default Pagination;
