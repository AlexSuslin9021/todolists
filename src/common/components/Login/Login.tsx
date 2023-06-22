import React from 'react'
import Grid from '@mui/material/Grid';
import s from './login.module.css'
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import {setIsLoggedInTC} from "../../../featers/auth/authReducers/autgReducers";
import {useAppDispatch, useAppSelector} from "../../../app/store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            }
            else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) {
                errors.password = 'Required'
            } else if (values.password.length < 4) {
                errors.password = 'Password should be more 3 symbols'
            }
            return errors
        },
        onSubmit: values => {
            dispatch(setIsLoggedInTC(values))
        },
    })

    if (isLoggedIn) {
        return <Navigate to={'/'}/>
    }

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p className={s.p}>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p className={s.p}>or use common test account credentials:</p>
                    <p className={s.p}>Email: alexsuslin@inbox.ru</p>
                    <p className={s.p}>Password: 1234qwer</p>
                </FormLabel>
                <form className={s.form} onSubmit={formik.handleSubmit}>
                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            // size={'small'}
                            sx={{width:'250px'}}
                            color="secondary"
                            name={'email'}
                            onChange={formik.handleChange}
                            value={formik.values.email}
                            onBlur={formik.handleBlur}
                        />
                        {formik.touched.email && formik.errors.email &&
                            <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            sx={{zIndex:4}}
                            color="secondary"
                            type="password" label="Password"
                                   margin="normal"
                                   {...formik.getFieldProps('password')}
                        />
                        <FormControlLabel

                            label={'Remember me'}
                            control={<Checkbox color="secondary"/>}
                            name={'rememberMe'}
                            onChange={formik.handleChange}
                            value={formik.values.rememberMe}
                        />
                        <Button type={'submit'} variant={'contained'} sx={{background:'#7e54ed'}}>
                            Login
                        </Button>
                    </FormGroup>
                </form>
            </FormControl>
        </Grid>
    </Grid>
}

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}