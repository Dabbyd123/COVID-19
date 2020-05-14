import styled from 'styled-components';

export default styled.h1`
font-size: 30px;
font-family: 'Open-Sans';
background-image: -webkit-gradient(linear, 0% 0%, 100% 100%, from(#f000ff), to(#4deeea));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;

@media only screen and (max-width: 992px) {
    font-size: 26px
}

@media only screen and (max-width: 768px) {
    font-size: 22px
}

@media only screen and (max-width: 480px) {
    font-size: 19px
}
`