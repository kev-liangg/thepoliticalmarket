import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import { Grid,Paper } from "@material-ui/core";
const useStyles = makeStyles((theme) => ({
    grid: {
    width : '100%',
    margin: '0px'
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
        background: theme.palette.success.light
    }
}));
function States(){
    const classes = useStyles();
    return (
        <Grid container spacing ={2} className = {classes.grid}>
            <Grid item md={3}>
                <Paper className = {classes.paper}>Texas</Paper>
            </Grid>
            <Grid item md={3}>
                <Paper className = {classes.paper}>California</Paper>
            </Grid>
            <Grid item md={3}>
                <Paper className = {classes.paper}>Maryland</Paper>
            </Grid>
            <Grid item md={3}>
                <Paper className = {classes.paper}>New York</Paper>
            </Grid>
            <Grid item md={3}>
                <Paper className = {classes.paper}>Virgina</Paper>
            </Grid>

        </Grid>
    )
}
export default States