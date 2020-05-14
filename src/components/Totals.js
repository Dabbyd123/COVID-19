import styled from 'styled-components';

export default styled.div`
margin: 10px;
text-align: center;
display: flex;
justify-content: center;
@font-face {
    font-family: 'Roboto';
    src: url('./Fonts/Roboto');
};
font-size: ${props => props.time ? '20px' : '40px'};
color: ${props => props.deaths ? '#ffac00' : props.recovered ? '#f000ff' : props.time ? 'grey' : '#4deeea'};
letter-spacing: 1px;

@media only screen and (max-width: 992px) {
    font-size: ${props => props.time ? '17px' : '30px'};
}

@media only screen and (max-width: 768px) {
    font-size: ${props => props.time ? '12px' : '25px'};
}

@media only screen and (max-width: 480px) {
    font-size: ${props => props.time ? '11px' : '19px'};
}
`