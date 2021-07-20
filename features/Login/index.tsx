import React from "react"
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Dialog, DialogActions, DialogContent, DialogContentText } from "@material-ui/core";
import useLogin from "./service";
import Loader from "../../components/Loader";
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30%'
        },
        [theme.breakpoints.only('sm')]: {
            width: '60%'
        },
        [theme.breakpoints.down('sm')]: {
            width: '80%'
        },
        [theme.breakpoints.only('md')]: {
            width: '40%'
        },
        padding:10,
        margin:"auto",
        marginTop:20
    },
    paper: {
        marginTop: theme.spacing(2),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(4),
        justifyContent:'center'

    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
const Index = () => {
    const service = useLogin()
    const classes = useStyles();
    return (
        <>
            {service.isLoading ? (
                <Loader />
            ) : (
                <Box component="main" maxWidth="xs" className={classes.root} border={1} borderRadius="borderRadius">
                    <div className={classes.paper}>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <form className={classes.form} noValidate onSubmit={service.formik.handleSubmit}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="User Name"
                                name="userName"
                                autoComplete="username"
                                autoFocus
                                onChange={service.formik.handleChange}
                            />
                            {service.formik?.errors?.userName && (
                                <p className="text-danger small">{service.formik?.errors?.userName}</p>
                            )}
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                                onChange={service.formik.handleChange}
                            />
                            {service.formik?.errors?.password && (
                                <p className="text-danger small">{service.formik?.errors?.password}</p>
                            )}
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Sign In
                            </Button>
                        </form>
                        <Dialog
                            open={service.formError ? true : false}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    {service.formError}
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={() => { service.setFormError(undefined) }} color="primary" autoFocus>
                                    OK
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Box>
            )}
        </>


    )

}
export default Index