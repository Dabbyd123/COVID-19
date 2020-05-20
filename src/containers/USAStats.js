import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';

import Card from '../components/Card';
import Totals from '../components/Totals';
import CardHeader from '../components/CardHeader';
import Loading from '../components/Loading';


const Container = styled.div`
grid-row: 2;
grid-column: 2;
place-self: center center;

@media only screen and (max-width: 1200px) {
    grid-row: 3;
    grid-column: 1/3;
}
`


export default () => {
    const [USATotal, setUSATotal] = useState(null);

    useEffect(() => {
        async function getData() {
            const response = fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key": "8eb0a7c674msh30916dd1116d55cp1700f5jsn651eb7015384"
                }
            })
            const data = (await response).json();
            setUSATotal(await data)
        } getData()
    }, []
    )

    console.log(USATotal)

    return (

        <Container>
            <CardHeader usa>- USA -</CardHeader>
            <Card usa>
                {USATotal === null ? <Loading color='lightgrey' type='cylon'></Loading> : null}
                {USATotal && <Totals active>Active Cases: &nbsp; <strong>{USATotal.countries_stat[0].active_cases}</strong></Totals>}
                {USATotal && <Totals active>New Cases: &nbsp; <strong>{USATotal.countries_stat[0].new_cases}</strong></Totals>}
                {USATotal && <Totals deaths>Deaths: &nbsp; <strong>{USATotal.countries_stat[0].deaths}</strong></Totals>}
                {USATotal && <Totals deaths>New Deaths: &nbsp; <strong>{USATotal.countries_stat[0].new_deaths}</strong></Totals>}
                {USATotal && <Totals recovered>Total Recovered: &nbsp; <strong>{USATotal.countries_stat[0].total_recovered}</strong></Totals>}
                {USATotal && <Totals time>*Last Updated: &nbsp; {moment(USATotal.statistics_taken_at).tz("America/Chicago").format('MM-DD-YYYY HH:mm:ss z')}</Totals>}
            </Card>
        </Container>

    )
}