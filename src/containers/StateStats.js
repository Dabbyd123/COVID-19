import React, { useEffect, useReducer, useState } from 'react';
import Card from '../components/Card';
import CardHeader from '../components/CardHeader';
import Totals from '../components/Totals';
import axios from 'axios';
import moment from 'moment-timezone';
import Loading from '../components/Loading';
import CitiesTable from '../components/CitiesTable';
import Map from '../Map/Map';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Select from 'react-select';



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
background: #1b1b1b;
`

const StateContainer = styled.div`
grid-row: 3;
grid-column: 1/3;
justify-self: center;
`

const DropDownWrapper = styled.div`
width: 35vw;
height: 100%;
margin: 25px auto;
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
    const [selectedState, setSelectedState] = useState('');
    const dropDownList = [{ value: 'Alabama', label: 'Alabama' }, { value: 'Alaska', label: 'Alaska' }, { value: 'Arizona', label: 'Arizona' }, { value: 'Arkansas', label: 'Arkansas' }, { value: 'California', label: 'California' }, { value: 'Colorado', label: 'Colorado' }, { value: 'Connecticut', label: 'Connecticut' }, { value: 'Delaware', label: 'Delaware' }, { value: 'District of Columbia', label: 'District of Columbia' }, { value: 'Florida', label: 'Florida' }, { value: 'Georgia', label: 'Georgia' }, { value: 'Guam', label: 'Guam' }, { value: 'Hawaii', label: 'Hawaii' }, { value: 'Idaho', label: 'Idaho' }, { value: 'Illinois', label: 'Illinois' }, { value: 'Indiana', label: 'Indiana' }, { value: 'Iowa', label: 'Iowa' }, { value: 'Kansas', label: 'Kansas' }, { value: 'Kentucky', label: 'Kentucky' }, { value: 'Louisiana', label: 'Louisiana' }, { value: 'Maine', label: 'Maine' }, { value: 'Maryland', label: 'Maryland' }, { value: 'Massachusetts', label: 'Massachusetts' }, { value: 'Michigan', label: 'Michigan' }, { value: 'Minnesota', label: 'Minnesota' }, { value: 'Mississippi', label: 'Mississippi' }, { value: 'Missouri', label: 'Missouri' }, { value: 'Montana', label: 'Montana' }, { value: 'Nebraska', label: 'Nebraska' }, { value: 'Nevada', label: 'Nevada' }, { value: 'New Hampshire', label: 'New Hampshire' }, { value: 'New Jersey', label: 'New Jersey' }, { value: 'New Mexico', label: 'New Mexico' }, { value: 'New York', label: 'New York' }, { value: 'North Carolina', label: 'North Carolina' }, { value: 'North Dakota', label: 'North Dakota' }, { value: 'Ohio', label: 'Ohio' }, { value: 'Oklahoma', label: 'Oklahoma' }, { value: 'Oregon', label: 'Oregon' }, { value: 'Pennsylvania', label: 'Pennsylvania' }, { value: 'Puerto Rico', label: 'Puerto Rico' }, { value: 'Rhode Island', label: 'Rhode Island' }, { value: 'South Carolina', label: 'South Carolina' }, { value: 'South Dakota', label: 'South Dakota' }, { value: 'Tennessee', label: 'Tennessee' }, { value: 'Texas', label: 'Texas' }, { value: 'U.S. Virgin Islands', label: 'U.S. Virgin Islands' }, { value: 'Utah', label: 'Utah' }, { value: 'Vermont', label: 'Vermont' }, { value: 'Virginia', label: 'Virginia' }, { value: 'Washington', label: 'Washington' }, { value: 'West Virginia', label: 'West Virginia' }, { value: 'Wisconsin', label: 'Wisconsin' }, { value: 'Wyoming', label: 'Wyoming' }];



    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios((`https://covid-19-statistics.p.rapidapi.com/reports?&iso=USA&region_name=US&date=2020-04-16&q=US%20${selectedState.value}`), {
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

    console.log(selectedState)
    return (

        < StatesWrapper >
            <StateContainer>

                {state.post.length > 0 ? <CardHeader>{state.post[0].region.province}</CardHeader> : <CardHeader>- By State -</CardHeader>}
                <DropDownWrapper>
                    <Select
                        options={dropDownList}
                        onChange={setSelectedState}
                        isSearchable
                    />
                </DropDownWrapper>
                {state.loading || ((state.post.length > 0) && (selectedState.value !== state.post[0].region.province)) || (selectedState !== "") && (state.post.length === 0) ? <Loading color='lightgrey' type='cylon'></Loading> : null}

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
                        <TH><strong>County</strong></TH>
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



