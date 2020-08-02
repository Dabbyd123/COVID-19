import styled from 'styled-components';

export default styled.table`
grid-row: 5;
text-align: center;
justify-items: space-evenly;
align-self: center;
border-collapse: collapse;
padding: 10px;
font-size: 14px;
height: 100%;
width: 75vw;
border: 1px solid grey;
color: navy;
margin-top: 50px;
margin-bottom: 50px;
/* background: -webkit-gradient(linear, 0% 0%, 75% 100%, from(#f000ff), to(#4deeea)); */
background: #4deeea;
& tr:hover td {
    background-color: navy;
    color: yellow;
    cursor: pointer;
}

@media only screen and (max-width: 1200px) {
    font-size: 16px;
    padding: 7px
}

@media only screen and (max-width: 992px) {
    font-size: 16px;
    padding: 5px;
}

@media only screen and (max-width: 768px) {
    font-size: 12px;
    padding: 5px;
    width: 100vw;
}
`