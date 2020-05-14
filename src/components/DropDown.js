import React from 'react';
import styled from 'styled-components';

export default styled.select`
display: flex;
margin: 50px auto;
width: 25%;
height: 40px;
background-color: rgba(15,15,15,.7);
color: #f000ff; 
background-image: -webkit-gradient(linear, 0% 0%, 75% 100%, from(#f000ff), to(#4deeea));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
font-size: 20px;
box-shadow: 0 0 10px grey;

@media only screen and (max-width: 768px) {
    font-size: 10px;
    width: 20%;
    height: 30px
}
`
