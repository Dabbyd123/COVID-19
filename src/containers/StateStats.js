import React, { useEffect, useReducer, useState } from 'react';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import Totals from '../components/Totals';
import axios from 'axios';
import DropDown from '../components/DropDown';
import moment from 'moment-timezone';
import Loading from '../components/Loading';
import CitiesTable from '../components/CitiesTable';
import Map from '../Map/Map';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';



const MapWrapper = styled.div`
grid-column: 1/3;
grid-row: 4;
display: flex;
justify-content: space-evenly;
margin-top: 75px;
margin-bottom: 75px;

@media only screen and (max-width: 768px){
    width: 100vw;
    flex-direction: column;
} 
`

const StatesWrapper = styled.div`
grid-column: 1/3;
background: rgba(15,15,15,.7);
`

const StateContainer = styled.div`
grid-row: 3;
grid-column: 1/3;
justify-self: center;
`

const TH = styled.th`
font-size: 18px;
border-collapse: collapse;
padding: 10px;
width: 100%;

@media only screen and (max-width: 768px) {
    padding: 5px;
    font-size: 12px
}
`

const TDWarning = styled.tr`
font-size: 10px;
width: 100%;
padding-bottom: 10px;

@media only screen and (max-width: 768px) {
    padding: 5px;
    font-size: 8px
}
`

const THEAD = styled.thead`
border-collapse: collapse;
`

const TR = styled.tr`
width: 100%;
border-bottom: 1px solid #3A70A6;
height: 40px;
padding: 10px;
border-collapse: collapse;
`



const initialState = {
    loading: true,
    post: '',
    error: ''
}

function reducer(state, action) {
    switch (action.type) {
        case 'fetch_success':
            return {
                loading: false,
                post: action.payload,
                error: ''
            }
        case 'fetch_error':
            return {
                loading: false,
                post: {},
                error: 'Something went wrong'
            }
        default:
            return state
    }
}

export default () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [active, setActive] = useState('');
    const [selectedState, getSelectedState] = useState('');
    const dropDownList = ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Minor Outlying Islands', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'U.S. Virgin Islands', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']


    const dropDown =
        <DropDown
            id="state-dropdown"
            onChange={e => getSelectedState(e.target.value)}
            value={selectedState}
            disabled={!dropDownList.length}
        >
            <option>Choose State</option>
            {dropDownList.map((item) => <option key={item} value={item}>{item}</option>)}
        </DropDown >


    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios((`https://covid-19-statistics.p.rapidapi.com/reports?&iso=USA&region_name=US&date=2020-04-16&q=US%20${selectedState}`), {
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": "covid-19-statistics.p.rapidapi.com",
                        "x-rapidapi-key": "8eb0a7c674msh30916dd1116d55cp1700f5jsn651eb7015384"
                    }
                })
                const data = response.data;
                dispatch({ type: 'fetch_success', payload: data.data });
            }
            catch (error) {
                dispatch({ type: 'fetch_error', payload: error })
            }
        } fetchData();
    }, [selectedState]);


    function clickHandler(e) {
        setActive(e.target.id);
        document.querySelectorAll('td').forEach(td => {
            if (e.target.id === td.id) {
                td.style.background = 'navy';
                td.style.color = 'yellow';
            } else {
                td.style.background = 'none';
                td.style.color = 'navy';
            }
        })
    }


    return (

        < StatesWrapper >
            <StateContainer>

                {state.post.length > 0 ? <CardHeader>{state.post[0].region.province}</CardHeader> : <CardHeader>- By State -</CardHeader>}

                <label>
                    {dropDown}
                    {state.loading || ((state.post.length > 0) && (selectedState !== state.post[0].region.province)) || (selectedState !== "") && (state.post.length === 0) ? <Loading color='lightgrey' type='cylon'></Loading> : null}
                </label>

                <Card states>

                    <Totals>Total Cases: &nbsp; {state.post.length > 0 && state.post[0].confirmed}</Totals>

                    <Totals>Active Cases: &nbsp; {state.post.length > 0 && state.post[0].active}</Totals>

                    <Totals deaths>Total Deaths: &nbsp; {state.post.length > 0 && state.post[0].deaths}</Totals>

                    <Totals deaths>Fatality Rate: &nbsp; {state.post.length > 0 && state.post[0].fatality_rate}</Totals>

                    <Totals time>*Last Updated: &nbsp; {state.post.length > 0 && moment(state.post[0].last_updated).tz("America/Chicago").format('MM-DD-YYYY HH:mm:ss z')}
                    </Totals>

                </Card>
            </StateContainer>

            <MapWrapper>
                {state.post.length > 0 ? <Map clicked={active} latitude={state.post[0].region.lat} longitude={state.post[0].region.long} cities={state.post[0].region.cities}></Map> : null}

                {state.post.length > 0 && <CitiesTable>
                    <THEAD>
                        <TH><strong>City/County</strong></TH>
                        <TH><strong>Confirmed Cases</strong></TH>
                        <TH><strong>Confirmed Diff</strong></TH>
                        <TH><strong>Deaths</strong></TH>
                        <TH><strong>Deaths Diff</strong></TH>
                        <TDWarning>
                            <FontAwesomeIcon icon={faExclamationTriangle} /> = the city/county with the highest number of confirmed cases in that state.
                        </TDWarning>
                    </THEAD>
                    <tbody>
                        {state.post[0].region.cities.map((e, i) => {
                            return (
                                <TR id={e.name} key={i} onClick={clickHandler}>
                                    <td id={e.name}>
                                        {Number(e.confirmed) === Math.max(...state.post[0].region.cities.map(e =>
                                            Number(e.confirmed))) ?
                                            <FontAwesomeIcon icon={faExclamationTriangle} /> : null}
                                        {e.name}
                                    </td>
                                    <td id={e.name}>{e.confirmed}</td>
                                    <td id={e.name}>{e.confirmed_diff}</td>
                                    <td id={e.name}>{e.deaths}</td>
                                    <td id={e.name}>{e.deaths_diff}</td>

                                </TR>
                            )
                        })}
                    </tbody>
                </CitiesTable>}
            </MapWrapper>
        </StatesWrapper >
    )
}



