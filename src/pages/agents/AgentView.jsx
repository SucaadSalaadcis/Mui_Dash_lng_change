import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


import { Box, FormControl, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import BackIcon from '../../reusible/BackIcon';
import {
    HashLoader
} from 'react-spinners';


// import BackIcon from '../reusible/BackIcon';

export default function AgentView() {

    const getToken = () => {
        return Cookies.get('token');
    };


    const [fullname, setFullName] = useState("");
    const [description, setDescription] = useState("");
    const [business, setBusiness] = useState("");
    const [phone, setPhone] = useState("");
    const [id, setId] = useState("");

    const params = useParams();

    const [loading, setLoading] = useState(false);

    // get single data 
    const handleSingleData = () => {
        setLoading(true);
        axios.get(`https://spiky-crater-dep2vxlep8.ploi.online/api/v1/agents/${params.id}/edit`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => {
            setFullName(res.data.data.fullname);
            setDescription(res.data.data.description);
            setBusiness(res.data.data.business);
            setPhone(res.data.data.phone);
            setId(res.data.data.id);
            // console.log(res.data.data.title);
        }).catch(err => console.log(err)).finally(_ => {
            setLoading(false);
        })
    }

    useEffect(() => {
        handleSingleData();
    }, []);




    return (

        <main main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg " >
            {/* bg-[#3A57E8] */}

            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <Paper elevation={3} style={{ padding: '60px', borderRadius: '8px' }}>
                            <BackIcon pathUrl={'/agents'} />
                            {/* content page */}
                            <Typography sx={{ fontWeight: 'bold', fontSize: '18px' }} className='pb-[20px] text-center'>Agent View Form</Typography>
                            {
                                loading ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5px' }}>
                                        <HashLoader color='#3A57E8' loading={loading} size={50} />
                                    </div>
                                ) : (

                                    <FormControl variant="standard" sx={{ margin: 1, width: "100%", gap: '10px' }} >
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="ID"
                                            value={id}
                                            onChange={(e) => setId(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Full Name"
                                            value={fullname}
                                            onChange={(e) => setFullName(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Description"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Business"
                                            value={business}
                                            onChange={(e) => setBusiness(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label="Phone"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                        />
                                    </FormControl>
                                )}
                        </Paper>
                    </div>
                </div>

            </div>
        </main >
    )
}
