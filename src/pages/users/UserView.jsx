import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { FormControl, Paper, TextField, Typography } from '@mui/material';
import Cookies from 'js-cookie';
import axios from 'axios';
import BackIcon from '../../reusible/BackIcon';
import { HashLoader } from 'react-spinners';

import useLanguage from '../../reusible/useLanguage';

export default function UserView() {

    const { t, i18n } = useLanguage();



    const getToken = () => {
        return Cookies.get('token');
    };


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [id, setId] = useState("");


    const params = useParams();

    const [loading, setLoading] = useState(false);


    // get single data 
    const handleSingleData = () => {
        setLoading(true);
        axios.get(`https://spiky-crater-dep2vxlep8.ploi.online/api/v1/users/${params.id}/edit`, {
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).then(res => {
            setName(res.data.data.name);
            setEmail(res.data.data.email);
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


        <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg ">

            <div class="container-fluid py-4">
                <div class="row">
                    <div class="col-lg-8 col-md-10 mx-auto">
                        <Paper elevation={3} style={{ padding: '60px', borderRadius: '8px' }}>
                            <BackIcon pathUrl={'/users'} />
                            {/* content page */}
                            <Typography sx={{ fontWeight: 'bold', fontSize: '22px' }} className='pb-[20px] text-center'>{t('user_V_f')}</Typography>
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
                                            label={t('p_name')}
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                        <TextField
                                            required
                                            id="outlined-required"
                                            label={t('email')}
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </FormControl>
                                )}
                        </Paper>
                    </div>
                </div>



            </div>
        </main>


    )
}
