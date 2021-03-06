import React from "react";
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
function Contractors(){
    const classes = useStyles();
    return (
        <Grid container spacing ={2} className = {classes.grid}>
            <Grid item md={12}>
                <Paper className = {classes.paper}>Name/NAICS/State</Paper>
            </Grid>
            <Grid item md={12}>
                <Paper className = {classes.paper}>Lockheed Martin/336414/Maryland</Paper>
            </Grid>
            <Grid item md={12}>
                <Paper className = {classes.paper}>Boeing/336414/Illinois</Paper>
            </Grid>
            <Grid item md={12}>
                <Paper className = {classes.paper}>Raytheon/334511/Massachusetts</Paper>
            </Grid>
        </Grid>
    );
}
export default Contractors