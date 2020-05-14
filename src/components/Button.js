import styled from 'styled-components';

export default styled.button`
width: 50px;
height: 20px;
background-color: ${props => props.primary ? 'blue' : 'salmon'}; 
color: black;
font-weight: bold
`;