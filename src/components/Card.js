import React from 'react';
import styled from 'styled-components';

export default styled.div`
display: flex;
margin: 0 auto; 
place-self: center center;
justify-content: space-evenly;
align-items: center;
flex-direction: ${props => props.states ? 'row' : 'column'};
border-radius: 15px;
height: ${props => props.states ? '25vh' : '80vh'};
width: ${props => props.states ? '80vw' : '45vw'};
background-color: transparent;
border: 1px solid black;
box-shadow: inset 0 0 10px grey;

@media only screen and (max-width: 1200px) {
width: ${props => props.states ? '80vw' : '70vw'};
}

@media only screen and (max-width: 768px) {
width: 75vw;
height: ${props => props.states ? '30vh' : '50vh'};
flex-direction: column;
}

@media only screen and (max-width: 480px) {
width: 100vw;
}
`
