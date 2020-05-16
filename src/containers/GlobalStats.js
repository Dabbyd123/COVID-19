import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';

import CardHeader from '../components/CardHeader';
import Totals from '../components/Totals';
import Card from '../components/Card';
import Loading from '../components/Loading';

const Container = styled.div`
grid-row: 2;
grid-column: 1;
place-self: center center;

@media only screen and (max-width: 1200px) {
grid-column: 1/3;
}
`


export default () => {
    const [total, setTotal] = useState(null);

    useEffect(() => {
        async function getData() {
            const response = await fetch("https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php", {
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key": "8eb0a7c674msh30916dd1116d55cp1700f5jsn651eb7015384"
                }
            })
            const data = await response.json();
            setTotal(data)
        } getData();
    }, [total]
    )


    return (
        <Container>
            <CardHeader worldwide>- Worldwide -</CardHeader>
            <Card global>
                {total === null ? <Loading color='lightgrey' type='cylon'></Loading> : null}
                {total && <Totals cases>Total Cases: &nbsp; <strong>{total.total_cases}</strong></Totals>}
                {total && <Totals cases>New Cases: &nbsp; <strong>{total.new_cases}</strong></Totals>}
                {total && <Totals deaths>Total Deaths: &nbsp; <strong>{total.total_deaths}</strong></Totals>}
                {total && <Totals deaths>New Deaths: &nbsp; <strong>{total.new_deaths}</strong></Totals>}
                {total && <Totals recovered>Total Recovered: &nbsp; <strong>{total.total_recovered}</strong></Totals>}
                {total && <Totals time>*Last Updated: &nbsp; {moment(total.statistics_taken_at).tz("America/Chicago").format('MM-DD-YYYY HH:mm:ss z')}</Totals>}
            </Card>
        </Container>
    )
};
