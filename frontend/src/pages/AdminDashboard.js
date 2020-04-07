import React from 'react';
// import Timeline from '../components/Timeline'
import Typography from '@material-ui/core/Typography';
import ViewOrders from '../components/ViewOrders';

export default function Dashboard() {
    return (
        <>
            <Typography variant="h4" color="inherit" noWrap>
                Dashboard
            </Typography>
            <ViewOrders />
            {/* <Timeline /> */}
        </>
    );
}