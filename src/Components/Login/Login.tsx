import React from 'react'
import Grid from '@mui/material/Grid';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {useFormik} from "formik";
import { setIsLoggedInTC} from "../../state/reducer/authReducers/autgReducers";
import { useAppDispatch, useAppSelector} from "../../state/Store";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const dispatch = useAppDispatch()
const isLoggedIn=useAppSelector<boolean>(state => state.auth.isLoggedIn)
    const formik = useFormik({
        initialValues: { //дефолтное значение стейта
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            //валидация, при каждом изменении поля,мы попадаем в эту функцию(весь стейт)
            const errors: FormikErrorType = {}
            if (!values.email) {
                errors.email = 'Required'
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address'
            }
            if (!values.password) { //если пароль не введен
                errors.password = 'Required'
            } else if (values.password.length<4) {
                errors.password = 'Password should be more 3 symbols'
            }
            return errors
        },
        onSubmit: values => {
            // alert(JSON.stringify(values));
            dispatch(setIsLoggedInTC(values))
        },
    })

    if(isLoggedIn) {return <Navigate to={'/'}/>}

    return <Grid container justifyContent={'center'}>
        <Grid item justifyContent={'center'}>
            <FormControl>
                <FormLabel>
                    <p>To log in get registered
                        <a href={'https://social-network.samuraijs.com/'}
                           target={'_blank'}> here
                        </a>
                    </p>
                    <p>or use common test account credentials:</p>
                    <p>Email: free@samuraijs.com</p>
                    <p>Password: free</p>
                </FormLabel>
                {/* собирает форму и отправляет ее на бэк*/}
                <form  onSubmit={formik.handleSubmit}>
                <FormGroup>
                    <TextField
                        label="Email"
                        margin="normal"
                        name={'email'}
                        onChange={formik.handleChange} // собирает сurrentTargetValue
                        value={formik.values.email} //делает инпут контролируемым
                        onBlur={formik.handleBlur} // отслеживает, качались мы поля или нет
                    />
                    {formik.touched.email && formik.errors.email && <div style={{color:'red'}}>{formik.errors.email}</div>}
                    <TextField type="password" label="Password"
                               margin="normal"
                        {...formik.getFieldProps('password')}
                        //всем свойством передает значение password
                    />
                    <FormControlLabel
                        label={'Remember me'}
                        control={<Checkbox/>}
                        name={'rememberMe'}
                        onChange={formik.handleChange}
                        value={formik.values.rememberMe}

                    />

                    <Button type={'submit'} variant={'contained'} color={'primary'}>
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