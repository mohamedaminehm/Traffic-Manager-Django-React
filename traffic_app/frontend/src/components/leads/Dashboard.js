//functional component because it's will only display the other component
import React, { Fragment } from 'react';
import Form from './Form';
import Leads from './Leads';


//import ResponsivePlayer from '../video/ResponsivePlayer';




export default function Dashboard() {
    return (
        <Fragment>
            
            <Leads />
            <Form />
        </Fragment>
    )
}
