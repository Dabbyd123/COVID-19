import React from 'react';
import ReactLoading from 'react-loading';
import styled from 'styled-components';

const Wrapper = styled.div`
margin: 0 auto;
grid-row: 3;
grid-column: 1/3;
display: flex;
place-content: center;
`


const Loading = ({ type, color }) => (
    <Wrapper>
        <ReactLoading type={type} color={color} height={30} width={30} />
    </Wrapper>
);

export default Loading;