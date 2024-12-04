
/// short way 

import { Box, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';


const pathMap = [
    { path: '/agents', endpoint: 'agent', viewEndpoint: 'agent_view' },
    { path: '/customers', endpoint: 'customer', viewEndpoint: 'customer_view' },
    { path: '/products', endpoint: 'product', viewEndpoint: 'product_view' },
    { path: '/users', endpoint: 'user', viewEndpoint: 'users_view' },
    { path: '/orders', endpoint: 'order', viewEndpoint: 'order_view' },
];



// edit functionallity
export function Edit({ EditParam }) {

    const location = useLocation();

    const match = pathMap.find(item => item.path === location.pathname);
    // console.log(match)
    if (!match) return null;

    // Construct 
    const url = `/${match.endpoint}/${EditParam}`;

    return (
        <Link to={url} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
            {/* <EditIcon style={{ color: 'blue' }} /> */}
            <p>Edit</p>
        </Link>
    )
}


// veiw functionallity
export function View({ veiwParam }) {

    const location = useLocation();

    const match = pathMap.find(item => item.path === location.pathname);

    if (!match) return null;

    const url = `/${match.viewEndpoint}/${veiwParam}`;

    return (
        <Link to={url} style={{ textDecoration: 'none', color: 'black', fontWeight: 'bold' }}>
            {/* <VisibilityIcon style={{ color: "green", marginLeft: '8px' }} /> */}
            <p>View</p>
        </Link>
    )
}


// add functionallity
export function Add() {

    const location = useLocation();

    const match = pathMap.find(item => item.path === location.pathname);
    // console.log(match)
    if (!match) return null;

    // Construct 
    const url = `/${match.endpoint}`;

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',  // Push to the right
                width: '100%',
            }}>
            <Link to={url}>
                <Button variant='contained' sx={{ backgroundColor: '#E53270' }}>
                    ADD
                </Button>
            </Link>
        </Box>
    )
}
